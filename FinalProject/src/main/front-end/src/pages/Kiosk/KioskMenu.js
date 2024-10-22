import React, { useEffect, useState } from 'react';
import CategorySelector from '../../components/Kiosk/CategorySelector';
import MenuList from '../../components/Kiosk/MenuList';
import Cart from '../../components/Kiosk/Cart';
import './KioskMenu.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { House } from 'react-bootstrap-icons';

const KioskMenu = () => {

  const [selectedCategory, setSelectedCategory] = useState('추천메뉴');
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location]);

  const categories = ['추천메뉴', '빵', '커피(ice)', '커피(hot)'];
  const additionalOptions = [
    { id: 1, name: '에스프레소 샷', price: 500 },
    { id: 2, name: '헤이즐넛 시럽', price: 300 },
    { id: 3, name: '바닐라 시럽', price: 300 },
    { id: 4, name: '메이플 시럽', price: 300 },
    { id: 5, name: '아이스크림', price: 1000 },
    { id: 6, name: '펄', price: 500 },
    { id: 7, name: '우유', price: 500 },
  ];

  const fetchMenuItems = async (category, page = 0, size = 6) => {
    let endpoint;
    switch (category) {
      case '추천메뉴':
        endpoint = '/api/menu/recommended';
        break;
      case '빵':
        endpoint = '/api/menu/bread';
        break;
      case '커피(ice)':
        endpoint = '/api/menu/coffee/ice';
        break;
      case '커피(hot)':
        endpoint = '/api/menu/coffee/hot';
        break;
      default:
        endpoint = '/api/menu/recommended';
    }
    try {
      const response = await fetch(`http://localhost:8080${endpoint}?page=${page}&size=${size}`);
      if (!response.ok) {
        const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data); 
      return data;
    } catch (error) {
      console.error("Fetching menu items failed:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log('Fetching items for page:', currentPage); // 추가된 로그
    const loadMenuItems = async () => {

      const data = await fetchMenuItems(selectedCategory, currentPage);
      if (data) {
        const formattedItems = data.items.map(item => ({
          id: item.productId || item.coffeeId,
          name: item.productName || item.coffeeName,
          price: item.salePrice,
          image: item.productImage || item.coffeeImage,
          description: item.detailDescription,
          type: item.productCategory === 'bread' ? 'bread' : 'coffee',
          temperature: item.temperature
        }));
        setMenuItems(prevState => ({
          ...prevState,
          [selectedCategory]: formattedItems
        }));
        setTotalPages(data.totalPages);
        setTotalPages(data.totalPages); // 전체 페이지 수 설정
      }
    };
    loadMenuItems();
  }, [selectedCategory, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const addToCart = (item, quantity, options, totalPrice) => {
    const newItem = {
      ...item,
      quantity,
      options,
      size: options.size,
      sizeCharge: options.sizeCharge,
      totalPrice
    };

    if (item.type === 'bread') {
      const existingItem = cartItems.find(cartItem => cartItem.id === item.id && cartItem.type===item.type);
      if (existingItem) {
        setCartItems(cartItems.map(cartItem =>
          cartItem.id === item.id && cartItem.type===item.type ? { ...cartItem, quantity: cartItem.quantity + quantity, totalPrice: cartItem.totalPrice + totalPrice } : cartItem
        ));
      } else {
        setCartItems([...cartItems, newItem]);
      }
    } else if (item.type === 'coffee') {
      const existingItem = cartItems.find(cartItem =>
        cartItem.id === item.id && cartItem.type===item.type &&
        JSON.stringify(cartItem.options) === JSON.stringify(options)
      );
      if (existingItem) {
        setCartItems(cartItems.map(cartItem =>
          (cartItem.id === item.id && JSON.stringify(cartItem.options) === JSON.stringify(options))
            ? { ...cartItem, quantity: cartItem.quantity + quantity, totalPrice: cartItem.totalPrice + totalPrice }
            : cartItem
        ));
      } else {
        setCartItems([...cartItems, newItem]);
      }
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };


  const removeFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const updateCartItemQuantity = (itemId,itemType, options, newQuantity) => {
    if (newQuantity >= 1) {
      setCartItems(cartItems.map(item =>
        item.id === itemId && item.type ===  itemType &&  JSON.stringify(item.options) === JSON.stringify(options)
          ? { ...item, quantity: newQuantity, totalPrice: calculateItemPrice(item, newQuantity) }
          : item
      ));
    }
  };
  const calculateItemPrice = (item, quantity) => {
    const basePrice = item.price * quantity;
    const sizeCharge = (item.options?.sizeCharge || 0) * quantity;
    const optionsPrice = (item.options?.additionalOptions || []).reduce((sum, option) =>
      sum + option.price * option.quantity, 0
    ) * quantity;
    return basePrice + sizeCharge + optionsPrice;
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const handlePayment = () => {
    navigate('/detail', { state: { cartItems } });
  };
  const handleHome=()=>{
    navigate('/');
  }

  return (


    <div className="home-container text-center container-md body-center">
      
      <nav className="menubar text-bold">
        <button className='goHome' onClick={handleHome}><House/></button>
        <div className='body-center'>숨쉰당</div>
      </nav>
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setCurrentPage(0); 
        }}
      />
      <MenuList
        items={menuItems[selectedCategory] || []}
        onAddToCart={addToCart}
        additionalOptions={additionalOptions}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Cart className="cart-fixed"
        items={cartItems}
        updateQuantity={updateCartItemQuantity}
        removeItem={removeFromCart}
        clearCart={clearCart}
        onPayment={handlePayment}

      />
    </div>
  );
};

export default KioskMenu;
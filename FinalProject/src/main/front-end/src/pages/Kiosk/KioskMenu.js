import React, { useEffect, useState } from 'react';
import CategorySelector from '../../components/Kiosk/CategorySelector';
import MenuList from '../../components/Kiosk/MenuList';
import Cart from '../../components/Kiosk/Cart';
import './KioskMenu.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { House } from 'react-bootstrap-icons';
import useClickSound from '../../hooks/useClickSound';

const KioskMenu = () => {
  const ClickSound = useClickSound(); 

  const [selectedCategory, setSelectedCategory] = useState('추천메뉴');
  const [additionalOptions, setAdditionalOptions] = useState([]);
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

  useEffect(() => {
    const fetchAdditionalOptions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/menu/coffee-option');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        // 데이터 매핑
        const mappedOptions = data.map(option => ({
          id: option.optionId,
          name: option.name,
          price: option.price
        }));

        setAdditionalOptions(mappedOptions);
      } catch (error) {
        console.error("Failed to fetch additional options:", error);
      }
    };

    fetchAdditionalOptions();
  }, []);

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
      throw new Error(`error : ${response.status}, body: ${errorBody}`);
      }
      const data = await response.json();
      console.log('data', data); 
      return data;
    } catch (error) {
      console.error("error:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log('Fetching items for page:', currentPage); 
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
    ClickSound();
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
      const existingItem = cartItems.find(cartItem => cartItem.id === item.id && cartItem.type===item.type && cartItem.name===item.name);
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
    ClickSound();
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const updateCartItemQuantity = (itemId,itemType, itemName,options, newQuantity) => {
    if (newQuantity >= 1) {
      setCartItems(cartItems.map(item =>
         item.id === itemId && item.type ===  itemType && item.name === itemName &&  JSON.stringify(item.options) === JSON.stringify(options)
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
    ClickSound();
    setCartItems([]);
  };
  const handlePayment = () => {
    ClickSound();
    navigate('/detail', { state: { cartItems } });
  };
  const handleHome=()=>{
    ClickSound();
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
        selectedCategory={selectedCategory} // 추가

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
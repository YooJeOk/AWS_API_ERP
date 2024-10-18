import React, { useState, useEffect } from 'react';
import './KioskMenu.css';
import CategorySelector from '../../components/Kiosk/CategorySelector';
import MenuList from '../../components/Kiosk/MenuList';
import Cart from '../../components/Kiosk/Cart';

const KioskMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState('추천메뉴');
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState({});

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

  useEffect(() => {
    // 여기서 API를 호출하여 메뉴 아이템을 가져올 수 있습니다.
    // 예: fetchMenuItems(selectedCategory);
  }, [selectedCategory]);

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
      const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        setCartItems(cartItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity, totalPrice: cartItem.totalPrice + totalPrice } : cartItem
        ));
      } else {
        setCartItems([...cartItems, newItem]);
      }
    } else if (item.type === 'coffee') {
      const existingItem = cartItems.find(cartItem => 
        cartItem.id === item.id && 
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

  const updateCartItemQuantity = (itemId, options, newQuantity) => {
    if (newQuantity >= 1) {
      setCartItems(cartItems.map(item =>
        item.id === itemId && JSON.stringify(item.options) === JSON.stringify(options)
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

  return (
    <div className="home-container text-center container-md body-center">
      <nav className="menubar text-bold"><i className="bi bi-house" id="back-home"></i>숨쉰당</nav>
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <MenuList
        items={menuItems[selectedCategory] || []}
        onAddToCart={addToCart}
        additionalOptions={additionalOptions}
      />
      <Cart className="cart-fixed"
        items={cartItems}
        updateQuantity={updateCartItemQuantity}
        removeItem={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
};

export default KioskMenu;
import React, { useState } from 'react';
import './KioskMenu.css';
import CategorySelector from '../../components/Kiosk/CategorySelector';
import MenuList from '../../components/Kiosk/MenuList';
import Cart from '../../components/Kiosk/Cart';

const KioskMenu = () => {

  const [selectedCategory, setSelectedCategory] = useState('추천메뉴');
  const [cartItems, setCartItems] = useState([]);

  const categories = ['추천메뉴', '빵', '커피(ice)', '커피(hot)'];
  const menuItems = {
    '추천메뉴': [
      {
        id: 1,
        name: '갈릭꽈베기',
        price: 3500,
        image: '/images/bread/갈릭꽈배기.jpg',
        description: '결결이 바삭한 식감의 패스트리에 알싸한 남해 마늘의 진한 맛과 향이 더해진 간식형 제품',
        type: 'bread'
      },
      {
        id: 2,
        name: '고구마케이크빵',
        price: 3000,
        image: '/images/bread/고구마케이크빵.jpg',
        description: '부드러운 빵 속에 달콤한 고구마 필링이 가득한 케이크 스타일의 빵',
        type: 'bread'
      },
      {
        id: 3,
        name: '꽈베기',
        price: 2500,
        image: '/images/bread/꽈베기.jpg',
        description: '쫄깃한 식감과 달콤한 맛이 일품인 전통적인 꽈배기',
        type: 'bread'
      },
      {
        id: 4,
        name: '아메리카노',
        price: 3200,
        image: '/images/coffee/아메리카노ice.jpg',
        description: '진한 에스프레소에 차가운 물을 더해 시원하고 깔끔한 맛을 느낄 수 있는 아이스 커피',
        type: 'coffee',
        temperature: 'ICE'
      },
      {
        id: 5,
        name: '라우겐',
        price: 2800,
        image: '/images/bread/라우겐.jpg',
        description: '독일식 프레첼 빵으로, 짭짤하고 쫄깃한 식감이 특징인 빵',
        type: 'bread'
      },
      {
        id: 6,
        name: '베이글빵',
        price: 2700,
        image: '/images/bread/베이글빵.jpg',
        description: '쫄깃한 식감과 부드러운 맛이 일품인 클래식한 베이글',
        type: 'bread'
      }
    ],
    '빵': [
      // ... 빵 카테고리 아이템들
    ],
    '커피(ice)': [
      {
        id: 10,
        name: '카라멜 마끼야또',
        price: 3000,
        image: '/images/coffee/마끼야또ice.jpg',
        description: '카라멜 시럽의 달콤함과 에스프레소의 진한 맛이 조화롭게 어우러진 아이스 커피',
        type: 'coffee',
        temperature: 'ICE'
      },
      // ... 다른 아이스 커피 아이템들
    ],
    '커피(hot)': [
      {
        id: 10,
        name: '카라멜 마끼야또',
        price: 3000,
        image: '/images/coffee/마끼야또ice.jpg',
        description: '카라멜 시럽의 달콤함과 에스프레소의 진한 맛이 조화롭게 어우러진 아이스 커피',
        type: 'coffee',
        temperature: 'HOT'
      },
      // ... 핫 커피 카테고리 아이템들
    ],
  };
  const additionalOptions = [
    { id: 1, name: '에스프레소 샷', price: 500 },
    { id: 2, name: '헤이즐넛 시럽', price: 300 },
    { id: 3, name: '바닐라 시럽', price: 300 },
    { id: 4, name: '메이플 시럽', price: 300 },
    { id: 5, name: '아이스크림', price: 1000 },
    { id: 6, name: '펄', price: 500 },
    { id: 7, name: '우유', price: 500 },
  ];
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
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity,totalPrice : cartItem.totalPrice+totalPrice} : cartItem
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
            ? { ...cartItem, quantity: cartItem.quantity + quantity, totalPrice : cartItem.totalPrice+totalPrice }
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
        items={menuItems[selectedCategory]}
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
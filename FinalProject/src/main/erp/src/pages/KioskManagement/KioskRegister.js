import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './KioskRegister.css';

const KioskRegister = () => {
    const [products, setProducts] = useState([]);
    const [coffees, setCoffees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCoffees();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/kiosk/inventory/register/product');
            if (!response.ok) {
                throw new Error('서버에서 데이터를 가져오는데 실패했습니다.');
            }
            const data = await response.json();
            setProducts(data.products);
        } catch (err) {
            console.log("에러:", err)
        }
    };

    const fetchCoffees = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/kiosk/inventory/register/coffee');
            if (!response.ok) {
                throw new Error('서버에서 데이터를 가져오는데 실패했습니다.');
            }
            const data = await response.json();
            setCoffees(data.coffees);
        } catch (err) {
            console.log("에러:", err)
        }
    };

    const handleItemClick = (item, isProduct) => {
        setSelectedItem({ ...item, isProduct });
        setShowModal(true);
    };

    const handleConfirm = async () => {
        try {
            const url = selectedItem.isProduct
                ? `http://localhost:8080/api/kiosk/inventory/products/${selectedItem.product.productId}/update/onkiosk`
                : `http://localhost:8080/api/kiosk/inventory/coffees/${selectedItem.coffeeId}/update/onkiosk`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ OnKiosk: 'Y' }),
            });

            if (response.ok) {
                // 성공적으로 업데이트되면 목록을 새로고침합니다.
                fetchProducts();
                fetchCoffees();
                setShowModal(false);
            } else {
                throw new Error('업데이트에 실패했습니다.');
            }
        } catch (err) {
            console.log("에러:", err);
        }
    };

    return (
        <div className='kiosk-register-container'>
            <h2>키오스크에 추가되지 않은 상품들입니다.</h2>
            <div className="new-product-list-container mt-5">
                <h4 className='mb-4'>빵</h4>
                <div className='kiosk-register-item-container'>
                    {products.map(item => (
                        <span 
                            key={item.product.productId} 
                            className='kiosk-register-item'
                            onClick={() => handleItemClick(item, true)}
                        >
                            {item.product.productName}
                        </span>
                    ))}
                </div>
            </div>

            <div className="new-coffee-list-container mt-5">
                <h4 className='mb-4'>커피</h4>
                <div className='kiosk-register-item-container'>
                    {coffees.map(item => (
                        <span 
                            key={item.coffeeId} 
                            className='kiosk-register-item'
                            onClick={() => handleItemClick(item, false)}
                        >
                            {item.coffeeName}
                        </span>
                    ))}
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem && (
                        <p>{selectedItem.isProduct ? selectedItem.product.productName : selectedItem.coffeeName}을(를) 키오스크에 추가하시겠습니까?</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className='change-mode-btn' onClick={() => setShowModal(false)}>
                        취소
                    </button>
                    <button className='change-save-btn' onClick={handleConfirm}>
                        확인
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default KioskRegister;

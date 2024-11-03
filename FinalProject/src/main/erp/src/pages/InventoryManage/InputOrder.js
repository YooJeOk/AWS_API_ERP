import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./InputOrder.css"
const InputOrder = () => {
    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [orderQuantity, setOrderQuantity] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchMaterials();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:8080/api/store/inventory/products');
        const data = await response.json();
        setProducts(data.content);
    };

    const fetchMaterials = async () => {
        const response = await fetch('http://localhost:8080/api/store/inventory/materials');
        const data = await response.json();
        setMaterials(data.content);
    };

    const handleItemClick = (item, category) => {
        setSelectedItem({ ...item, category });
        setShowModal(true);
    };

    const handleOrderSubmit = async () => {
        const orderData = {
            category: selectedItem.category,
            productName: selectedItem.productName || selectedItem.materialName,
            quantity: parseInt(orderQuantity),
            unit: selectedItem.category === '제품' ? '개' : selectedItem.unit,
            orderType: '수동입력',
            productId: selectedItem.category === '제품' ? selectedItem.productId : null,
            materialId: selectedItem.category === '자재' ? selectedItem.materialId : null
        };
    
        try {
            const response = await fetch('http://localhost:8080/api/orders/manual', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
    
            if (response.ok) {
                alert('주문 신청이 완료되었습니다.');
                setShowModal(false);
                setOrderQuantity('');
            } else {
                alert('주문 신청에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('주문 신청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="order-submit-container ">
            <h3 className='text-center'>주문 신청</h3>
            <div className="">
                <div className="">
                    <h4 className='mb-4'>제품:현재수량</h4>
                    <div className='order-product-item-container'>
                        {products.map(product => (
                            <div className='input-order-item' onClick={() => handleItemClick(product, '제품')}>
                                {product.productName}: {product.quantityInStore}개
                            </div>
                        ))}
                    </div>
                </div>
                <hr className='mt-5 mb-4'></hr>
                <div className="">
                    <h4 className='mb-4'>자재:현재수량</h4>
                    <div className='order-product-item-container'>
                        {materials.map(material => (
                            <div className='input-order-item' onClick={() => handleItemClick(material, '자재')}>
                                {material.materialName}: {material.quantityInStore}{material.unit}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>주문 신청</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>카테고리</Form.Label>
                            <Form.Control type="text" value={selectedItem?.category} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='mt-2'>상품명</Form.Label>
                            <Form.Control type="text" value={selectedItem?.productName || selectedItem?.materialName} readOnly />
                        </Form.Group>
                        <Form.Group  className='mt-2'>
                            <Form.Label>수량</Form.Label>
                            <Form.Control
                                type="number"
                                value={orderQuantity}
                                onChange={(e) => setOrderQuantity(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                (현재 수량은 {selectedItem?.quantityInStore || 0} {selectedItem?.category === '제품' ? '개' : selectedItem?.unit || '개'} 입니다)
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className='mt-2'>
                            <Form.Label>단위</Form.Label>
                            <Form.Control type="text" value={selectedItem?.category === '제품' ? '개' : selectedItem?.unit} readOnly />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='change-mode-btn' onClick={() => setShowModal(false)}>
                        취소
                    </button>
                    <button className='change-save-btn' onClick={handleOrderSubmit}>
                        주문 신청
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InputOrder;
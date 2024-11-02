import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./AutoOrderPage.css"

const AutoOrderPage = () => {
    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [autoOrderQuantity, setAutoOrderQuantity] = useState('');

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
        setAutoOrderQuantity(item.autoOrderQuantity || '');
    };

    const handleAutoOrderSubmit = async () => {
        const autoOrderData = {
            itemId: selectedItem.productId || selectedItem.materialId,
            category: selectedItem.category,
            autoOrder: 'Y',
            autoOrderQuantity: parseInt(autoOrderQuantity)
        };

        try {
            const response = await fetch('http://localhost:8080/api/auto-orders/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(autoOrderData),
            });

            if (response.ok) {
                alert('자동 발주 설정이 완료되었습니다.');
                setShowModal(false);
                fetchProducts();
                fetchMaterials();
            } else {
                alert('자동 발주 설정에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('자동 발주 설정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="auto-order-container">
            <h3 className='text-center'>자동 발주 설정</h3>
            <div className="">
                <div className="">
                    <h3 className='mb-4'>제품</h3>
                    <div className='auto-order-item-container'>
                        {products.map(product => (
                            <div 
                                key={product.productId}
                                className={`auto-order-item ${product.autoOrder === 'Y' ? 'background-red' : ''}`} 
                                onClick={() => handleItemClick(product, '제품')}
                            >
                                {product.productName}: {product.quantityInStore}개
                                {product.autoOrder === 'Y' && <span className="auto-order-badge">자동발주</span>}
                            </div>
                        ))}
                    </div>
                </div>
                <hr className='mt-5 mb-4'></hr>
                <div className="">
                    <h3 className='mb-4'>자재</h3>
                    <div className='auto-order-item-container'>
                        {materials.map(material => (
                            <div 
                                key={material.materialId}
                                className={`auto-order-item ${material.autoOrder === 'Y' ? 'background-red' : ''}`} 
                                onClick={() => handleItemClick(material, '자재')}
                            >
                                {material.materialName}: {material.quantityInStore}{material.unit}
                                {material.autoOrder === 'Y' && <span className="auto-order-badge">자동발주</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>자동 발주 설정</Modal.Title>
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
                        <Form.Group className='mt-2'>
                            <Form.Label>
                                자동으로 발주할 {selectedItem?.category}의 수량을 입력해주세요
                            </Form.Label>
                            <Form.Control
                                type="number"
                                value={autoOrderQuantity}
                                onChange={(e) => setAutoOrderQuantity(e.target.value)}
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
                    <button className='change-save-btn' onClick={handleAutoOrderSubmit}>
                        자동 발주 설정
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AutoOrderPage;
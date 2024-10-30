import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import './KioskProductCoffee.css';

const KioskProduct = ({ products, editMode, onProductChange, onProductDelete, onCancelDelete, deletedProducts }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingDescription, setEditingDescription] = useState('');

    const handleShowModal = (description, index = null) => {
        setSelectedDescription(description);
        setEditingDescription(description);
        setEditingIndex(index);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDescription('');
        setEditingDescription('');
        setEditingIndex(null);
    };

    const handleSaveDescription = () => {
        if (editingIndex !== null) {
            onProductChange(editingIndex, 'detailDescription', editingDescription);
        }
        handleCloseModal();
    };

    const truncateDescription = (description, limit) => {
        if (description.length > 8) {
            return (
                <>
                    {description.substring(0, 8)}...
                    <button
                        className="btn btn-link p-0 m-0 text-bold si"
                        style={{ color: 'black', cursor: 'pointer' }}
                        onClick={() => handleShowModal(description)}
                    >
                        더 보기
                    </button>
                </>
            );
        }
        return description;
    };

    return (
        <div className='product-inner-table'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>상품 ID</th>
                        <th>상품명</th>
                        <th>판매가</th>
                        <th>재고</th>
                        <th>추천 여부</th>
                        <th>상세 설명</th>
                        {editMode && <th>작업</th>}
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => (
                        <tr key={item.product.productId}>
                            <td>{item.product.productId}</td>
                            <td>{item.product.productName}</td>
                            <td>
                                {editMode ? (
                                    <Form.Control size="sm"
                                        className='sale-price-form'
                                        type="number"
                                        value={item.product.salePrice}
                                        onChange={(e) => onProductChange(index, 'salePrice', e.target.value)}
                                    />
                                ) : (
                                    item.product.salePrice
                                )}
                            </td>
                            <td>{item.inventory}</td>
                            <td>
                                {editMode ? (
                                    <Form.Check
                                    className='recommend-switch'
                                    type="switch"
                                        checked={item.product.recommend === 'Y'}
                                        onChange={(e) => onProductChange(index, 'recommend', e.target.checked ? 'Y' : 'N')}
                                    />
                                ) : (
                                    item.product.recommend
                                )}
                            </td>
                            <td>
                                {editMode ? (
                                    <button className='edit-detail' onClick={() => handleShowModal(item.product.detailDescription, index)}>
                                        수정하기
                                    </button>
                                ) : (
                                    truncateDescription(item.product.detailDescription, 30)
                                )}
                            </td>
                            {editMode && (
                                <td>
                                    {deletedProducts.includes(item.product.productId) ? (
                                        <button className='re-kiosk' onClick={() => onCancelDelete(item.product.productId)}>취소</button>
                                    ) : (
                                        <button className='cancle-kiosk' onClick={() => onProductDelete(item.product.productId)}>내리기</button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={handleCloseModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editingIndex !== null ? '상세 설명 수정' : '상세 설명'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingIndex !== null ? (
                        <Form.Control
                            className='edit-description-form'
                            as="textarea"
                            rows={3}
                            value={editingDescription}
                            onChange={(e) => setEditingDescription(e.target.value)}
                        />
                    ) : (
                        <p className='fs-5'>{selectedDescription}</p>
                    )}
                </Modal.Body>
                {editingIndex !== null && (
                    <Modal.Footer>
                        <button className='edit-detail-cancel-btn' onClick={handleCloseModal}>
                            취소
                        </button>
                        <button className='edit-detail-certain-btn' onClick={handleSaveDescription}>
                            확인
                        </button>
                    </Modal.Footer>
                )}
            </Modal>
        </div>
    );
};

export default KioskProduct;
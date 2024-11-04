import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import './KioskProductCoffee.css';

const KioskCoffee = ({ coffees, editMode, onCoffeeChange, onCoffeeDelete, onCancelDelete, deletedCoffees }) => {
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
            onCoffeeChange(editingIndex, 'detailDescription', editingDescription);
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

    if (!coffees || coffees.length === 0) {
        return <div>커피 목록이 없습니다.</div>;
    }

    return (
        <div className='coffee-inner-table'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>커피 ID</th>
                        <th>커피명</th>
                        <th>판매가</th>
                        <th>온도</th>
                        <th>추천 여부</th>
                        <th>상세 설명</th>
                        {editMode && <th>작업</th>}

                    </tr>
                </thead>
                <tbody>
                    {coffees.map((coffee, index) => (
                        <tr key={coffee.coffeeId}>
                            <td>{coffee.coffeeId}</td>
                            <td>{coffee.coffeeName}</td>
                            <td>
                                {editMode ? (
                                    <Form.Control size="sm"
                                        className='sale-price-form'
                                        type="number"
                                        value={coffee.salePrice}
                                        onChange={(e) => onCoffeeChange(index, 'salePrice', e.target.value)}
                                    />
                                ) : (
                                    coffee.salePrice
                                )}
                            </td>
                            <td>{coffee.temperature}</td>
                            <td>
                                {editMode ? (
                                    <Form.Check
                                        className='recommend-switch'
                                        type="switch"
                                        checked={coffee.recommend === 'Y'}
                                        onChange={(e) => onCoffeeChange(index, 'recommend', e.target.checked ? 'Y' : 'N')}
                                    />
                                ) : (
                                    coffee.recommend
                                )}
                            </td>
                            <td>
                                {editMode ? (

                                    <button className='edit-detail' onClick={() => handleShowModal(coffee.detailDescription, index)}>
                                        수정하기
                                    </button>
                                ) : (
                                    truncateDescription(coffee.detailDescription, 30)
                                )}
                            </td>
                            {editMode && (
                                <td>
                                    {deletedCoffees.includes(coffee.coffeeId) ? (
                                        <button className='re-kiosk' onClick={() => onCancelDelete(coffee.coffeeId)}>취소</button>
                                    ) : (
                                        <button className='cancle-kiosk' onClick={() => onCoffeeDelete(coffee.coffeeId)}>내리기</button>
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
                        <button className='edit-detail-cancel-btn' variant="secondary" onClick={handleCloseModal}>
                            취소
                        </button>
                        <button className='edit-detail-certain-btn' variant="primary" onClick={handleSaveDescription}>
                            확인
                        </button>
                    </Modal.Footer>
                )}
            </Modal>
        </div>
    );
};

export default KioskCoffee;
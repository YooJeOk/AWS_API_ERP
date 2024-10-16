import React, { useEffect, useState } from 'react';
import { DashSquare, PlusSquare } from 'react-bootstrap-icons'; 


const CoffeeModal = ({ item, onClose, onAddToCart, additionalOptions }) => {
    const [selectedSize, setSelectedSize] = useState('regular');
    const [sizeCharge, setSizeCharge] = useState(0);
    const [optionQuantities, setOptionQuantities] = useState({});

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        if (size === 'extra') {
            setSizeCharge(500);
        } else {
            setSizeCharge(0);
        }
    };

    const handleAddToCart = () => {
        const totalPrice = calculateTotalPrice();
        const options = {
            size: selectedSize,
            sizeCharge: sizeCharge,
            additionalOptions: Object.entries(optionQuantities)
                .filter(([_, quantity]) => quantity > 0)
                .map(([id, quantity]) => {
                    const option = additionalOptions.find(opt => opt.id === parseInt(id));
                    return { ...option, quantity };
                })
        };
        onAddToCart(item, 1, options, totalPrice);
        onClose();
    };
    const handleOptionChange = (optionId, change) => {
        setOptionQuantities(prev => {
            const currentQuantity = prev[optionId] || 0;
            const newQuantity = Math.max(0, currentQuantity + change);
            return { ...prev, [optionId]: newQuantity };
        });
    };
    const calculateTotalPrice = () => {
        const basePrice = item.price ;
        const optionsPrice = Object.entries(optionQuantities).reduce((sum, [id, qty]) => {
            const option = additionalOptions.find(opt => opt.id === parseInt(id));
            return sum + (option.price * qty);
        }, 0);
        return basePrice + sizeCharge + optionsPrice;
    };

    const tempClass = item.temperature === 'ICE' ? 'item-cold' : 'item-hot';

    useEffect(() => {
        const regularButton = document.querySelector('.size-btn[data-size="regular"]');
        if (regularButton) {
            regularButton.classList.add('selected');
        }
    }, []);
    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="coffee-modal modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="large-border">
                        <div className="small-border">
                            <div className="modal-body">
                                <div className='coffee-content row'>
                                    <div className='col-4'>
                                        <img src={item.image} className="img-fluid modal-item-img" alt={item.name} />
                                    </div>
                                    <div className='coffee-detail col-8 text-left'>
                                        <div className="modal-title text-bold">
                                        <span className={`item-temp mx-3 ${tempClass}`}>{item.temperature}</span>{item.name}
                                        </div>
                                        <div className="coffee-describe mt-4 body-center mx-3">{item.description}</div>
                                    </div>
                                </div>

                                <div className="size-selection mt-4 ">
                                    <div className='fs-4 text-bold'>사이즈</div>
                                    <div className="size-buttons mx-5">
                                        <button
                                            className={`size-btn ${selectedSize === 'regular' ? 'selected' : ''}`}
                                            data-size="regular"
                                            onClick={() => handleSizeSelect('regular')}
                                        >   <img src='./images/coffee/cup.png' className='regular-cup' alt='cupIcon'></img>
                                            <div>Regular</div>
                                        </button>
                                        <button
                                            className={`size-btn ${selectedSize === 'extra' ? 'selected' : ''}`}
                                            data-size="extra"
                                            onClick={() => handleSizeSelect('extra')}
                                        >
                                            <img src='./images/coffee/cup.png' className='extra-cup' alt='cupIcon'></img>
                                            <div>Extra(+500)</div>
                                        </button>
                                    </div>
                                </div>
                                <hr></hr>

                                <div className='syrup-selection text-left mt-3 fs-4'>
                                    <div className='text-bold'>유료옵션</div>
                                    <hr />
                                    <div className='syrup-container fs-6 mx-3 mt-3'>
                                        {additionalOptions.map((option) => {
                                            const quantity = optionQuantities[option.id] || 0;
                                            return (
                                                <div key={option.id} className='syrup-item row'>
                                                    <div className='syrup-title col-5'>
                                                        ㄴ {option.name} 추가
                                                    </div>
                                                    <div className='syrup-price col-3 text-right'>₩{option.price}</div>
                                                    <div className='syrup-counter col-4 text-right'>
                                                        <button
                                                            onClick={() => handleOptionChange(option.id, -1)}
                                                            disabled={quantity === 0}
                                                            className='option-minus'
                                                        >
                                                            <DashSquare/>
                                                        </button>
                                                        <span> {quantity} </span>
                                                        <button 
                                                            onClick={() => handleOptionChange(option.id, 1)}
                                                            className='option-plus'
                                                        >
                                                            <PlusSquare/>
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="counter-container mt-3 fs-3">
                                    <div className="modal-price text-right">₩{calculateTotalPrice()}</div>
                                </div>
                            </div>
                            <div className="modal-footer fs-4">
                                <button type="button" className="btn-basic btn-cancle" onClick={onClose}>취소</button>
                                <button type="button" className="btn-basic btn-pay" onClick={handleAddToCart}>선택완료</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeModal;
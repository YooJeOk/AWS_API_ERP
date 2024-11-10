import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className='pagebtn-container'>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>이전</button>
            <span>{currentPage + 1} / {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>다음</button>
        </div>
    );
};

export default Pagination;
import React, { useEffect } from 'react';

function MainPage({ toggleSidebar }) {
    useEffect(() => {
        toggleSidebar(false); // 메인 페이지에서는 사이드바를 닫음
    }, [toggleSidebar]);

    return (
        <div>
            <h1>메인 페이지</h1>
        </div>
    );
}

export default MainPage;

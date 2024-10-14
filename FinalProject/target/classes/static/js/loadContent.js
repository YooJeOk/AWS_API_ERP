document.addEventListener('DOMContentLoaded', function () {
    function loadContent(url, elementId) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            });
    }

    // 처음 로드될 때 메인 대시보드 화면으로 시작
    loadContent('header.html', 'header');
    loadContent('main-dashboard.html', 'main-content');
    
    // 사이드바 열기/닫기 함수
    function toggleSidebar(show) {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.transition = 'left 0.3s ease';  // 트랜지션 적용
        if (show) {
            sidebar.style.left = '0';  // 열린 상태
        } else {
            sidebar.style.left = '-250px';  // 닫힌 상태
        }
    }

    // 메인 페이지로 이동 시 사이드바 닫기
    function goToMain() {
        loadContent('main-dashboard.html', 'main-content');
        toggleSidebar(false);  // 메인 페이지에서는 사이드바 닫기
    }

    // 각 페이지에 맞는 사이드바를 열기
    function openSidebarForPage(pageUrl, sidebarUrl, keepSidebarOpen = true) {
        loadContent(sidebarUrl, 'sidebar');  // 각 페이지에 맞는 사이드바 로드
        loadContent(pageUrl, 'main-content');  // 해당 페이지 내용 로드
        if (keepSidebarOpen) {
            toggleSidebar(true);  // 사이드바는 열려있음
        } else {
            toggleSidebar(false);  // 필요에 따라 사이드바를 닫음
        }
    }

    // 각 버튼에 대한 이벤트 핸들러 설정
    function setupNavigation() {
        const mainButton = document.getElementById('main-button');
        const productionButton = document.getElementById('production-button');
        const salesButton = document.getElementById('sales-button');
        const purchaseButton = document.getElementById('purchase-button');
        const inventoryButton = document.getElementById('inventory-button');
        const logoutButton = document.getElementById('logout-button');

        // 메인 페이지 버튼 클릭 시 사이드바 닫기
        if (mainButton) {
            mainButton.addEventListener('click', goToMain);  // 메인 페이지로 이동 시 사이드바 닫기
        }

        // 각각의 페이지로 이동할 때 사이드바를 유지
        if (productionButton) {
            productionButton.addEventListener('click', () => {
                openSidebarForPage('production.html', 'production-sidebar.html', true);  // 생산 관리 페이지에 맞는 사이드바 열기
            });
        }

        if (salesButton) {
            salesButton.addEventListener('click', () => {
                openSidebarForPage('sales.html', 'sales-sidebar.html', true);  // 매출 관리 페이지에 맞는 사이드바 열기
            });
        }

        if (purchaseButton) {
            purchaseButton.addEventListener('click', () => {
                openSidebarForPage('purchase.html', 'purchase-sidebar.html', true);  // 재고 관리 페이지에 맞는 사이드바 열기
            });
        }

        if (inventoryButton) {
            inventoryButton.addEventListener('click', () => {
                openSidebarForPage('inventory.html', 'inventory-sidebar.html', true);  // 키오스크 관리 페이지에 맞는 사이드바 열기
            });
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                alert('로그아웃되었습니다.');
                location.assign('login.html');
            });
        }
    }

    // 페이지 로드 시 네비게이션 설정
    setTimeout(setupNavigation, 100);
});

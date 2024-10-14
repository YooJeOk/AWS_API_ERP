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
            mainButton.addEventListener('click', goToMain);
        }

        // 각각의 페이지로 이동할 때 사이드바를 유지
        if (productionButton) {
            productionButton.addEventListener('click', () => {
                openSidebarForPage('production.html', 'production-sidebar.html', true);
            });
        }

        if (salesButton) {
            salesButton.addEventListener('click', () => {
                openSidebarForPage('sales.html', 'sales-sidebar.html', true);
            });
        }

        if (purchaseButton) {
            purchaseButton.addEventListener('click', () => {
                openSidebarForPage('purchase.html', 'purchase-sidebar.html', true);
            });
        }

        if (inventoryButton) {
            inventoryButton.addEventListener('click', () => {
                openSidebarForPage('inventory.html', 'inventory-sidebar.html', true);
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
    setupNavigation();

    // 드롭다운 이벤트 설정
    const dropdowns = document.querySelectorAll('.dropdown-toggle');

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', function (e) {
            dropdowns.forEach((otherDropdown) => {
                if (otherDropdown !== e.currentTarget) {
                    const otherMenu = otherDropdown.nextElementSibling;
                    if (otherMenu.classList.contains('show')) {
                        otherDropdown.classList.remove('show');
                        otherMenu.classList.remove('show');
                    }
                }
            });

            const currentMenu = this.nextElementSibling;
            if (currentMenu.classList.contains('show')) {
                currentMenu.classList.remove('show');
            } else {
                currentMenu.classList.add('show');
            }
        });
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseover', function () {
            const currentMenu = this.nextElementSibling;
            currentMenu.classList.add('show');
            const siblingButtons = currentMenu.closest('.dropdown').nextElementSibling;
            if (siblingButtons) {
                siblingButtons.style.transform = 'translateY(' + currentMenu.scrollHeight + 'px)';
            }
        });

        dropdown.addEventListener('mouseout', function () {
            const currentMenu = this.nextElementSibling;
            currentMenu.classList.remove('show');
            const siblingButtons = currentMenu.closest('.dropdown').nextElementSibling;
            if (siblingButtons) {
                siblingButtons.style.transform = 'translateY(0)';
            }
        });
    });

    // 페이지에 데이터가 없을 때 메시지 표시
    const dataBody = document.getElementById('data-body');
    const noDataMessage = document.getElementById('no-data-message');

    if (dataBody && noDataMessage) {
        if (dataBody.children.length === 0) {
            noDataMessage.style.display = 'block';  // 데이터가 없을 때 문구를 표시
        } else {
            noDataMessage.style.display = 'none';  // 데이터가 있을 경우 문구 숨김
        }
    }

    // 생성 버튼 클릭 시 input.html로 이동
    const createButton = document.querySelector('.create-button');
    if (createButton) {
        createButton.addEventListener('click', function () {
            window.location.href = './input.html';
        });
    } else {
        console.log("생성 버튼을 찾을 수 없습니다.");
    }
});

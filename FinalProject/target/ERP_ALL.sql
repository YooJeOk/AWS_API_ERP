DROP TABLE IF EXISTS UserStamp;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS ERP.coffee_materials;
DROP TABLE IF EXISTS ERP.MBOM;
DROP TABLE IF EXISTS ERP.StoreInventory;
DROP TABLE IF EXISTS ERP.QualityControl;
DROP TABLE IF EXISTS ERP.ProductionEntry;
DROP TABLE IF EXISTS ERP.ProductionMonitoring;
DROP TABLE IF EXISTS ERP.ProductionPlanning;
DROP TABLE IF EXISTS ERP.WorkOrders;
DROP TABLE IF EXISTS ERP.CoffeeOptionSalesDetails;
DROP TABLE IF EXISTS ERP.SalesDetails;
DROP TABLE IF EXISTS ERP.SalesRecords;
DROP TABLE IF EXISTS ERP.RawMaterialRestockHistory;
DROP TABLE IF EXISTS ERP.ProductionConsumption;
DROP TABLE IF EXISTS ERP.FactoryInventory;
DROP TABLE IF EXISTS ERP.coffeeoptions;
DROP TABLE IF EXISTS ERP.MaterialsInventory;
DROP TABLE IF EXISTS ERP.DisposedRecords;
DROP TABLE IF EXISTS ERP.Coffee;

DROP TABLE IF EXISTS ERP.Product;

DROP TABLE IF EXISTS ERP.Suppliers;

CREATE SCHEMA ERP;
USE ERP;

-- 1. 제품 (Product)
CREATE TABLE ERP.Product (
    ProductID INT NOT NULL AUTO_INCREMENT, -- 제품ID
    ProductName VARCHAR(100) NULL, -- 제품명
    ProductCategory VARCHAR(50) NULL, -- 제품 카테고리
    UnitPrice INT NULL, -- 단가
    SalePrice INT NULL, -- 판매가
    ProductionDate DATETIME NULL, -- 생산 날짜
    ProductImage VARCHAR(200) NULL, -- 제품 이미지
    OnKiosk varchar(30) check (OnKiosk in ('Y','N')), -- 제품이 키오스크에 있는지 확인용
    Recommend varchar(30) check (Recommend in ('Y','N')), -- 제품 추천여부(키오스크용)
    DetailDescription varchar(300) NULL, -- 제품 설명(키오스크용)
    PRIMARY KEY (ProductID)
);

-- 2. 공급업체 (Suppliers)
CREATE TABLE ERP.Suppliers (
    SupplierID INT NOT NULL AUTO_INCREMENT, -- 공급업체ID
    SupplierName VARCHAR(100) NULL, -- 공급업체명
    ContactInfo VARCHAR(100) NULL, -- 연락처 정보
    Address VARCHAR(200) NULL, -- 주소
    SupplierType VARCHAR(50) NULL, -- 공급업체 유형
    RegistrationDate DATETIME NULL, -- 등록 날짜
    PRIMARY KEY (SupplierID)
);

-- 3. 원자재 재고 (MaterialsInventory)
CREATE TABLE ERP.MaterialsInventory (
    MaterialID INT NOT NULL AUTO_INCREMENT, -- 자재ID
    SupplierID INT NOT NULL, -- 공급업체ID
    MaterialName VARCHAR(100) NULL, -- 자재명
    Category VARCHAR(50) NULL, -- 카테고리
    Unit VARCHAR(50) NULL, -- 단위 (g, ml 등)
    UnitPrice INT NULL, -- 단가
    LastUpdated DATETIME NULL, -- 최종 업데이트
    PRIMARY KEY (MaterialID),
    FOREIGN KEY (SupplierID) REFERENCES ERP.Suppliers(SupplierID)
);


-- 4. 원자재 입고 이력 (RawMaterialRestockHistory)
CREATE TABLE ERP.RawMaterialRestockHistory (
    RestockID INT NOT NULL AUTO_INCREMENT, -- 재입고ID
    MaterialID INT NOT NULL, -- 자재ID
    SupplierID INT NOT NULL, -- 공급업체ID
    RestockQuantity INT NULL, -- 재입고 수량
    UnitPrice INT NULL, -- 단가
    RestockDate DATETIME NULL, -- 재입고 날짜
    PRIMARY KEY (RestockID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID),
    FOREIGN KEY (SupplierID) REFERENCES ERP.Suppliers(SupplierID)
);

-- 5. 원자재 소비 내역 (ProductionConsumption)
CREATE TABLE ERP.ProductionConsumption (
    ConsumptionID INT NOT NULL AUTO_INCREMENT, -- 소비ID
    MaterialID INT NOT NULL, -- 자재ID
    QuantityUsed INT NULL, -- 사용된 수량
    ProductionDate DATETIME NULL, -- 생산 날짜
    etc VARCHAR(100) NULL, -- 기타
    PRIMARY KEY (ConsumptionID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);

-- 6. 공장 재고 (FactoryInventory)
CREATE TABLE ERP.FactoryInventory (
    FactoryInventoryID INT NOT NULL AUTO_INCREMENT, -- 공장 재고ID
    ProductID INT NOT NULL, -- 제품ID
    MaterialID INT NOT NULL, -- 자재ID
    DisposalID INT NOT NULL, -- 폐기ID
    QuantityInFactory INT NULL, -- 공장 내 수량
    FactoryDate DATETIME NULL, -- 공장 날짜
        etc VARCHAR(100) NULL, -- 기타
    PRIMARY KEY (FactoryInventoryID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);

-- 7. 폐기 기록 (DisposedRecords)
CREATE TABLE ERP.DisposedRecords (
    DisposalID INT NOT NULL AUTO_INCREMENT, -- 폐기ID
    ProductID INT NOT NULL, -- 제품ID
    QuantityDisposed INT NULL, -- 폐기된 수량
    DisposalDate DATETIME NULL, -- 폐기 날짜
    DisposalReason VARCHAR(255) NULL, -- 폐기 이유
    PRIMARY KEY (DisposalID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID)
);

-- 8. 매장 커피 종류 (StoreCoffeeTypes)
CREATE TABLE ERP.Coffee (
    CoffeeID INT NOT NULL AUTO_INCREMENT, -- 커피ID
    CoffeeName VARCHAR(50) NULL, -- 커피 이름
    SalePrice INT NULL, -- 판매가
    CoffeeImage VARCHAR(200) NULL, -- 커피 이미지
	OnKiosk varchar(30) check (OnKiosk in ('Y','N')), -- 커피가 키오스크에 있는지 확인용
	Recommend varchar(30) check (Recommend in ('Y','N')), -- 제품 추천여부(키오스크용)
    Temperature varchar(30) check (Temperature in ('ICE','HOT')), -- 제품 온도(ICE 이거나 HOT이거나)
	DetailDescription varchar(300) NULL, -- 제품 설명(키오스크용)
    PRIMARY KEY (CoffeeID)
);
-- 9. 커피부가옵션
CREATE TABLE ERP.CoffeeOptions (
    OptionID INT NOT NULL AUTO_INCREMENT, -- 옵션 ID
    MaterialID INT NOT NULL, -- 원자재 ID를 참조
    Name VARCHAR(100) NOT NULL, -- 옵션 이름
    Price INT NOT NULL, -- 옵션 가격 (추가 금액)
    PRIMARY KEY (OptionID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);
-- 10. 판매 기록
CREATE TABLE ERP.SalesRecords (
    SaleID INT NOT NULL AUTO_INCREMENT,    -- 판매ID
    SaleDate DATETIME NULL,                -- 판매 날짜
    PaymentType VARCHAR(50) NULL,          -- 결제 유형
    TotalSalePrice INT NULL,               -- 실제 결제 판매가
    OrderAmount INT NULL,                  -- 주문 금액
    DiscountAmount INT NULL,               -- 할인 금액
    PRIMARY KEY (SaleID)
);

-- 11. 판매 세부 기록 (SalesDetails)
CREATE TABLE ERP.SalesDetails (
    SaleDetailID INT NOT NULL AUTO_INCREMENT, -- 판매 세부 ID
    SaleID INT NOT NULL, -- 판매ID (SalesRecords와 연결)
    ProductID INT NULL, -- 제품ID
    CoffeeID INT NULL, -- 커피ID
    QuantitySold INT NULL, -- 판매된 수량
    SalePrice INT NULL, -- 판매가
    PRIMARY KEY (SaleDetailID),
    FOREIGN KEY (SaleID) REFERENCES ERP.SalesRecords(SaleID), 
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID), 
    FOREIGN KEY (CoffeeID) REFERENCES ERP.Coffee(CoffeeID) 
);

-- 12. 커피 판매 세부 기록 
CREATE TABLE ERP.CoffeeOptionSalesDetails (
    CoffeeOptionDetailID INT NOT NULL AUTO_INCREMENT, -- 커피 추가 옵션 세부 ID
    SaleDetailID INT NOT NULL, -- 판매 세부 ID (SalesDetails와 연결)
    OptionID INT NOT NULL, -- 옵션 ID (CoffeeOptions와 연결)
    OptionQuantity INT NOT NULL, -- 옵션 수량
    OptionPrice INT NOT NULL, -- 옵션 가격
    OptionSize varchar(50) NOT NULL, -- 옵션 사이즈
	OptionTemperature varchar(50) NOT NULL, -- 옵션 온도
    PRIMARY KEY (CoffeeOptionDetailID),
    FOREIGN KEY (SaleDetailID) REFERENCES ERP.SalesDetails(SaleDetailID),
    FOREIGN KEY (OptionID) REFERENCES ERP.CoffeeOptions(OptionID)
);

-- 13. 작업 지시 (WorkOrders)

CREATE TABLE ERP.WorkOrders (
    OrderID INT NOT NULL AUTO_INCREMENT, -- 작업 지시ID
    ProductID INT NOT NULL, -- 제품ID
    Quantity INT NULL, -- 수량
    StartDate DATETIME NULL, -- 시작 날짜
    EndDate DATETIME NULL, -- 종료 날짜
	Priority VARCHAR(50) NULL, -- 우선순위
	etc VARCHAR(100) NULL, -- 기타
    PRIMARY KEY (OrderID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID)
);



-- 13. 생산 계획 (ProductionPlanning)
CREATE TABLE ERP.ProductionPlanning (
    PlanID INT NOT NULL AUTO_INCREMENT, -- 계획ID
    OrderID INT NOT NULL, -- 작업 지시ID
    ProductID INT NOT NULL, -- 제품ID
    StartDate DATETIME NULL, -- 시작 시간
    EndDate DATETIME NULL, -- 시작 시간
    etc VARCHAR(100) NULL, -- 기타
    PRIMARY KEY (PlanID),
    FOREIGN KEY (OrderID) REFERENCES ERP.WorkOrders(OrderID)
    
);




-- 14. 생산 모니터링 (ProductionMonitoring)
CREATE TABLE ERP.ProductionMonitoring (
    MonitorID INT NOT NULL AUTO_INCREMENT, -- 모니터링ID
    OrderID INT NOT NULL, -- 작업 지시ID
    Temperature FLOAT NULL, -- 온도
    Humidity FLOAT NULL, -- 습도
    ProductionRate FLOAT NULL, -- 생산률
    OperationTime FLOAT NULL, -- 작업 시간 (분 단위로 기록)
    StartTime DATETIME NULL, -- 작업 시작 시간
    PRIMARY KEY (MonitorID),
    FOREIGN KEY (OrderID) REFERENCES ERP.WorkOrders(OrderID)
);




-- 15. ProductionProcessStatus 테이블 생성 -- 
-- 각 공정 단계에 대해 완료 여부를 기록할 수 있도록 BOOLEAN 컬럼을 추가했습니다. 각 단계가 완료될 때마다 해당 컬럼을 TRUE로 업데이트하여 
-- 각 제품의 공정 진행 상태를 추적할 수 있습니다. 이 방식으로 세부적인 생산 공정을 관리하고, 전체 생산 상태를 확인할 수 있습니다
CREATE TABLE ProductionProcessStatus (
    MonitorID INT NOT NULL,                        -- ProductionMonitoring 테이블과 연계
	Status            VARCHAR(50) NULL,            -- 상태(대기,작업중,완료,위험,경고)
    WeighingComplete BOOLEAN DEFAULT FALSE,        -- 재료 계량 완료 여부 (약 10분)
    DoughComplete BOOLEAN DEFAULT FALSE,           -- 반죽 완료 여부 (약 20분)
    FirstFermentationComplete BOOLEAN DEFAULT FALSE, -- 1차 발효 완료 여부 (약 1시간)
    DivisionComplete BOOLEAN DEFAULT FALSE,        -- 분할 완료 여부 (약 10분)
    RoundingComplete BOOLEAN DEFAULT FALSE,        -- 둥글리기 완료 여부 (약 10분)
    IntermediateFermentationComplete BOOLEAN DEFAULT FALSE, -- 중간 발효 완료 여부 (약 30분)
    ShapingComplete BOOLEAN DEFAULT FALSE,         -- 정형 완료 여부 (약 10분)
    PanningComplete BOOLEAN DEFAULT FALSE,         -- 팬닝 완료 여부 (약 10분)
    SecondFermentationComplete BOOLEAN DEFAULT FALSE, -- 2차 발효 완료 여부 (약 1시간)
    BakingComplete BOOLEAN DEFAULT FALSE,          -- 굽기 완료 여부 (약 30분)
    CoolingComplete BOOLEAN DEFAULT FALSE,         -- 냉각 완료 여부 (약 20분)
    PackagingComplete BOOLEAN DEFAULT FALSE,       -- 포장 완료 여부 (약 10분)
    PRIMARY KEY (MonitorID),
    FOREIGN KEY (MonitorID) REFERENCES ProductionMonitoring(MonitorID)
);
-- 16. 생산제품 공장입고 (ProductionEntry)
CREATE TABLE ERP.ProductionEntry (
    EntryID INT NOT NULL AUTO_INCREMENT, -- 입력ID
    OrderID INT NOT NULL, -- 작업 지시ID
    ProductID INT NOT NULL, -- 제품ID
    Quantity INT NULL, -- 수량
    EntryDate DATETIME NULL, -- 입력 날짜
    etc VARCHAR(100) NULL, -- 기타
    PRIMARY KEY (EntryID),
    FOREIGN KEY (OrderID) REFERENCES ERP.WorkOrders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID)
);


-- 17. 품질 관리 (QualityControl)
CREATE TABLE ERP.QualityControl (
    QCID INT NOT NULL AUTO_INCREMENT, -- 품질관리ID
    EntryID INT NOT NULL, -- 입력ID
    ProductID INT NOT NULL, -- 제품ID
    TestResult VARCHAR(50) NULL, -- 테스트 결과
    TestDate DATETIME NULL, -- 테스트 날짜
    DefectRate INT DEFAULT 0 NULL, -- 불량률
    etc VARCHAR(100) NULL, -- 기타
    PRIMARY KEY (QCID),
    FOREIGN KEY (EntryID) REFERENCES ERP.ProductionEntry(EntryID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID)
);

-- 18. 매장 재고 (StoreInventory)
CREATE TABLE ERP.StoreInventory (
    StoreInventoryID INT NOT NULL AUTO_INCREMENT, -- 매장 재고ID
    ProductID INT, -- 제품ID
    MaterialID INT, -- 자재ID
    QuantityInStore INT NOT NULL, -- 매장 내 수량
    StoreDate DATETIME NOT NULL, -- 매장 날짜
    PRIMARY KEY (StoreInventoryID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);

-- 19 MBOM 
CREATE TABLE ERP.MBOM (
    BOMID INT NOT NULL AUTO_INCREMENT, -- BOMID
    ItemID INT NOT NULL,               -- 제품ID OR 커피ID
    ItemType ENUM('Product', 'Coffee'),-- 제품 또는 커피를 구분하는 컬럼
    Size ENUM('Regular', 'Extra') NULL, -- 사이즈 구분 컬럼, Coffee일 경우에만 사용
    MaterialID INT NOT NULL,           -- 자재ID
    ProductName VARCHAR(100) NOT NULL, -- 제품명
    Quantity INT NOT NULL,             -- 수량
    Unit VARCHAR(50) NULL,             -- 단위
    UnitPrice FLOAT NULL,              -- 단가
    TotalCost INT NULL,                -- 제품 원가
    PRIMARY KEY (BOMID, ItemID, MaterialID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);
-- 19_1 보조테이블
CREATE TABLE ProductMaterials (
    ProductID INT NOT NULL,
    MaterialID INT NOT NULL,
    Quantity FLOAT NOT NULL,
    PRIMARY KEY (ProductID, MaterialID),
    FOREIGN KEY (MaterialID) REFERENCES MaterialsInventory(MaterialID)
);


-- 20. 사용자 (Users)
CREATE TABLE ERP.Users (

    UserID INT NOT NULL AUTO_INCREMENT,-- 사용자ID

    Name VARCHAR(30) NULL, -- 이름
    PhoneNumber VARCHAR(30) NULL, -- 전화번호
    Email VARCHAR(30) NULL, -- 이메일
    Username VARCHAR(30) NULL, -- 사용자 이름
    Password VARCHAR(30) NULL, -- 비밀번호
    PRIMARY KEY (UserID)
);

-- 21. ERP.coffee_materials (커피 재료)
CREATE TABLE ERP.coffee_materials (
    CoffeeMaterialID INT NOT NULL AUTO_INCREMENT,-- 커피 재료ID
    CoffeeID INT NOT NULL, -- 커피ID
    MaterialID INT NOT NULL, -- 자재ID
    RawMaterialQuantity INT NULL, -- 원재료 수량
    PRIMARY KEY (CoffeeMaterialID, CoffeeID, MaterialID),
    FOREIGN KEY (CoffeeID) REFERENCES ERP.Coffee(CoffeeID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);
-- 22. 유저 스탬프 데이터
CREATE TABLE UserStamp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    stamp INT DEFAULT 0,
    coupon INT DEFAULT 0
);

DELIMITER //

CREATE TRIGGER update_coupon
BEFORE UPDATE ON UserStamp
FOR EACH ROW
BEGIN
    IF NEW.stamp >= 10 THEN
        SET NEW.coupon = NEW.coupon + FLOOR(NEW.stamp / 10);
        SET NEW.stamp = NEW.stamp - FLOOR(NEW.stamp / 10) * 10;
    END IF;
END; //

DELIMITER ;
INSERT INTO ERP.Product (ProductName, ProductCategory, UnitPrice, SalePrice, ProductionDate, ProductImage, OnKiosk,Recommend, DetailDescription)
VALUES 
-- 상품 insert문
('갈릭꽈베기', 'bread', 2000, 3500, '2024-01-01', '/images/bread/갈릭꽈배기.jpg','Y', 'Y', '결결이 바삭한 식감의 패스트리에 알싸한 남해 마늘의 진한 맛과 향이 더해진 간식형 제품'),
('단팥도넛', 'bread', 2500, 3700, '2024-01-01', '/images/bread/단팥도넛.jpg','Y', 'N', '달콤한 팥 앙금이 가득한 부드러운 도넛으로 전통과 현대의 맛이 조화로운 디저트'),
('고구마케이크빵', 'bread', 1800, 3000, '2024-01-01', '/images/bread/고구마케이크빵.jpg', 'Y','Y', '부드러운 빵 속에 달콤한 고구마 필링이 가득한 케이크 스타일의 빵'),
('꽈베기', 'bread', 2000, 2500, '2024-01-01', '/images/bread/꽈베기.jpg','Y', 'N', '쫄깃한 식감과 달콤한 맛이 일품인 전통적인 꽈배기'),
('라우겐', 'bread', 2400, 4000, '2024-01-01', '/images/bread/라우겐.jpg', 'Y','N', '독일식 프레첼 빵으로, 짭짤하고 쫄깃한 식감이 특징인 빵'),
('베이글빵', 'bread', 2000, 3800, '2024-01-01', '/images/bread/베이글빵.jpg','Y', 'N', '쫄깃한 식감과 부드러운 맛이 일품인 클래식한 베이글'),
('생크림소보로', 'bread', 2000, 3800, '2024-01-01', '/images/bread/생크림소보로.jpg','Y', 'N', '부드러운 생크림과 바삭한 소보로의 조화가 매력적인 달콤한 빵'),
('꿀버터바게트', 'bread', 2000, 3800, '2024-01-01', '/images/bread/꿀버터바게트.jpg', 'Y','N', '바삭한 바게트에 꿀과 버터가 스며들어 고소하고 달콤한 맛이 돋보이는 빵'),
('애플파이', 'bread', 3000, 4500, '2024-01-01', '/images/bread/애플파이.jpg','Y', 'N', '바삭한 페이스트리 속에 달콤하고 상큼한 사과 필링이 가득한 클래식한 디저트'),
('우유도넛', 'bread', 2200, 3300, '2024-01-01', '/images/bread/우유도넛.jpg', 'Y','N', '부드러운 우유 크림이 가득 들어간 폭신폭신한 도넛으로 은은한 우유 향이 일품'),
('찹쌀브레드', 'bread', 2800, 4200, '2024-01-01', '/images/bread/찹쌀브레드.jpg', 'Y','N', '쫄깃한 찹쌀의 식감과 부드러운 빵의 조화가 일품인 건강한 맛의 브레드'),
('카라멜 러스크', 'bread', 3500, 5000, '2024-01-01', '/images/bread/카라멜러스크.jpg', 'N','N', '바삭하게 구운 빵에 달콤한 카라멜을 입힌 고급스러운 간식'),
('캐찰빵', 'bread', 2600, 3800, '2024-01-01', '/images/bread/캐찰빵.jpg', 'N','N', '치즈의 고소함과 달콤한 빵의 조화가 일품인 멕시코 스타일의 특색있는 빵');

-- 커피 insert문
INSERT INTO ERP.Coffee (CoffeeID, CoffeeName, SalePrice, CoffeeImage,OnKiosk,Recommend, Temperature, DetailDescription)
VALUES 
(1, '아메리카노', 3200, '/images/coffee/아메리카노ice.jpg','Y', 'Y', 'ICE', '진한 에스프레소에 차가운 물을 더해 시원하고 깔끔한 맛을 느낄 수 있는 아이스 커피'),
(2, '카라멜 마끼야또', 3000, '/images/coffee/마끼야또ice.jpg','Y', 'Y', 'ICE', '카라멜 시럽의 달콤함과 에스프레소의 진한 맛이 조화롭게 어우러진 아이스 커피'),
(3, '카페라떼', 3500, '/images/coffee/카페라떼ice.jpg','Y', 'N', 'ICE', '에스프레소와 우유가 조화롭게 어우러진 부드러운 맛의 아이스 커피'),
(4, '바닐라라떼', 3800, '/images/coffee/바닐라라떼hot.jpg','Y', 'Y', 'HOT', '바닐라 시럽의 달콤함과 에스프레소, 우유가 조화롭게 어우러진 따뜻한 커피'),
(5, '카푸치노', 3500, '/images/coffee/카푸치노hot.jpg', 'N','N', 'HOT', '에스프레소와 스팀 밀크, 우유 거품이 1:1:1 비율로 어우러진 클래식한 이탈리안 커피'),
(6, '헤이즐넛라떼', 3800, '/images/coffee/헤이즐넛라떼ice.jpg','N', 'Y', 'ICE', '헤이즐넛 시럽의 고소한 향과 에스프레소, 우유가 조화롭게 어우러진 시원한 라떼'),
(7, '헤이즐넛아메리카노', 3500, '/images/coffee/헤이즐넛아메리카노ice.jpg','Y', 'N', 'ICE', '헤이즐넛 시럽의 고소함과 에스프레소의 깔끔한 맛이 어우러진 시원한 아메리카노'),
(8, '바닐라아메리카노', 3500, '/images/coffee/바닐라아메리카노ice.jpg','Y', 'N', 'ICE', '바닐라 시럽의 달콤함과 에스프레소의 깊은 맛이 조화를 이루는 시원한 아메리카노'),
(9, '카페모카', 4000, '/images/coffee/카페모카hot.jpg', 'Y','N', 'HOT', '초콜릿의 달콤함과 에스프레소의 쌉쌀함이 어우러진 따뜻한 모카 커피'),
(10, '콜드브루라떼', 4200, '/images/coffee/콜드브루라떼hot.jpg','Y', 'N', 'HOT', '차갑게 추출한 콜드브루 커피에 따뜻한 우유를 더해 부드러운 맛을 즐길 수 있는 라떼'),
(11, '헤이즐넛라떼', 3800, '/images/coffee/헤이즐넛라떼hot.jpg', 'Y','N', 'HOT', '헤이즐넛 시럽의 고소한 향과 에스프레소, 스팀 밀크가 어우러진 따뜻한 라떼'),
(12, '헤이즐넛아메리카노', 3500, '/images/coffee/헤이즐넛아메리카노hot.jpg','Y', 'N', 'HOT', '헤이즐넛 시럽의 고소함과 에스프레소의 깊은 맛이 어우러진 따뜻한 아메리카노'),
(13, '연유라떼', 4000, '/images/coffee/연유라떼ice.jpg','Y', 'N', 'ICE', '달콤한 연유와 에스프레소, 차가운 우유가 조화롭게 어우러진 시원한 라떼'),
(14, '에스프레소', 2500, '/images/coffee/에스프레소hot.jpg', 'Y','N', 'HOT', '진한 커피의 맛과 향을 온전히 즐길 수 있는 에스프레소 샷');

-- 2. 공급업체 (Suppliers) 테이블 더미 데이터
INSERT INTO ERP.Suppliers (SupplierName, ContactInfo, Address, SupplierType, RegistrationDate)
VALUES

('공급업체X', '010-1111-2222', '서울특별시 강남구', '식자재(빵) 공급', '2024-04-01 08:00:00'),
('공급업체Y', '010-3333-4444', '서울특별시 강남구', '식자재(커피) 공급', '2024-04-02 09:00:00'),
('공급업체O', '010-1111-2222', '서울특별시 강남구', '부자재 공급', '2024-04-01 08:00:00');

INSERT INTO ERP.MaterialsInventory (SupplierID, MaterialName, Category, Unit, UnitPrice, LastUpdated)
VALUES

-- 빵 관련 식자재 (1번 공급업체)
(1, '계란', '식자재', 'g', 4, '2024-04-05 10:30:00'),          
(1, '고구마필링', '식자재', 'g', 8, '2024-04-05 10:35:00'),    
(1, '마늘', '식자재', 'g', 10, '2024-04-05 10:45:00'),          
(1, '물', '식자재', 'ml', 0.2, '2024-04-05 10:50:00'),            
(1, '밀가루', '식자재', 'g', 1.5, '2024-04-05 10:55:00'),       
(1, '베이킹소다', '식자재', 'g', 2, '2024-04-05 11:10:00'),     
(1, '베이킹파우더', '식자재', 'g', 2, '2024-04-05 11:15:00'),   
(1, '소금', '식자재', 'g', 1, '2024-04-05 11:30:00'),           
(1, '시나몬 가루', '식자재', 'g', 6, '2024-04-05 11:40:00'),    
(1, '올리브오일', '식자재', 'ml', 10, '2024-04-05 11:50:00'),   
(1, '이스트', '식자재', 'g', 3, '2024-04-05 12:00:00'),         
(1, '파슬리', '식자재', 'g', 4, '2024-04-05 12:05:00'),         
(1, '꿀', '식자재', 'g', 10, '2024-04-05 10:40:00'),            
(1, '바닐라 추출물', '식자재', 'ml', 100, '2024-04-05 11:00:00'),
(1, '버터', '식자재', 'g', 12, '2024-04-05 11:05:00'),          
(1, '생크림', '식자재', 'g', 10, '2024-04-05 11:20:00'),        
(1, '설탕', '식자재', 'g', 0.5, '2024-04-05 11:25:00'),         
(1, '팥앙금', '식자재', 'g', 7, '2024-04-05 12:10:00'),  
(1, '우유', '식자재', 'ml', 3, '2024-04-05 12:10:00'),  

-- 커피 재료 (2번 공급업체)
(2, '원두(에스프레소)', '식자재', 'g', 20, '2024-04-06 09:00:00'),     
(2, '카라멜시럽', '식자재', 'ml', 15, '2024-04-06 09:10:00'),        
(2, '초콜릿 시럽', '식자재', 'ml', 6, '2024-04-06 09:20:00'),        
(2, '콜드브루 원액', '식자재', 'ml', 6, '2024-04-06 09:30:00'),        
(2, '연유', '식자재', 'g', 2, '2024-04-06 09:40:00'),  
(2, '얼음', '식자재', 'ml', 15, '2024-04-06 09:40:00'),                 
(2, '헤이즐넛 시럽', '식자재', 'ml', 6, '2024-04-06 09:10:00'),        
(2, '바닐라 시럽', '식자재', 'ml', 6, '2024-04-06 09:20:00'),   
(2, '메이플 시럽', '식자재', 'ml', 6, '2024-04-06 09:20:00'),   
(2, '아이스크림', '식자재', 'ml', 20, '2024-04-06 09:20:00'),   

-- 부자재 (3번 공급업체)
(3, '포장지', '포장재', '개', 20, '2024-04-06 11:00:00'),
(3, '컵(regular size)', '부자재', '개', 70, '2024-04-06 11:10:00'),
(3, '컵(extra size)', '부자재', '개', 80, '2024-04-06 11:20:00'),
(3, '빨대', '부자재', '개', 3, '2024-04-06 11:30:00'),
(3, '캐리어', '부자재', '개', 2, '2024-04-06 11:40:00');

-- 4. 원자재 재입고 이력 (RawMaterialRestockHistory) 테이블 더미 데이터
INSERT INTO ERP.RawMaterialRestockHistory (MaterialID, SupplierID, RestockQuantity, UnitPrice, RestockDate)
VALUES
(1, 1, 500, 5000, '2024-04-08 09:30:00'),
(2, 2, 300, 3000, '2024-04-09 10:00:00'),
(3, 3, 400, 10000, '2024-04-10 11:00:00');

-- 5. 생산 소비 (ProductionConsumption) 테이블 더미 데이터
INSERT INTO ERP.ProductionConsumption (MaterialID, QuantityUsed, ProductionDate, etc)
VALUES
(1, 100, '2024-04-11 10:00:00', '일반 소모'),
(2, 200, '2024-04-12 11:00:00', '추가 소모'),
(3, 150, '2024-04-13 12:00:00', '테스트용 소모');


-- 6. 공장 재고 (FactoryInventory) 테이블 더미 데이터
INSERT INTO ERP.FactoryInventory (ProductID, MaterialID, DisposalID, QuantityInFactory, FactoryDate, etc)
VALUES
(1, 1, 1, 500, '2024-04-14 09:00:00', '정기 입고'),
(2, 2, 2, 300, '2024-04-15 10:00:00', '추가 보충'),
(3, 3, 3, 400, '2024-04-16 11:00:00', '일반 재고');


-- 7. 폐기 기록 (DisposedRecords) 테이블 더미 데이터
INSERT INTO ERP.DisposedRecords (ProductID, QuantityDisposed, DisposalDate, DisposalReason)
VALUES
(1, 100, '2024-04-17 10:00:00', '불량품 폐기'),
(2, 200, '2024-04-18 11:00:00', '유통기한 초과'),
(3, 150, '2024-04-19 12:00:00', '고객 반품');


-- 9. 커피 추가옵션 insert
INSERT INTO ERP.CoffeeOptions (MaterialID, Name, Price)
SELECT MaterialID, '에스프레소 샷', 500 FROM ERP.MaterialsInventory WHERE MaterialName = '원두(에스프레소)'
UNION ALL
SELECT MaterialID, '헤이즐넛 시럽', 300 FROM ERP.MaterialsInventory WHERE MaterialName = '헤이즐넛 시럽'
UNION ALL
SELECT MaterialID, '바닐라 시럽', 300 FROM ERP.MaterialsInventory WHERE MaterialName = '바닐라 시럽'
UNION ALL
SELECT MaterialID, '메이플 시럽', 300 FROM ERP.MaterialsInventory WHERE MaterialName = '메이플 시럽'
UNION ALL
SELECT MaterialID, '아이스크림', 1000 FROM ERP.MaterialsInventory WHERE MaterialName = '아이스크림'
UNION ALL
SELECT MaterialID, '우유', 500 FROM ERP.MaterialsInventory WHERE MaterialName = '우유';

-- 13. WorkOrders 테이블에 더미 데이터 삽입
INSERT INTO ERP.WorkOrders (ProductID, Quantity, StartDate, EndDate, Priority, etc) VALUES
(1, 100, '2024-10-28 08:00:00', '2024-10-28 16:00:00', 'High', '긴급 작업 요청'),
(2, 200, '2024-10-29 09:00:00', '2024-10-29 17:00:00', 'Medium', '일반 작업 요청'),
(3, 150, '2024-10-30 10:00:00', '2024-10-30 18:00:00', 'Low', '특별 공정 필요'),
(4, 250, '2024-10-31 07:30:00', '2024-10-31 15:30:00', 'High', '정시 납기 요구');


-- 15. 생산 모니터링 (ProductionMonitoring) 테이블 더미 데이터 (OrderID 1, 4가 진행 중인 작업) CSV파일형태로 넣어야됨
-- INSERT INTO ERP.ProductionMonitoring (OrderID, Temperature, Humidity, ProductionRate, OperationTime, StartTime)
-- VALUES
 -- 진행 중인 작업 (OrderID 1) (온도와 습도를 적정 범위 내에서 설정)
-- (1, 28.0, 65, 83, 256, '2024-04-23 08:00:00'), -- 적정 온도 28°C+-5, 적정 습도 65%+-5

--  진행 중인 작업 (OrderID 4) (온도와 습도를 적정 범위 내에서 설정)
-- (4, 27.5, 67, 25, 93, '2024-05-10 08:30:00'); -- 적정 온도 27.5°C+-5, 적정 습도 67%+-5


-- 상태(대기,작업중,완료,위험,경고)
--     WeighingComplete BOOLEAN DEFAULT FALSE,        -- 재료 계량 완료 여부 (약 10분)
--     DoughComplete BOOLEAN DEFAULT FALSE,           -- 반죽 완료 여부 (약 20분)
--     FirstFermentationComplete BOOLEAN DEFAULT FALSE, -- 1차 발효 완료 여부 (약 1시간)
--     DivisionComplete BOOLEAN DEFAULT FALSE,        -- 분할 완료 여부 (약 10분)
--     RoundingComplete BOOLEAN DEFAULT FALSE,        -- 둥글리기 완료 여부 (약 10분)
--     IntermediateFermentationComplete BOOLEAN DEFAULT FALSE, -- 중간 발효 완료 여부 (약 30분)
--     ShapingComplete BOOLEAN DEFAULT FALSE,         -- 정형 완료 여부 (약 10분)
--     PanningComplete BOOLEAN DEFAULT FALSE,         -- 팬닝 완료 여부 (약 10분)
--     SecondFermentationComplete BOOLEAN DEFAULT FALSE, -- 2차 발효 완료 여부 (약 1시간)
--     BakingComplete BOOLEAN DEFAULT FALSE,          -- 굽기 완료 여부 (약 30분)
--     CoolingComplete BOOLEAN DEFAULT FALSE,         -- 냉각 완료 여부 (약 20분)
--     PackagingComplete BOOLEAN DEFAULT FALSE,       -- 포장 완료 여부 (약 10분)

 -- . 생산 계획 (ProductionPlanning) 테이블 더미 데이터
INSERT INTO ERP.ProductionPlanning (OrderID, ProductID, StartDate, EndDate, etc)
VALUES
(1, 1,  '2024-04-23 08:00:00', '2024-04-23 13:30:00' , '긴급가동'), 
(2, 2,  '2024-05-01 09:00:00', '2024-05-01 14:00:00' , '5월첫가동'), 
(3, 3,  '2024-05-06 10:00:00', '2024-05-06 15:30:00' , '예약주문'), 
(4, 4,  '2024-05-10 08:30:00', '2024-05-10 12:30:00' , '예비재고');

 
 
 -- ProductionProcessStatus 테이블에 더미 데이터 삽입
INSERT INTO ERP.ProductionProcessStatus (MonitorID, Status, WeighingComplete, DoughComplete, FirstFermentationComplete, 
                                     DivisionComplete, RoundingComplete, IntermediateFermentationComplete, 
                                     ShapingComplete, PanningComplete, SecondFermentationComplete, 
                                     BakingComplete, CoolingComplete, PackagingComplete) 
VALUES 
(1, '작업중', TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),   -- 1차 발효 단계 대기
(2, '완료', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),  -- 모든 공정 대기 상태
(3, '경고', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE),           -- 냉각 및 포장 대기
(4, '작업중', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);             -- 모든 공정 완료




-- 16. 생산입고 (ProductionEntry) 테이블 더미 데이터 (20분 후 입고되도록 수정)
INSERT INTO ERP.ProductionEntry (OrderID, ProductID, Quantity, EntryDate, etc)
VALUES
(1, 1, 500, '2024-04-23 13:50:00', '일반 입고'),
(2, 2, 300, '2024-05-01 14:20:00', '정기 입고'),
(3, 3, 400, '2024-05-06 15:50:00', '긴급 입고'),
(4, 4, 200, '2024-05-10 12:50:00','일반 입고');



-- 17. 품질 관리 (QualityControl) 테이블 더미 데이터 (입고 후 10분 이내에 검사되도록 수정)
INSERT INTO ERP.QualityControl (EntryID, ProductID, TestResult, TestDate, DefectRate, etc)
VALUES
(1, 1, '합격', '2024-04-23 14:00:00', 2, '정상 '),
(2, 2, '불합격', '2024-05-01 14:30:00', 10, '불량 발견'),
(3, 3, '합격', '2024-05-06 16:00:00', 0, '정상'),
(4, 4, '합격', '2024-05-10 13:00:00', 1, '정상');



-- 18. 매장 재고 (StoreInventory) 테이블 더미 데이터
select * from StoreInventory;
INSERT INTO ERP.StoreInventory (ProductID, MaterialID, QuantityInStore, StoreDate)
VALUES
-- 빵 아이템 재고
(1, NULL, 50, '2024-10-29 00:00:00'),  -- 갈릭꽈베기
(2, NULL, 40, '2024-10-29 00:00:00'),  -- 단팥도넛
(3, NULL, 45, '2024-10-29 00:00:00'),  -- 고구마케이크빵
(4, NULL, 55, '2024-10-29 00:00:00'),  -- 꽈베기
(5, NULL, 30, '2024-10-29 00:00:00'),  -- 라우겐
(6, NULL, 35, '2024-10-29 00:00:00'),  -- 베이글빵
(7, NULL, 40, '2024-10-29 00:00:00'),  -- 생크림소보로
(8, NULL, 25, '2024-10-29 00:00:00'),  -- 꿀버터바게트
(9, NULL, 20, '2024-10-29 00:00:00'),  -- 애플파이
(10, NULL, 30, '2024-10-29 00:00:00'), -- 우유도넛
(11, NULL, 35, '2024-10-29 00:00:00'), -- 찹쌀브레드
(12, NULL, 15, '2024-10-29 00:00:00'), -- 카라멜 러스크
(13, NULL, 25, '2024-10-29 00:00:00'), -- 캐찰빵

-- 커피 재료 재고 (SupplierID = 2)
(NULL, 20, 5000, '2024-10-29 00:00:00'),  -- 원두(에스프레소)
(NULL, 21, 2000, '2024-10-29 00:00:00'),  -- 카라멜시럽
(NULL, 22, 1500, '2024-10-29 00:00:00'),  -- 초콜릿 시럽
(NULL, 23, 3000, '2024-10-29 00:00:00'),  -- 콜드브루 원액
(NULL, 24, 1000, '2024-10-29 00:00:00'),  -- 연유
(NULL, 25, 10000, '2024-10-29 00:00:00'), -- 얼음
(NULL, 26, 1800, '2024-10-29 00:00:00'),  -- 헤이즐넛 시럽
(NULL, 27, 1800, '2024-10-29 00:00:00'),  -- 바닐라 시럽
(NULL, 28, 1500, '2024-10-29 00:00:00'),  -- 메이플 시럽
(NULL, 29, 2000, '2024-10-29 00:00:00'),  -- 아이스크림

-- 부자재 재고 (SupplierID = 3)
(NULL, 30, 100, '2024-10-29 00:00:00'), -- 포장지
(NULL, 31, 100, '2024-10-29 00:00:00'),  -- 컵(regular size)
(NULL, 32, 232, '2024-10-29 00:00:00'),  -- 컵(extra size)
(NULL, 33, 250, '2024-10-29 00:00:00'), -- 빨대
(NULL, 34, 300, '2024-10-29 00:00:00')   -- 캐리어
;

-- 19. MBOM 테이블 더미 데이터
INSERT INTO ERP.MBOM (ItemID, ItemType, Size, MaterialID, ProductName, Quantity, Unit, UnitPrice, TotalCost)
VALUES
-- 갈릭꽈베기 885원
(1, 'Product', NULL, 5, '갈릭꽈베기', 50, 'g', 1.5, 50 * 1.5),   -- 밀가루
(1, 'Product', NULL, 3, '갈릭꽈베기', 50, 'g', 10, 50 * 10),     -- 마늘
(1, 'Product', NULL, 17, '갈릭꽈베기', 10, 'g', 0.5, 10 * 0.5),  -- 설탕
(1, 'Product', NULL, 15, '갈릭꽈베기', 10, 'g', 12, 10 * 12),    -- 버터
(1, 'Product', NULL, 19, '갈릭꽈베기', 20, 'ml', 3, 20 * 3),     -- 우유
(1, 'Product', NULL, 11, '갈릭꽈베기', 5, 'g', 3, 5 * 3),        -- 이스트
(1, 'Product', NULL, 10, '갈릭꽈베기', 10, 'ml', 10, 10 * 10),   -- 올리브오일
(1, 'Product', NULL, 30, '갈릭꽈베기', 1, 'ea', 10, 10),         -- 포장지

-- 단팥도넛 502.5원
(2, 'Product', NULL, 5, '단팥도넛', 60, 'g', 1.5, 60 * 1.5),    -- 밀가루
(2, 'Product', NULL, 11, '단팥도넛', 5, 'g', 3, 5 * 3),         -- 이스트
(2, 'Product', NULL, 15, '단팥도넛', 15, 'g', 12, 15 * 12),     -- 버터
(2, 'Product', NULL, 17, '단팥도넛', 15, 'g', 0.5, 15 * 0.5),   -- 설탕
(2, 'Product', NULL, 18, '단팥도넛', 20, 'g', 7, 20 * 7),       -- 팥앙금
(2, 'Product', NULL, 19, '단팥도넛', 20, 'ml', 3, 20 * 3),      -- 우유
(2, 'Product', NULL, 30, '단팥도넛', 1, 'ea', 10, 10),          -- 포장지


-- 고구마케이크빵 730원
(3, 'Product', NULL, 2, '고구마케이크빵', 30, 'g', 8, 30 * 8),       -- 고구마필링
(3, 'Product', NULL, 5, '고구마케이크빵', 50, 'g', 1.5, 50 * 1.5),   -- 밀가루
(3, 'Product', NULL, 9, '고구마케이크빵', 10, 'g', 6, 10 * 6),       -- 시나몬 가루
(3, 'Product', NULL, 11, '고구마케이크빵', 5, 'g', 3, 5 * 3),        -- 이스트
(3, 'Product', NULL, 15, '고구마케이크빵', 10, 'g', 12, 10 * 12),    -- 버터
(3, 'Product', NULL, 17, '고구마케이크빵', 20, 'g', 0.5, 20 * 0.5),  -- 설탕
(3, 'Product', NULL, 19, '고구마케이크빵', 10, 'ml', 8, 10 * 8),     -- 우유
(3, 'Product', NULL, 30, '고구마케이크빵', 1, 'ea', 10, 10),         -- 포장지

-- 꽈베기 475원
(4, 'Product', NULL, 5, '꽈베기', 30, 'g', 1.5, 30 * 1.5),          -- 밀가루
(4, 'Product', NULL, 8, '꽈베기', 5, 'g', 2, 5 * 2),               -- 소금
(4, 'Product', NULL, 9, '꽈베기', 5, 'g', 6, 5 * 6),               -- 시나몬 가루
(4, 'Product', NULL, 11, '꽈베기', 5, 'g', 3, 5 * 3),              -- 이스트
(4, 'Product', NULL, 17, '꽈베기', 10, 'g', 0.5, 10 * 0.5),        -- 설탕
(4, 'Product', NULL, 25, '꽈베기', 20, 'ml', 18, 20 * 18),         -- 식용유
(4, 'Product', NULL, 30, '꽈베기', 1, 'ea', 10, 10),               -- 포장지


-- 라우겐 775원
(5, 'Product', NULL, 5, '라우겐', 100, 'g', 1.5, 100 * 1.5),     -- 밀가루
(5, 'Product', NULL, 8, '라우겐', 5, 'g', 2, 5 * 2),             -- 소금
(5, 'Product', NULL, 9, '라우겐', 10, 'g', 6, 10 * 6),           -- 시나몬 가루
(5, 'Product', NULL, 11, '라우겐', 5, 'g', 3, 5 * 3),            -- 이스트
(5, 'Product', NULL, 15, '라우겐', 10, 'g', 12, 10 * 12),        -- 버터
(5, 'Product', NULL, 17, '라우겐', 20, 'g', 0.5, 20 * 0.5),      -- 설탕
(5, 'Product', NULL, 19, '라우겐', 50, 'ml', 8, 50 * 8),         -- 우유
(5, 'Product', NULL, 30, '라우겐', 1, 'ea', 10, 10),             -- 포장지


-- 베이글빵 315원
(6, 'Product', NULL, 5, '베이글빵', 50, 'g', 1.5, 50 * 1.5),     -- 밀가루
(6, 'Product', NULL, 8, '베이글빵', 5, 'g', 2, 5 * 2),           -- 소금
(6, 'Product', NULL, 9, '베이글빵', 5, 'g', 6, 5 * 6),           -- 시나몬 가루
(6, 'Product', NULL, 11, '베이글빵', 5, 'g', 3, 5 * 3),          -- 이스트
(6, 'Product', NULL, 17, '베이글빵', 30, 'g', 0.5, 30 * 0.5),    -- 설탕
(6, 'Product', NULL, 19, '베이글빵', 20, 'ml', 8, 20 * 8),       -- 우유
(6, 'Product', NULL, 30, '베이글빵', 1, 'ea', 10, 10),           -- 포장지



-- 생크림소보로 1225원
(7, 'Product', NULL, 5, '생크림소보로', 40, 'g', 1.5, 40 * 1.5),    -- 밀가루
(7, 'Product', NULL, 8, '생크림소보로', 10, 'g', 2, 10 * 2),        -- 소금
(7, 'Product', NULL, 9, '생크림소보로', 5, 'g', 6, 5 * 6),          -- 시나몬 가루
(7, 'Product', NULL, 11, '생크림소보로', 5, 'g', 3, 5 * 3),         -- 이스트
(7, 'Product', NULL, 15, '생크림소보로', 10, 'g', 12, 10 * 12),     -- 버터
(7, 'Product', NULL, 17, '생크림소보로', 20, 'g', 0.5, 20 * 0.5),   -- 설탕
(7, 'Product', NULL, 18, '생크림소보로', 40, 'g', 20, 40 * 20),     -- 생크림
(7, 'Product', NULL, 19, '생크림소보로', 20, 'ml', 8, 20 * 8),      -- 우유
(7, 'Product', NULL, 30, '생크림소보로', 1, 'ea', 10, 10),          -- 포장지


-- 꿀버터바게트 1085원
(8, 'Product', NULL, 5, '꿀버터바게트', 60, 'g', 1.5, 60 * 1.5),       -- 밀가루
(8, 'Product', NULL, 8, '꿀버터바게트', 10, 'g', 2, 10 * 2),           -- 소금
(8, 'Product', NULL, 9, '꿀버터바게트', 5, 'g', 6, 5 * 6),             -- 시나몬 가루
(8, 'Product', NULL, 11, '꿀버터바게트', 5, 'g', 3, 5 * 3),            -- 이스트
(8, 'Product', NULL, 17, '꿀버터바게트', 20, 'g', 0.5, 20 * 0.5),      -- 설탕
(8, 'Product', NULL, 19, '꿀버터바게트', 20, 'ml', 8, 20 * 8),         -- 우유
(8, 'Product', NULL, 25, '꿀버터바게트', 30, 'ml', 25, 30 * 25),       -- 꿀
(8, 'Product', NULL, 30, '꿀버터바게트', 1, 'ea', 10, 10),             -- 포장지

-- 애플파이 425원
(9, 'Product', NULL, 5, '애플파이', 40, 'g', 1.5, 40 * 1.5),           -- 밀가루
(9, 'Product', NULL, 8, '애플파이', 10, 'g', 2, 10 * 2),               -- 소금
(9, 'Product', NULL, 9, '애플파이', 5, 'g', 6, 5 * 6),                 -- 시나몬 가루
(9, 'Product', NULL, 11, '애플파이', 5, 'g', 3, 5 * 3),                -- 이스트
(9, 'Product', NULL, 15, '애플파이', 10, 'g', 12, 10 * 12),            -- 버터
(9, 'Product', NULL, 17, '애플파이', 20, 'g', 0.5, 20 * 0.5),          -- 설탕
(9, 'Product', NULL, 19, '애플파이', 20, 'ml', 8, 20 * 8),             -- 우유
(9, 'Product', NULL, 30, '애플파이', 1, 'ea', 10, 10),                 -- 포장지

-- 우유도넛 451.5원
(10, 'Product', NULL, 5, '우유도넛', 50, 'g', 1.5, 50 * 1.5),    -- 밀가루
(10, 'Product', NULL, 7, '우유도넛', 10, 'g', 2, 10 * 2),        -- 베이킹파우더
(10, 'Product', NULL, 8, '우유도넛', 2, 'g', 1, 2 * 1),          -- 소금
(10, 'Product', NULL, 10, '우유도넛', 5, 'ml', 10, 5 * 10),      -- 올리브오일
(10, 'Product', NULL, 11, '우유도넛', 5, 'g', 3, 5 * 3),         -- 이스트
(10, 'Product', NULL, 12, '우유도넛', 3, 'g', 4, 3 * 4),         -- 파슬리
(10, 'Product', NULL, 15, '우유도넛', 10, 'g', 12, 10 * 12),     -- 버터
(10, 'Product', NULL, 17, '우유도넛', 15, 'g', 0.5, 15 * 0.5),   -- 설탕
(10, 'Product', NULL, 19, '우유도넛', 30, 'ml', 3, 30 * 3),      -- 우유
(10, 'Product', NULL, 30, '우유도넛', 1, 'ea', 10, 10),          -- 포장지

-- 찹쌀브레드 1395원
(11, 'Product', NULL, 5, '찹쌀브레드', 100, 'g', 1.5, 100 * 1.5),       -- 밀가루
(11, 'Product', NULL, 8, '찹쌀브레드', 10, 'g', 2, 10 * 2),             -- 소금
(11, 'Product', NULL, 9, '찹쌀브레드', 5, 'g', 6, 5 * 6),               -- 시나몬 가루
(11, 'Product', NULL, 11, '찹쌀브레드', 5, 'g', 3, 5 * 3),              -- 이스트
(11, 'Product', NULL, 17, '찹쌀브레드', 20, 'g', 0.5, 20 * 0.5),        -- 설탕
(11, 'Product', NULL, 19, '찹쌀브레드', 20, 'ml', 8, 20 * 8),           -- 우유
(11, 'Product', NULL, 26, '찹쌀브레드', 50, 'g', 20, 50 * 20),          -- 찹쌀
(11, 'Product', NULL, 30, '찹쌀브레드', 1, 'ea', 10, 10),               -- 포장지

-- 카라멜러스크 540원
(12, 'Product', NULL, 4, '카라멜러스크', 10, 'ml', 15, 10 * 15),        -- 카라멜 시럽
(12, 'Product', NULL, 5, '카라멜러스크', 40, 'g', 1.5, 40 * 1.5),       -- 밀가루
(12, 'Product', NULL, 8, '카라멜러스크', 10, 'g', 2, 10 * 2),           -- 소금
(12, 'Product', NULL, 11, '카라멜러스크', 5, 'g', 3, 5 * 3),            -- 이스트
(12, 'Product', NULL, 15, '카라멜러스크', 10, 'g', 12, 10 * 12),        -- 버터
(12, 'Product', NULL, 17, '카라멜러스크', 10, 'g', 0.5, 10 * 0.5),      -- 설탕
(12, 'Product', NULL, 19, '카라멜러스크', 20, 'ml', 8, 20 * 8),         -- 우유
(12, 'Product', NULL, 30, '카라멜러스크', 1, 'ea', 10, 10),             -- 포장지


-- 캐찰빵 315원
(13, 'Product', NULL, 5, '캐찰빵', 50, 'g', 1.5, 50 * 1.5),             -- 밀가루
(13, 'Product', NULL, 8, '캐찰빵', 10, 'g', 2, 10 * 2),                 -- 소금
(13, 'Product', NULL, 9, '캐찰빵', 5, 'g', 6, 5 * 6),                   -- 시나몬 가루
(13, 'Product', NULL, 11, '캐찰빵', 5, 'g', 3, 5 * 3),                  -- 이스트
(13, 'Product', NULL, 17, '캐찰빵', 10, 'g', 0.5, 10 * 0.5),            -- 설탕
(13, 'Product', NULL, 19, '캐찰빵', 20, 'ml', 8, 20 * 8),               -- 우유
(13, 'Product', NULL, 30, '캐찰빵', 1, 'ea', 10, 10),                   -- 포장지





-- 아메리카노 790원
(1, 'Coffee', 'Regular', 1, '아메리카노', 20, 'g', 20, 20 * 20),       -- 원두(에스프레소)
(1, 'Coffee', 'Regular', 2, '아메리카노', 100, 'ml', 0.2, 100 * 0.2),  -- 물
(1, 'Coffee', 'Regular', 6, '아메리카노', 150, 'ml', 2, 150 * 2),      -- 얼음
(1, 'Coffee', 'Regular', 7, '아메리카노', 1, 'ea', 70, 70),            -- 컵(regular size)

-- 카라멜 마끼야또 1392.5원
(2, 'Coffee', 'Regular', 1, '카라멜 마끼야또', 20, 'g', 20, 20 * 20),       -- 원두(에스프레소)
(2, 'Coffee', 'Regular', 3, '카라멜 마끼야또', 15, 'ml', 1.5, 15 * 1.5),    -- 카라멜 시럽
(2, 'Coffee', 'Regular', 4, '카라멜 마끼야또', 100, 'ml', 3, 100 * 3),      -- 우유
(2, 'Coffee', 'Regular', 6, '카라멜 마끼야또', 150, 'ml', 2, 150 * 2),      -- 얼음
(2, 'Coffee', 'Regular', 7, '카라멜 마끼야또', 1, 'ea', 70, 70),            -- 컵(regular size)

-- 카페라떼 1070원
(3, 'Coffee', 'Regular', 1, '카페라떼', 20, 'g', 20, 20 * 20),             -- 원두(에스프레소)
(3, 'Coffee', 'Regular', 4, '카페라떼', 100, 'ml', 3, 100 * 3),            -- 우유
(3, 'Coffee', 'Regular', 6, '카페라떼', 150, 'ml', 2, 150 * 2),            -- 얼음
(3, 'Coffee', 'Regular', 7, '카페라떼', 1, 'ea', 70, 70),                  -- 컵(regular size)

-- 바닐라라떼 1220원
(4, 'Coffee', 'Regular', 1, '바닐라라떼', 20, 'g', 20, 20 * 20),           -- 원두(에스프레소)
(4, 'Coffee', 'Regular', 4, '바닐라라떼', 100, 'ml', 3, 100 * 3),          -- 우유
(4, 'Coffee', 'Regular', 5, '바닐라라떼', 15, 'ml', 10, 15 * 10),          -- 바닐라 시럽
(4, 'Coffee', 'Regular', 6, '바닐라라떼', 150, 'ml', 2, 150 * 2),          -- 얼음
(4, 'Coffee', 'Regular', 7, '바닐라라떼', 1, 'ea', 70, 70),                -- 컵(regular size)

-- 카푸치노 1070원
(5, 'Coffee', 'Regular', 1, '카푸치노', 20, 'g', 20, 20 * 20),            -- 원두(에스프레소)
(5, 'Coffee', 'Regular', 4, '카푸치노', 100, 'ml', 3, 100 * 3),           -- 우유
(5, 'Coffee', 'Regular', 6, '카푸치노', 150, 'ml', 2, 150 * 2),           -- 얼음
(5, 'Coffee', 'Regular', 7, '카푸치노', 1, 'ea', 70, 70),                 -- 컵(regular size)

-- 헤이즐넛라떼 1270원
(6, 'Coffee', 'Regular', 1, '헤이즐넛라떼', 20, 'g', 20, 20 * 20),        -- 원두(에스프레소)
(6, 'Coffee', 'Regular', 4, '헤이즐넛라떼', 100, 'ml', 3, 100 * 3),       -- 우유
(6, 'Coffee', 'Regular', 5, '헤이즐넛라떼', 15, 'ml', 10, 15 * 10),       -- 헤이즐넛 시럽
(6, 'Coffee', 'Regular', 6, '헤이즐넛라떼', 150, 'ml', 2, 150 * 2),       -- 얼음
(6, 'Coffee', 'Regular', 7, '헤이즐넛라떼', 1, 'ea', 70, 70),             -- 컵(regular size)




-- 헤이즐넛 아메리카노 970원
(7, 'Coffee', 'Regular', 1, '헤이즐넛 아메리카노', 20, 'g', 20, 20 * 20),       -- 원두(에스프레소)
(7, 'Coffee', 'Regular', 5, '헤이즐넛 아메리카노', 15, 'ml', 10, 15 * 10),      -- 헤이즐넛 시럽
(7, 'Coffee', 'Regular', 2, '헤이즐넛 아메리카노', 100, 'ml', 0.2, 100 * 0.2),  -- 물
(7, 'Coffee', 'Regular', 6, '헤이즐넛 아메리카노', 150, 'ml', 2, 150 * 2),      -- 얼음
(7, 'Coffee', 'Regular', 7, '헤이즐넛 아메리카노', 1, 'ea', 70, 70),            -- 컵(regular size)

-- 바닐라 아메리카노 1220원
(8, 'Coffee', 'Regular', 1, '바닐라 아메리카노', 20, 'g', 20, 20 * 20),         -- 원두(에스프레소)
(8, 'Coffee', 'Regular', 5, '바닐라 아메리카노', 15, 'ml', 10, 15 * 10),        -- 바닐라 시럽
(8, 'Coffee', 'Regular', 2, '바닐라 아메리카노', 100, 'ml', 0.2, 100 * 0.2),    -- 물
(8, 'Coffee', 'Regular', 6, '바닐라 아메리카노', 150, 'ml', 2, 150 * 2),        -- 얼음
(8, 'Coffee', 'Regular', 7, '바닐라 아메리카노', 1, 'ea', 70, 70),              -- 컵(regular size)

-- 콜드브루라떼 1630원
(10, 'Coffee', 'Regular', 1, '콜드브루라떼', 20, 'g', 20, 20 * 20),             -- 원두(에스프레소)
(10, 'Coffee', 'Regular', 4, '콜드브루라떼', 100, 'ml', 3, 100 * 3),            -- 우유
(10, 'Coffee', 'Regular', 6, '콜드브루라떼', 150, 'ml', 2, 150 * 2),            -- 얼음
(10, 'Coffee', 'Regular', 7, '콜드브루라떼', 1, 'ea', 70, 70),                  -- 컵(regular size)

-- 헤이즐넛라떼(핫) 1370원
(11, 'Coffee', 'Regular', 1, '헤이즐넛라떼', 20, 'g', 20, 20 * 20),             -- 원두(에스프레소)
(11, 'Coffee', 'Regular', 5, '헤이즐넛라떼', 15, 'ml', 10, 15 * 10),            -- 헤이즐넛 시럽
(11, 'Coffee', 'Regular', 4, '헤이즐넛라떼', 100, 'ml', 3, 100 * 3),            -- 우유
(11, 'Coffee', 'Regular', 7, '헤이즐넛라떼', 1, 'ea', 70, 70),                  -- 컵(regular size)

-- 헤이즐넛아메리카노(핫) 970원
(12, 'Coffee', 'Regular', 1, '헤이즐넛아메리카노', 20, 'g', 20, 20 * 20),       -- 원두(에스프레소)
(12, 'Coffee', 'Regular', 5, '헤이즐넛아메리카노', 15, 'ml', 10, 15 * 10),      -- 헤이즐넛 시럽
(12, 'Coffee', 'Regular', 2, '헤이즐넛아메리카노', 100, 'ml', 0.2, 100 * 0.2),  -- 물
(12, 'Coffee', 'Regular', 7, '헤이즐넛아메리카노', 1, 'ea', 70, 70),            -- 컵(regular size)

-- 연유라떼 1470원
(13, 'Coffee', 'Regular', 1, '연유라떼', 20, 'g', 20, 20 * 20),                -- 원두(에스프레소)
(13, 'Coffee', 'Regular', 6, '연유라떼', 150, 'ml', 2, 150 * 2),               -- 얼음
(13, 'Coffee', 'Regular', 4, '연유라떼', 100, 'ml', 3, 100 * 3),               -- 우유
(13, 'Coffee', 'Regular', 5, '연유라떼', 20, 'g', 2, 20 * 2),                  -- 연유
(13, 'Coffee', 'Regular', 7, '연유라떼', 1, 'ea', 70, 70),                     -- 컵(regular size)

-- 에스프레소(레귤러) 470원
(14, 'Coffee', 'Regular', 1, '에스프레소(레귤러)', 20, 'g', 20, 20 * 20),      -- 원두(에스프레소)
(14, 'Coffee', 'Regular', 8, '에스프레소(레귤러)', 1, 'ea', 70, 70),           -- 컵(regular size)



-- 엑스트라-----------------------------------------------------------------------
-- 아메리카노 1210원
(1, 'Coffee', 'Extra', 1, '아메리카노(엑스트라)', 30, 'g', 20, 30 * 20),     -- 원두(에스프레소)
(1, 'Coffee', 'Extra', 2, '아메리카노(엑스트라)', 150, 'ml', 0.2, 150 * 0.2), -- 물
(1, 'Coffee', 'Extra', 6, '아메리카노(엑스트라)', 250, 'ml', 2, 250 * 2),     -- 얼음
(1, 'Coffee', 'Extra', 8, '아메리카노(엑스트라)', 1, 'ea', 80, 80),           -- 컵(extra size)

-- 카라멜 마끼야또 1660원
(2, 'Coffee', 'Extra', 1, '카라멜 마끼야또(엑스트라)', 30, 'g', 20, 30 * 20),    -- 원두(에스프레소)
(2, 'Coffee', 'Extra', 3, '카라멜 마끼야또(엑스트라)', 20, 'ml', 1.5, 20 * 1.5),  -- 카라멜 시럽
(2, 'Coffee', 'Extra', 4, '카라멜 마끼야또(엑스트라)', 150, 'ml', 3, 150 * 3),    -- 우유
(2, 'Coffee', 'Extra', 6, '카라멜 마끼야또(엑스트라)', 250, 'ml', 2, 250 * 2),    -- 얼음
(2, 'Coffee', 'Extra', 8, '카라멜 마끼야또(엑스트라)', 1, 'ea', 80, 80),          -- 컵(extra size)

-- 카페라떼 1630원
(3, 'Coffee', 'Extra', 1, '카페라떼(엑스트라)', 30, 'g', 20, 30 * 20),           -- 원두(에스프레소)
(3, 'Coffee', 'Extra', 4, '카페라떼(엑스트라)', 150, 'ml', 3, 150 * 3),          -- 우유
(3, 'Coffee', 'Extra', 6, '카페라떼(엑스트라)', 250, 'ml', 2, 250 * 2),          -- 얼음
(3, 'Coffee', 'Extra', 8, '카페라떼(엑스트라)', 1, 'ea', 80, 80),                -- 컵(extra size)

-- 바닐라라떼 1830원
(4, 'Coffee', 'Extra', 1, '바닐라라떼(엑스트라)', 30, 'g', 20, 30 * 20),         -- 원두(에스프레소)
(4, 'Coffee', 'Extra', 4, '바닐라라떼(엑스트라)', 150, 'ml', 3, 150 * 3),        -- 우유
(4, 'Coffee', 'Extra', 5, '바닐라라떼(엑스트라)', 20, 'ml', 10, 20 * 10),        -- 바닐라 시럽
(4, 'Coffee', 'Extra', 6, '바닐라라떼(엑스트라)', 250, 'ml', 2, 250 * 2),        -- 얼음
(4, 'Coffee', 'Extra', 8, '바닐라라떼(엑스트라)', 1, 'ea', 80, 80),              -- 컵(extra size)

-- 카푸치노 1630원
(5, 'Coffee', 'Extra', 1, '카푸치노(엑스트라)', 30, 'g', 20, 30 * 20),           -- 원두(에스프레소)
(5, 'Coffee', 'Extra', 4, '카푸치노(엑스트라)', 150, 'ml', 3, 150 * 3),          -- 우유
(5, 'Coffee', 'Extra', 6, '카푸치노(엑스트라)', 250, 'ml', 2, 250 * 2),          -- 얼음
(5, 'Coffee', 'Extra', 8, '카푸치노(엑스트라)', 1, 'ea', 80, 80),                -- 컵(extra size)

-- 헤이즐넛라떼 1830원
(6, 'Coffee', 'Extra', 1, '헤이즐넛라떼(엑스트라)', 30, 'g', 20, 30 * 20),       -- 원두(에스프레소)
(6, 'Coffee', 'Extra', 4, '헤이즐넛라떼(엑스트라)', 150, 'ml', 3, 150 * 3),      -- 우유
(6, 'Coffee', 'Extra', 5, '헤이즐넛라떼(엑스트라)', 20, 'ml', 10, 20 * 10),      -- 헤이즐넛 시럽
(6, 'Coffee', 'Extra', 6, '헤이즐넛라떼(엑스트라)', 250, 'ml', 2, 250 * 2),      -- 얼음
(6, 'Coffee', 'Extra', 8, '헤이즐넛라떼(엑스트라)', 1, 'ea', 80, 80),           -- 컵(extra size)



-- 헤이즐넛 아메리카노 1410원
(7, 'Coffee', 'Extra', 1, '헤이즐넛 아메리카노(엑스트라)', 30, 'g', 20, 30 * 20),       -- 원두(에스프레소)
(7, 'Coffee', 'Extra', 5, '헤이즐넛 아메리카노(엑스트라)', 20, 'ml', 10, 20 * 10),     -- 헤이즐넛 시럽
(7, 'Coffee', 'Extra', 2, '헤이즐넛 아메리카노(엑스트라)', 150, 'ml', 0.2, 150 * 0.2), -- 물
(7, 'Coffee', 'Extra', 6, '헤이즐넛 아메리카노(엑스트라)', 250, 'ml', 2, 250 * 2),     -- 얼음
(7, 'Coffee', 'Extra', 8, '헤이즐넛 아메리카노(엑스트라)', 1, 'ea', 80, 80),           -- 컵(extra size)

-- 바닐라 아메리카노 1410원
(8, 'Coffee', 'Extra', 1, '바닐라 아메리카노(엑스트라)', 30, 'g', 20, 30 * 20),         -- 원두(에스프레소)
(8, 'Coffee', 'Extra', 5, '바닐라 아메리카노(엑스트라)', 20, 'ml', 10, 20 * 10),       -- 바닐라 시럽
(8, 'Coffee', 'Extra', 2, '바닐라 아메리카노(엑스트라)', 150, 'ml', 0.2, 150 * 0.2),   -- 물
(8, 'Coffee', 'Extra', 6, '바닐라 아메리카노(엑스트라)', 250, 'ml', 2, 250 * 2),       -- 얼음
(8, 'Coffee', 'Extra', 8, '바닐라 아메리카노(엑스트라)', 1, 'ea', 80, 80),             -- 컵(extra size)

-- 콜드브루라떼(엑스트라) 1630원
(10, 'Coffee', 'Extra', 1, '콜드브루라떼(엑스트라)', 30, 'g', 20, 30 * 20),             -- 원두(에스프레소)
(10, 'Coffee', 'Extra', 4, '콜드브루라떼(엑스트라)', 150, 'ml', 3, 150 * 3),           -- 우유
(10, 'Coffee', 'Extra', 6, '콜드브루라떼(엑스트라)', 250, 'ml', 2, 250 * 2),           -- 얼음
(10, 'Coffee', 'Extra', 8, '콜드브루라떼(엑스트라)', 1, 'ea', 80, 80),                 -- 컵(extra size)

-- 헤이즐넛라떼(핫, 엑스트라) 1330원
(11, 'Coffee', 'Extra', 1, '헤이즐넛라떼(엑스트라)', 30, 'g', 20, 30 * 20),            -- 원두(에스프레소)
(11, 'Coffee', 'Extra', 5, '헤이즐넛라떼(엑스트라)', 20, 'ml', 10, 20 * 10),           -- 헤이즐넛 시럽
(11, 'Coffee', 'Extra', 4, '헤이즐넛라떼(엑스트라)', 150, 'ml', 3, 150 * 3),           -- 우유
(11, 'Coffee', 'Extra', 8, '헤이즐넛라떼(엑스트라)', 1, 'ea', 80, 80),                 -- 컵(extra size)

-- 헤이즐넛아메리카노(핫, 엑스트라) 910원
(12, 'Coffee', 'Extra', 1, '헤이즐넛아메리카노(엑스트라)', 30, 'g', 20, 30 * 20),       -- 원두(에스프레소)
(12, 'Coffee', 'Extra', 5, '헤이즐넛아메리카노(엑스트라)', 20, 'ml', 10, 20 * 10),     -- 헤이즐넛 시럽
(12, 'Coffee', 'Extra', 2, '헤이즐넛아메리카노(엑스트라)', 150, 'ml', 0.2, 150 * 0.2), -- 물
(12, 'Coffee', 'Extra', 8, '헤이즐넛아메리카노(엑스트라)', 1, 'ea', 80, 80),           -- 컵(extra size)

-- 연유라떼(엑스트라) 1690원
(13, 'Coffee', 'Extra', 1, '연유라떼(엑스트라)', 30, 'g', 20, 30 * 20),               -- 원두(에스프레소)
(13, 'Coffee', 'Extra', 6, '연유라떼(엑스트라)', 250, 'ml', 2, 250 * 2),              -- 얼음
(13, 'Coffee', 'Extra', 4, '연유라떼(엑스트라)', 150, 'ml', 3, 150 * 3),              -- 우유
(13, 'Coffee', 'Extra', 5, '연유라떼(엑스트라)', 30, 'g', 2, 30 * 2),                 -- 연유
(13, 'Coffee', 'Extra', 8, '연유라떼(엑스트라)', 1, 'ea', 80, 80);                   -- 컵(extra size)



-- 20. 사용자 (Users) 테이블 더미 데이터
INSERT INTO ERP.Users (Name, PhoneNumber, Email, Username, Password)
VALUES
('박민수', '010-5555-6666', 'minsoo@example.com', 'minsoo', 'pass9101');

-- 21. 커피 재료 테이블 더미 데이터
INSERT INTO ERP.coffee_materials (CoffeeID, MaterialID, RawMaterialQuantity)
VALUES
(1, 1, 50),  -- 아메리카노에 자재 1번 사용, 50 단위
(2, 2, 30),  -- 카라멜 마끼야또에 자재 2번 사용, 30 단위
(3, 3, 20);  -- 카페라떼에 자재 3번 사용, 20 단위

-- 1. Product 테이블 조회 (완료)
SELECT * FROM ERP.Product;

-- 2. Coffee 테이블 조회 (완료)
SELECT * FROM ERP.Coffee;

-- 3. Suppliers 테이블 조회 (완료)
SELECT * FROM ERP.Suppliers;

-- 4. MaterialsInventory 테이블 조회 (완료)
SELECT * FROM ERP.MaterialsInventory;

-- 5. RawMaterialRestockHistory 테이블 조회 (완료)
SELECT * FROM ERP.RawMaterialRestockHistory;

-- 6. ProductionConsumption 테이블 조회 (완료)
SELECT * FROM ERP.ProductionConsumption;

-- 7. FactoryInventory 테이블 조회 (완료)
SELECT * FROM ERP.FactoryInventory;

-- 8. DisposedRecords 테이블 조회 (완료)
SELECT * FROM ERP.DisposedRecords;

-- 9. SalesRecords 테이블 조회 (완료)
SELECT * FROM ERP.SalesRecords;

-- 10. WorkOrders 테이블 조회 (완료)
SELECT * FROM ERP.WorkOrders;

-- 11. ProductionPlanning 테이블 조회 (완료)
SELECT * FROM ERP.ProductionPlanning;

-- 12. ProductionMonitoring 테이블 조회 (완료)
SELECT * FROM ERP.ProductionMonitoring;

-- 13. ProductionEntry 테이블 조회 (완료)
SELECT * FROM ERP.ProductionEntry;

-- 14. QualityControl 테이블 조회 (완료)
SELECT * FROM ERP.QualityControl;

-- 15. StoreInventory 테이블 조회
SELECT * FROM ERP.StoreInventory;

-- 16. MBOM 테이블 조회 (완료)
SELECT * FROM ERP.MBOM;

-- 17. Users 테이블 조회 (완료)
SELECT * FROM ERP.Users;

-- 18. Untitled 테이블 조회 (커피 재료)
SELECT * FROM ERP.coffee_materials;


-- --------------------------------------------------------------------------------------------------------------------------------------------------- --

-- 간단
SELECT 
    pp.PlanID AS planId, 
    pp.OrderID AS orderId, 
    pp.ProductID AS productId, 
    pp.StartDate AS startDate, 
    pp.EndDate AS endDate, 
    wo.Quantity AS orderQuantity, 
    p.ProductName AS productName 
FROM 
    ERP.ProductionPlanning pp 
JOIN 
    ERP.WorkOrders wo ON pp.OrderID = wo.OrderID 
JOIN 
    ERP.Product p ON pp.ProductID = p.ProductID 
ORDER BY 
    pp.PlanID;



-- 상세

SELECT 
    pp.PlanID AS planId, 
    wo.Quantity AS orderQuantity,            -- 제품 수량
   
    mb.MaterialID AS materialId, 
    mb.Quantity AS materialQuantity, 
    mb.Unit AS unit, 
    mb.UnitPrice AS materialUnitPrice, 
    mb.TotalCost AS materialTotalCost, 
    (wo.Quantity * mb.Quantity) AS TotalMaterialQuantity, 
    (wo.Quantity * mb.Quantity * mb.UnitPrice) AS TotalCostBasedOnOrder 
FROM 
    ERP.ProductionPlanning pp 
JOIN 
    ERP.WorkOrders wo ON pp.OrderID = wo.OrderID 
JOIN 
    ERP.Product p ON pp.ProductID = p.ProductID 
JOIN 
    ERP.MBOM mb ON pp.ProductID = mb.ItemID 
WHERE 
    pp.PlanID = 1; -- 특정 PlanID를 입력



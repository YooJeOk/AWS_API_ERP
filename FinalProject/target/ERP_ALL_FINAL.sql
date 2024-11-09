drop SCHEMA ERP;
CREATE SCHEMA ERP;
USE ERP;

-- 1. 제품 (Product)
CREATE TABLE ERP.Product (
    ProductID INT NOT NULL AUTO_INCREMENT, -- 제품ID
    ProductName VARCHAR(100) NULL, -- 제품명
    ProductCategory VARCHAR(50) NULL, -- 제품 카테고리
    UnitPrice float NULL, -- 단가
    SalePrice INT NULL, -- 판매가
    ProductionDate DATETIME NULL, -- 생산 날짜
    ProductImage VARCHAR(200) NULL, -- 제품 이미지
    OnKiosk varchar(30) check (OnKiosk in ('Y','N')), -- 제품이 키오스크에 있는지 확인용
    Recommend varchar(30) check (Recommend in ('Y','N')), -- 제품 추천여부(키오스크용)
    DetailDescription varchar(300) NULL, -- 제품 설명(키오스크용)
    MinimumStock INT NULL, -- 최소재고 
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
    UnitPrice float NULL, -- 단가
    LastUpdated DATETIME NULL, -- 최종 업데이트
    MinimumStock INT NULL, -- 최소 재고
    PRIMARY KEY (MaterialID),
    FOREIGN KEY (SupplierID) REFERENCES ERP.Suppliers(SupplierID)
);

-- 4. 원자재 입고 이력 (RawMaterialRestockHistory)
CREATE TABLE ERP.RawMaterialRestockHistory (
    RestockID INT NOT NULL AUTO_INCREMENT, -- 재입고ID
    MaterialID INT NOT NULL, -- 자재ID
    SupplierID INT NOT NULL, -- 공급업체ID
    RestockQuantity INT NULL, -- 재입고 수량
    UnitPrice float NULL, -- 단가
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
    FactoryInventoryID INT NOT NULL AUTO_INCREMENT,
    ProductID INT,
    MaterialID INT,
    QuantityInFactory INT NOT NULL,
    FactoryDate DATETIME NOT NULL,
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
   Quantity INT NOT NULL,             -- 수량
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
    OrderID INT NOT NULL AUTO_INCREMENT,         -- 작업 지시 ID
    ProductID INT NOT NULL,                      -- 제품 ID
    ProductName VARCHAR(100) NOT NULL,           -- 제품명
    Quantity INT NOT NULL,                       -- 수량
    StartDate DATETIME NULL,                     -- 시작 날짜
    EndDate DATETIME NOT NULL,                   -- 종료 날짜
    Priority VARCHAR(50) NOT NULL,               -- 우선순위
    etc VARCHAR(100) NULL,                       -- 기타
    PRIMARY KEY (OrderID),
    UNIQUE (OrderID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID),  -- 제품 외래 키 연결
    INDEX idx_quantity (Quantity),               -- 수량 인덱스
    INDEX idx_product_name (ProductName)         -- 제품명 인덱스
);




-- 14. 생산 계획 (ProductionPlanning)
CREATE TABLE ERP.ProductionPlanning (
    PlanID INT NOT NULL AUTO_INCREMENT, -- 계획ID
    OrderID INT NOT NULL, -- 작업 지시ID
    ProductID INT NOT NULL, -- 제품ID
    ProductName   VARCHAR(100)  NOT NULL,      -- 상품명
   Quantity       INT           NOT NULL,      -- 수량
    StartDate DATETIME NOT NULL, -- 시작 시간
    EndDate DATETIME NOT NULL, -- 시작 시간
    etc VARCHAR(100) NULL, -- 기타
    PRIMARY KEY (PlanID),
    UNIQUE (PlanID),
    FOREIGN KEY (OrderID) REFERENCES ERP.WorkOrders(OrderID)
    
);

CREATE TABLE ERP.OrderProductMapping (
    MappingID INT NOT NULL AUTO_INCREMENT,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    PRIMARY KEY (MappingID),
    FOREIGN KEY (OrderID) REFERENCES ERP.WorkOrders(OrderID) ON DELETE RESTRICT,
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID) ON DELETE RESTRICT,
    UNIQUE (OrderID, ProductID) -- OrderID와 ProductID 쌍의 고유성 유지
);


ALTER TABLE ERP.OrderProductMapping
ADD CONSTRAINT unique_order_product UNIQUE (OrderID, ProductID);


-- 15. 생산 모니터링 (ProductionMonitoring)
CREATE TABLE ERP.ProductionMonitoring (
    MonitorID INT NOT NULL AUTO_INCREMENT, -- 모니터링ID
    OrderID INT NOT NULL, -- 작업 지시ID
    Temperature FLOAT  NOT NULL, -- 온도
    Humidity FLOAT NOT NULL, -- 습도
    ProductionRate FLOAT NULL, -- 생산률
    OperationTime FLOAT NULL, -- 작업 시간 (분 단위로 기록)
    StartTime DATETIME NULL, -- 작업 시작 시간
    PRIMARY KEY (MonitorID),
    FOREIGN KEY (OrderID) REFERENCES ERP.WorkOrders(OrderID)
);


-- 16. ProductionProcessStatus 테이블 생성 -- 
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

-- 17 품질 관리 테이블 (QualityControl)
CREATE TABLE QualityControl (
    QCID              INT           NOT NULL  AUTO_INCREMENT, -- 품질관리ID
    OrderID           INT           NOT NULL,  -- 주문ID
    Quantity          INT           NOT NULL,  -- 수량
    ProductID         INT           NOT NULL COMMENT 'PK', -- 상품ID
    ProductName       VARCHAR(100)  NOT NULL,  -- 상품명
    TestResult        VARCHAR(50)   NOT NULL,  -- 검사결과
    TestDate          DATETIME      NOT NULL,  -- 검사날짜
     etc               VARCHAR(100)  NULL,                      -- 기타
    PRIMARY KEY (QCID),                       -- QCID를 단일 기본 키로 설정
    FOREIGN KEY (OrderID) REFERENCES WorkOrders (OrderID),
    FOREIGN KEY (Quantity) REFERENCES WorkOrders (Quantity),
    FOREIGN KEY (ProductID) REFERENCES WorkOrders (ProductID),
    FOREIGN KEY (ProductName) REFERENCES WorkOrders (ProductName)
);

-- 18. 불량 관리 테이블 (DefectManagement)
CREATE TABLE DefectManagement (
    DefectID          INT           NOT NULL  AUTO_INCREMENT,  -- 불량 ID (자동 증가)
    QCID              INT           NOT NULL,                  -- 품질 관리 ID
    OrderID           INT           NOT NULL,                  -- 주문 ID
    Quantity          INT           NOT NULL,                  -- 수량
    ProductID         INT           NOT NULL,                  -- 상품 ID
    ProductName       VARCHAR(100)  NOT NULL,                  -- 상품명
    DefectType        VARCHAR(50)   NOT NULL,                  -- 불량 유형
    DefectQuantity    INT           NOT NULL,                  -- 불량 수량
    CauseDescription  VARCHAR(255)  NULL,                      -- 불량 원인 설명
    Status            ENUM('미처리', '완료') DEFAULT '미처리', -- 불량 처리 상태
    Defectrate        INT           DEFAULT 0 NULL,            -- 불량률
    etc               VARCHAR(100)  NULL,                      -- 기타
    PRIMARY KEY (DefectID),
    FOREIGN KEY (QCID) REFERENCES QualityControl (QCID)       -- QCID 단일 외래 키 참조
);

-- 19 생산 입고 테이블 (ProductionEntry)
CREATE TABLE ProductionEntry (
    EntryID       INT           NOT NULL AUTO_INCREMENT,  -- 입고ID (기본 키)
    QCID          INT           NOT NULL,                 -- 품질관리ID
    OrderID       INT           NOT NULL,                 -- 주문ID
    Quantity      INT           NOT NULL,                 -- 수량
    ProductID     INT           NOT NULL,                 -- 상품ID
    ProductName   VARCHAR(100)  NOT NULL,                 -- 상품명
    EntryDate     DATE          NOT NULL,                 -- 입고날짜
    etc           VARCHAR(100)  NULL,                     -- 기타
    PRIMARY KEY (`EntryID`),
    FOREIGN KEY (`QCID`) REFERENCES `QualityControl` (`QCID`),
    FOREIGN KEY (`OrderID`) REFERENCES `WorkOrders` (`OrderID`)
);



-- 20. 매장 재고 (StoreInventory)
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

-- 21 MBOM 
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
-- 22 MBOM 보조테이블
CREATE TABLE ProductMaterials (
    ProductID INT NOT NULL,
    MaterialID INT NOT NULL,
    Quantity FLOAT NOT NULL,
    PRIMARY KEY (ProductID, MaterialID),
    FOREIGN KEY (MaterialID) REFERENCES MaterialsInventory(MaterialID)
);


-- 23. 사용자 (Users)
CREATE TABLE ERP.Users (

    UserID INT NOT NULL AUTO_INCREMENT,-- 사용자ID

    Name VARCHAR(30) NULL, -- 이름
    PhoneNumber VARCHAR(30) NULL, -- 전화번호
    Email VARCHAR(30) NULL, -- 이메일
    Username VARCHAR(30) NULL, -- 사용자 이름
    Password VARCHAR(30) NULL, -- 비밀번호
    PRIMARY KEY (UserID)
);

-- 24. ERP.coffee_materials (커피 재료)
CREATE TABLE ERP.coffee_materials (
    CoffeeMaterialID INT NOT NULL AUTO_INCREMENT,-- 커피 재료ID
    CoffeeID INT NOT NULL, -- 커피ID
    MaterialID INT NOT NULL, -- 자재ID
    RawMaterialQuantity INT NULL, -- 원재료 수량
    PRIMARY KEY (CoffeeMaterialID, CoffeeID, MaterialID),
    FOREIGN KEY (CoffeeID) REFERENCES ERP.Coffee(CoffeeID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);
-- 25. 유저 스탬프 데이터
CREATE TABLE UserStamp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    stamp INT DEFAULT 0,
    coupon INT DEFAULT 0
);
-- 26. 주문 내역
CREATE TABLE OrderHistory (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    Category VARCHAR(50) NOT NULL,
	ProductID INT, -- 제품ID
    MaterialID INT, -- 자재ID
    ProductName VARCHAR(100) NOT NULL,
    Quantity INT NOT NULL,
    Unit VARCHAR(20) NOT NULL,
    OrderType VARCHAR(50) DEFAULT '수동입력',
    OrderStatus VARCHAR(50) DEFAULT '미처리',
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CompletedDate DATETIME,
	FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
    
);
-- 27. 캘린더
CREATE TABLE calendar(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL
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

-- Product 테이블에 데이터 삽입
INSERT INTO ERP.Product (ProductName, ProductCategory, UnitPrice, SalePrice, ProductionDate, ProductImage, OnKiosk, Recommend, DetailDescription, MinimumStock)
VALUES 
('갈릭꽈베기', 'bread', 2000, 3500, '2024-01-01', '/images/bread/갈릭꽈배기.jpg', 'Y', 'Y', '결결이 바삭한 식감의 패스트리에 알싸한 남해 마늘의 진한 맛과 향이 더해진 간식형 제품', 80),
('단팥도넛', 'bread', 2500, 3700, '2024-01-01', '/images/bread/단팥도넛.jpg', 'Y', 'N', '달콤한 팥 앙금이 가득한 부드러운 도넛으로 전통과 현대의 맛이 조화로운 디저트', 4),
('고구마케이크빵', 'bread', 1800, 3000, '2024-01-01', '/images/bread/고구마케이크빵.jpg', 'Y', 'Y', '부드러운 빵 속에 달콤한 고구마 필링이 가득한 케이크 스타일의 빵', 5),
('꽈베기', 'bread', 2000, 2500, '2024-01-01', '/images/bread/꽈베기.jpg', 'Y', 'N', '쫄깃한 식감과 달콤한 맛이 일품인 전통적인 꽈배기', 6),
('라우겐', 'bread', 2400, 4000, '2024-01-01', '/images/bread/라우겐.jpg', 'Y', 'N', '독일식 프레첼 빵으로, 짭짤하고 쫄깃한 식감이 특징인 빵', 3),
('베이글빵', 'bread', 2000, 3800, '2024-01-01', '/images/bread/베이글빵.jpg', 'Y', 'N', '쫄깃한 식감과 부드러운 맛이 일품인 클래식한 베이글', 4),
('생크림소보로', 'bread', 2000, 3800, '2024-01-01', '/images/bread/생크림소보로.jpg', 'Y', 'N', '부드러운 생크림과 바삭한 소보로의 조화가 매력적인 달콤한 빵', 4),
('꿀버터바게트', 'bread', 2000, 3800, '2024-01-01', '/images/bread/꿀버터바게트.jpg', 'Y', 'N', '바삭한 바게트에 꿀과 버터가 스며들어 고소하고 달콤한 맛이 돋보이는 빵', 3),
('애플파이', 'bread', 3000, 4500, '2024-01-01', '/images/bread/애플파이.jpg', 'Y', 'N', '바삭한 페이스트리 속에 달콤하고 상큼한 사과 필링이 가득한 클래식한 디저트', 2),
('우유도넛', 'bread', 2200, 3300, '2024-01-01', '/images/bread/우유도넛.jpg', 'Y', 'N', '부드러운 우유 크림이 가득 들어간 폭신폭신한 도넛으로 은은한 우유 향이 일품', 3),
('찹쌀브레드', 'bread', 2800, 4200, '2024-01-01', '/images/bread/찹쌀브레드.jpg', 'Y', 'N', '쫄깃한 찹쌀의 식감과 부드러운 빵의 조화가 일품인 건강한 맛의 브레드', 4),
('카라멜 러스크', 'bread', 3500, 5000, '2024-01-01', '/images/bread/카라멜러스크.jpg', 'N', 'N', '바삭하게 구운 빵에 달콤한 카라멜을 입힌 고급스러운 간식', 2),
('캐찰빵', 'bread', 2600, 3800, '2024-01-01', '/images/bread/캐찰빵.jpg', 'N', 'N', '치즈의 고소함과 달콤한 빵의 조화가 일품인 멕시코 스타일의 특색있는 빵', 3);

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

-- MaterialsInventory 테이블에 데이터 삽입
INSERT INTO ERP.MaterialsInventory (SupplierID, MaterialName, Category, Unit, UnitPrice, LastUpdated, MinimumStock)
VALUES 
-- 빵
(1, '계란', '식자재', 'g', 4, '2024-04-05 10:30:00', 1000),
(1, '고구마필링', '식자재', 'g', 8, '2024-04-05 10:35:00', 1500),
(1, '마늘', '식자재', 'g', 10, '2024-04-05 10:45:00', 800),
(1, '물', '식자재', 'ml', 0.2, '2024-04-05 10:50:00', 400),
(1, '밀가루', '식자재', 'g', 1.5, '2024-04-05 10:55:00', 2500),
(1, '베이킹소다', '식자재', 'g', 2, '2024-04-05 11:10:00', 500),
(1, '베이킹파우더', '식자재', 'g', 2, '2024-04-05 11:15:00', 500),
(1, '소금', '식자재', 'g', 1, '2024-04-05 11:30:00', 300),
(1, '시나몬 가루', '식자재', 'g', 6, '2024-04-05 11:40:00', 200),
(1, '올리브오일', '식자재', 'ml', 10, '2024-04-05 11:50:00', 1000),
(1, '이스트', '식자재', 'g', 3, '2024-04-05 12:00:00', 400),
(1, '파슬리', '식자재', 'g', 4, '2024-04-05 12:05:00', 150),
(1, '꿀', '식자재', 'g', 10, '2024-04-05 10:40:00', 800),
(1, '바닐라 추출물', '식자재', 'ml', 100, '2024-04-05 11:00:00', 300),
(1, '버터', '식자재', 'g', 12, '2024-04-05 11:05:00', 1200),
(1, '생크림', '식자재', 'g', 10, '2024-04-05 11:20:00', 1000),
(1, '설탕', '식자재', 'g', 0.5, '2024-04-05 11:25:00', 1500),
(1, '팥앙금', '식자재', 'g', 7, '2024-04-05 12:10:00', 1000),
(1, '우유', '식자재', 'ml', 3, '2024-04-05 12:10:00', 500),

-- 커피
(2, '원두(에스프레소)', '식자재', 'g', 20, '2024-04-06 09:00:00', 5500),
(2, '카라멜시럽', '식자재', 'ml', 15, '2024-04-06 09:10:00', 200),
(2, '초콜릿 시럽', '식자재', 'ml', 6, '2024-04-06 09:20:00', 150),
(2, '콜드브루 원액', '식자재', 'ml', 6, '2024-04-06 09:30:00', 300),
(2, '연유', '식자재', 'g', 2, '2024-04-06 09:40:00', 100),
(2, '얼음', '식자재', 'ml', 15, '2024-04-06 09:40:00', 1000),
(2, '헤이즐넛 시럽', '식자재', 'ml', 6, '2024-04-06 09:10:00', 180),
(2, '바닐라 시럽', '식자재', 'ml', 6, '2024-04-06 09:20:00', 180),
(2, '메이플 시럽', '식자재', 'ml', 6, '2024-04-06 09:20:00', 150),
(2, '아이스크림', '식자재', 'ml', 20, '2024-04-06 09:20:00', 200),

-- 부자재
(3, '포장지', '포장재', '개', 20, '2024-04-06 11:00:00', 10),
(3, '컵(regular size)', '부자재', '개', 70, '2024-04-06 11:10:00', 10),
(3, '컵(extra size)', '부자재', '개', 80, '2024-04-06 11:20:00', 23),
(3, '빨대', '부자재', '개', 3, '2024-04-06 11:30:00', 25),
(3, '캐리어', '부자재', '개', 2, '2024-04-06 11:40:00', 30);

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
INSERT INTO ERP.FactoryInventory (ProductID, MaterialID, QuantityInFactory, FactoryDate)
VALUES
-- 빵 아이템 재고
(1, NULL, 200, '2024-10-29 00:00:00'),  -- 갈릭꽈베기
(2, NULL, 180, '2024-10-29 00:00:00'),  -- 단팥도넛
(3, NULL, 190, '2024-10-29 00:00:00'),  -- 고구마케이크빵
(4, NULL, 220, '2024-10-29 00:00:00'),  -- 꽈베기
(5, NULL, 150, '2024-10-29 00:00:00'),  -- 라우겐
(6, NULL, 170, '2024-10-29 00:00:00'),  -- 베이글빵
(7, NULL, 180, '2024-10-29 00:00:00'),  -- 생크림소보로
(8, NULL, 130, '2024-10-29 00:00:00'),  -- 꿀버터바게트
(9, NULL, 120, '2024-10-29 00:00:00'),  -- 애플파이
(10, NULL, 160, '2024-10-29 00:00:00'), -- 우유도넛
(11, NULL, 170, '2024-10-29 00:00:00'), -- 찹쌀브레드
(12, NULL, 100, '2024-10-29 00:00:00'), -- 카라멜 러스크
(13, NULL, 140, '2024-10-29 00:00:00'), -- 캐찰빵

-- 모든 재료 재고
(NULL, 1, 10000, '2024-10-29 00:00:00'), -- 계란
(NULL, 2, 15000, '2024-10-29 00:00:00'), -- 고구마필링
(NULL, 3, 8000, '2024-10-29 00:00:00'),  -- 마늘
(NULL, 4, 20000, '2024-10-29 00:00:00'), -- 물
(NULL, 5, 25000, '2024-10-29 00:00:00'), -- 밀가루
(NULL, 6, 5000, '2024-10-29 00:00:00'),  -- 베이킹소다
(NULL, 7, 5000, '2024-10-29 00:00:00'),  -- 베이킹파우더
(NULL, 8, 3000, '2024-10-29 00:00:00'),  -- 소금
(NULL, 9, 2000, '2024-10-29 00:00:00'),  -- 시나몬 가루
(NULL, 10, 10000, '2024-10-29 00:00:00'), -- 올리브오일
(NULL, 11, 4000, '2024-10-29 00:00:00'), -- 이스트
(NULL, 12, 1500, '2024-10-29 00:00:00'), -- 파슬리
(NULL, 13, 8000, '2024-10-29 00:00:00'), -- 꿀
(NULL, 14, 3000, '2024-10-29 00:00:00'), -- 바닐라 추출물
(NULL, 15, 12000, '2024-10-29 00:00:00'), -- 버터
(NULL, 16, 10000, '2024-10-29 00:00:00'), -- 생크림
(NULL, 17, 15000, '2024-10-29 00:00:00'), -- 설탕
(NULL, 18, 10000, '2024-10-29 00:00:00'), -- 팥앙금
(NULL, 19, 20000, '2024-10-29 00:00:00'), -- 우유
(NULL, 20, 15000, '2024-10-29 00:00:00'), -- 원두(에스프레소)
(NULL, 21, 8000, '2024-10-29 00:00:00'),  -- 카라멜시럽
(NULL, 22, 6000, '2024-10-29 00:00:00'),  -- 초콜릿 시럽
(NULL, 23, 10000, '2024-10-29 00:00:00'), -- 콜드브루 원액
(NULL, 24, 5000, '2024-10-29 00:00:00'),  -- 연유
(NULL, 25, 30000, '2024-10-29 00:00:00'), -- 얼음
(NULL, 26, 7000, '2024-10-29 00:00:00'),  -- 헤이즐넛 시럽
(NULL, 27, 7000, '2024-10-29 00:00:00'),  -- 바닐라 시럽
(NULL, 28, 6000, '2024-10-29 00:00:00'),  -- 메이플 시럽
(NULL, 29, 8000, '2024-10-29 00:00:00'),  -- 아이스크림
(NULL, 30, 5000, '2024-10-29 00:00:00'),  -- 포장지
(NULL, 31, 10000, '2024-10-29 00:00:00'), -- 컵(regular size)
(NULL, 32, 10000, '2024-10-29 00:00:00'), -- 컵(extra size)
(NULL, 33, 15000, '2024-10-29 00:00:00'); -- 빨대


-- 7. 폐기 기록 (DisposedRecords) 테이블 더미 데이터
INSERT INTO ERP.DisposedRecords (ProductID, QuantityDisposed, DisposalDate, DisposalReason)
VALUES
(1, 100, '2024-04-17 10:00:00', '불량품 폐기'),
(2, 200, '2024-04-18 11:00:00', '유통기한 초과'),
(3, 150, '2024-04-19 12:00:00', '고객 반품');


-- 9. 커피 추가옵션 insert
INSERT INTO ERP.CoffeeOptions (MaterialID, Name, Price,Quantity)
SELECT MaterialID, '에스프레소 샷', 500 , 5 FROM ERP.MaterialsInventory WHERE MaterialName = '원두(에스프레소)'
UNION ALL
SELECT MaterialID, '헤이즐넛 시럽', 300,5 FROM ERP.MaterialsInventory WHERE MaterialName = '헤이즐넛 시럽'
UNION ALL
SELECT MaterialID, '바닐라 시럽', 300,5 FROM ERP.MaterialsInventory WHERE MaterialName = '바닐라 시럽'
UNION ALL
SELECT MaterialID, '메이플 시럽', 300,5 FROM ERP.MaterialsInventory WHERE MaterialName = '메이플 시럽'
UNION ALL
SELECT MaterialID, '아이스크림', 1000, 100 FROM ERP.MaterialsInventory WHERE MaterialName = '아이스크림'
UNION ALL
SELECT MaterialID, '우유', 500 ,10 FROM ERP.MaterialsInventory WHERE MaterialName = '우유';

-- 13. 작업 주문 (WorkOrders)
INSERT INTO ERP.WorkOrders (ProductID, ProductName, Quantity, StartDate, EndDate, Priority, etc)
VALUES
    (1, '갈릭꽈베기', 30, '2024-11-01 08:00:00', '2024-11-01 12:40:00', 'High', '긴급 작업 요청'),
    (2, '단팥도넛', 40, '2024-11-01 09:00:00', '2024-11-01 13:40:00', 'Medium', '일반 작업 요청'),
    (3, '고구마케이크빵', 50, '2024-11-01 10:00:00', '2024-11-01 14:40:00', 'High', '정시 납기 요구'),
    (4, '꽈베기', 25, '2024-11-01 11:00:00', '2024-11-01 15:40:00', 'Low', '일반 작업 요청'),
    (5, '라우겐', 30, '2024-11-01 13:00:00', '2024-11-01 17:40:00', 'Medium', '정시 납기 요구'),
    (6, '베이글빵', 45, '2024-11-01 14:00:00', '2024-11-01 18:40:00', 'High', '긴급 작업 요청'),
    (7, '생크림소보로', 20, '2024-11-01 15:00:00', '2024-11-01 19:40:00', 'Medium', '일반 작업 요청'),
    (8, '꿀버터바게트', 40, '2024-11-01 16:00:00', '2024-11-01 20:40:00', 'Low', '특별 공정 필요'),

    (9, '애플파이', 30, '2024-11-02 08:00:00', '2024-11-02 12:40:00', 'High', '긴급 작업 요청'),
    (10, '우유도넛', 25, '2024-11-02 09:00:00', '2024-11-02 13:40:00', 'Medium', '정시 납기 요구'),
    (11, '찹쌀브레드', 50, '2024-11-02 10:00:00', '2024-11-02 14:40:00', 'High', '정시 납기 요구'),
    (12, '카라멜 러스크', 20, '2024-11-02 11:00:00', '2024-11-02 15:40:00', 'Low', '일반 작업 요청'),
    (1, '갈릭꽈베기', 40, '2024-11-02 13:00:00', '2024-11-02 17:40:00', 'Medium', '긴급 작업 요청'),
    (2, '단팥도넛', 30, '2024-11-02 14:00:00', '2024-11-02 18:40:00', 'High', '정시 납기 요구'),
    (3, '고구마케이크빵', 20, '2024-11-02 15:00:00', '2024-11-02 19:40:00', 'Medium', '일반 작업 요청'),
    (4, '꽈베기', 50, '2024-11-02 16:00:00', '2024-11-02 20:40:00', 'Low', '특별 공정 필요'),

    (5, '라우겐', 30, '2024-11-03 08:00:00', '2024-11-03 12:40:00', 'High', '정시 납기 요구'),
    (6, '베이글빵', 25, '2024-11-03 09:00:00', '2024-11-03 13:40:00', 'Medium', '일반 작업 요청'),
    (7, '생크림소보로', 45, '2024-11-03 10:00:00', '2024-11-03 14:40:00', 'High', '정시 납기 요구'),
    (8, '꿀버터바게트', 20, '2024-11-03 11:00:00', '2024-11-03 15:40:00', 'Low', '특별 공정 필요'),
    (9, '애플파이', 40, '2024-11-03 13:00:00', '2024-11-03 17:40:00', 'Medium', '긴급 작업 요청'),
    (10, '우유도넛', 30, '2024-11-03 14:00:00', '2024-11-03 18:40:00', 'High', '정시 납기 요구'),
    (11, '찹쌀브레드', 25, '2024-11-03 15:00:00', '2024-11-03 19:40:00', 'Medium', '일반 작업 요청'),
    (12, '카라멜 러스크', 50, '2024-11-03 16:00:00', '2024-11-03 20:40:00', 'Low', '특별 공정 필요'),

    (1, '갈릭꽈베기', 35, '2024-11-04 08:00:00', '2024-11-04 12:40:00', 'High', '긴급 작업 요청'),
    (2, '단팥도넛', 45, '2024-11-04 09:00:00', '2024-11-04 13:40:00', 'Medium', '일반 작업 요청'),
    (3, '고구마케이크빵', 20, '2024-11-04 10:00:00', '2024-11-04 14:40:00', 'High', '정시 납기 요구'),
    (4, '꽈베기', 30, '2024-11-04 11:00:00', '2024-11-04 15:40:00', 'Low', '일반 작업 요청'),
    (5, '라우겐', 40, '2024-11-04 13:00:00', '2024-11-04 17:40:00', 'Medium', '정시 납기 요구'),
    (6, '베이글빵', 25, '2024-11-04 14:00:00', '2024-11-04 18:40:00', 'High', '긴급 작업 요청'),
    (7, '생크림소보로', 50, '2024-11-04 15:00:00', '2024-11-04 19:40:00', 'Medium', '일반 작업 요청'),
    (8, '꿀버터바게트', 20, '2024-11-04 16:00:00', '2024-11-04 20:40:00', 'Low', '특별 공정 필요'),

    (9, '애플파이', 45, '2024-11-05 08:00:00', '2024-11-05 12:40:00', 'High', '긴급 작업 요청'),
    (10, '우유도넛', 30, '2024-11-05 09:00:00', '2024-11-05 13:40:00', 'Medium', '정시 납기 요구'),
    (11, '찹쌀브레드', 40, '2024-11-05 10:00:00', '2024-11-05 14:40:00', 'High', '정시 납기 요구'),
    (12, '카라멜 러스크', 20, '2024-11-05 11:00:00', '2024-11-05 15:40:00', 'Low', '일반 작업 요청'),
    (1, '갈릭꽈베기', 50, '2024-11-05 13:00:00', '2024-11-05 17:40:00', 'Medium', '긴급 작업 요청'),
    (2, '단팥도넛', 25, '2024-11-05 14:00:00', '2024-11-05 18:40:00', 'High', '정시 납기 요구'),
    (3, '고구마케이크빵', 30, '2024-11-05 15:00:00', '2024-11-05 19:40:00', 'Medium', '일반 작업 요청'),
    (4, '꽈베기', 20, '2024-11-05 16:00:00', '2024-11-05 20:40:00', 'Low', '특별 공정 필요'),

    (5, '라우겐', 40, '2024-11-06 08:00:00', '2024-11-06 12:40:00', 'High', '정시 납기 요구'),
    (6, '베이글빵', 25, '2024-11-06 09:00:00', '2024-11-06 13:40:00', 'Medium', '일반 작업 요청'),
    (7, '생크림소보로', 35, '2024-11-06 10:00:00', '2024-11-06 14:40:00', 'High', '정시 납기 요구'),
    (8, '꿀버터바게트', 20, '2024-11-06 11:00:00', '2024-11-06 15:40:00', 'Low', '특별 공정 필요'),
    (9, '애플파이', 50, '2024-11-06 13:00:00', '2024-11-06 17:40:00', 'Medium', '긴급 작업 요청'),
    (10, '우유도넛', 30, '2024-11-06 14:00:00', '2024-11-06 18:40:00', 'High', '정시 납기 요구'),
    (11, '찹쌀브레드', 20, '2024-11-06 15:00:00', '2024-11-06 19:40:00', 'Medium', '일반 작업 요청'),
    (12, '카라멜 러스크', 40, '2024-11-06 16:00:00', '2024-11-06 20:40:00', 'Low', '특별 공정 필요'),

	(1, '갈릭꽈베기', 30, '2024-11-07 08:00:00', '2024-11-07 12:40:00', 'High', '긴급 작업 요청'),
    (2, '단팥도넛', 45, '2024-11-07 09:00:00', '2024-11-07 13:40:00', 'Medium', '일반 작업 요청'),
    (3, '고구마케이크빵', 20, '2024-11-07 10:00:00', '2024-11-07 14:40:00', 'High', '정시 납기 요구'),
    (4, '꽈베기', 50, '2024-11-07 11:00:00', '2024-11-07 15:40:00', 'Low', '일반 작업 요청'),
    (5, '라우겐', 35, '2024-11-07 13:00:00', '2024-11-07 17:40:00', 'Medium', '정시 납기 요구'),
    (6, '베이글빵', 40, '2024-11-07 14:00:00', '2024-11-07 18:40:00', 'High', '긴급 작업 요청'),
    (7, '생크림소보로', 25, '2024-11-07 15:00:00', '2024-11-07 19:40:00', 'Medium', '일반 작업 요청'),
    (8, '꿀버터바게트', 30, '2024-11-07 16:00:00', '2024-11-07 20:40:00', 'Low', '특별 공정 필요'),

    (9, '애플파이', 45, '2024-11-08 08:00:00', '2024-11-08 12:40:00', 'High', '긴급 작업 요청'),
    (10, '우유도넛', 30, '2024-11-08 09:00:00', '2024-11-08 13:40:00', 'Medium', '정시 납기 요구'),
    (11, '찹쌀브레드', 40, '2024-11-08 10:00:00', '2024-11-08 14:40:00', 'High', '정시 납기 요구'),
    (12, '카라멜 러스크', 20, '2024-11-08 11:00:00', '2024-11-08 15:40:00', 'Low', '일반 작업 요청'),
    (1, '갈릭꽈베기', 50, '2024-11-08 13:00:00', '2024-11-08 17:40:00', 'Medium', '긴급 작업 요청'),
    (2, '단팥도넛', 25, '2024-11-08 14:00:00', '2024-11-08 18:40:00', 'High', '정시 납기 요구'),
    (3, '고구마케이크빵', 30, '2024-11-08 15:00:00', '2024-11-08 19:40:00', 'Medium', '일반 작업 요청'),
    (4, '꽈베기', 20, '2024-11-08 16:00:00', '2024-11-08 20:40:00', 'Low', '특별 공정 필요'),

    (5, '라우겐', 40, '2024-11-09 08:00:00', '2024-11-09 12:40:00', 'High', '정시 납기 요구'),
    (6, '베이글빵', 25, '2024-11-09 09:00:00', '2024-11-09 13:40:00', 'Medium', '일반 작업 요청'),
    (7, '생크림소보로', 35, '2024-11-09 10:00:00', '2024-11-09 14:40:00', 'High', '정시 납기 요구'),
    (8, '꿀버터바게트', 20, '2024-11-09 11:00:00', '2024-11-09 15:40:00', 'Low', '특별 공정 필요'),
    (9, '애플파이', 50, '2024-11-09 13:00:00', '2024-11-09 17:40:00', 'Medium', '긴급 작업 요청'),
    (10, '우유도넛', 30, '2024-11-09 14:00:00', '2024-11-09 18:40:00', 'High', '정시 납기 요구'),
    (11, '찹쌀브레드', 20, '2024-11-09 15:00:00', '2024-11-09 19:40:00', 'Medium', '일반 작업 요청'),
    (12, '카라멜 러스크', 40, '2024-11-09 16:00:00', '2024-11-09 20:40:00', 'Low', '특별 공정 필요'),

    (1, '갈릭꽈베기', 30, '2024-11-10 08:00:00', '2024-11-10 12:40:00', 'High', '긴급 작업 요청'),
    (2, '단팥도넛', 45, '2024-11-10 09:00:00', '2024-11-10 13:40:00', 'Medium', '일반 작업 요청'),
    (3, '고구마케이크빵', 20, '2024-11-10 10:00:00', '2024-11-10 14:40:00', 'High', '정시 납기 요구'),
    (4, '꽈베기', 50, '2024-11-10 11:00:00', '2024-11-10 15:40:00', 'Low', '일반 작업 요청'),
    (5, '라우겐', 35, '2024-11-10 13:00:00', '2024-11-10 17:40:00', 'Medium', '정시 납기 요구'),
    (6, '베이글빵', 40, '2024-11-10 14:00:00', '2024-11-10 18:40:00', 'High', '긴급 작업 요청'),
    (7, '생크림소보로', 25, '2024-11-10 15:00:00', '2024-11-10 19:40:00', 'Medium', '일반 작업 요청'),
    (8, '꿀버터바게트', 30, '2024-11-10 16:00:00', '2024-11-10 20:40:00', 'Low', '특별 공정 필요'),

    (9, '애플파이', 45, '2024-11-11 08:00:00', '2024-11-11 12:40:00', 'High', '긴급 작업 요청'),
    (10, '우유도넛', 30, '2024-11-11 09:00:00', '2024-11-11 13:40:00', 'Medium', '정시 납기 요구'),
    (11, '찹쌀브레드', 40, '2024-11-11 10:00:00', '2024-11-11 14:40:00', 'High', '정시 납기 요구'),
    (12, '카라멜 러스크', 20, '2024-11-11 11:00:00', '2024-11-11 15:40:00', 'Low', '일반 작업 요청'),
    (1, '갈릭꽈베기', 50, '2024-11-11 13:00:00', '2024-11-11 17:40:00', 'Medium', '긴급 작업 요청'),
    (2, '단팥도넛', 25, '2024-11-11 14:00:00', '2024-11-11 18:40:00', 'High', '정시 납기 요구'),
    (3, '고구마케이크빵', 30, '2024-11-11 15:00:00', '2024-11-11 19:40:00', 'Medium', '일반 작업 요청'),
    (4, '꽈베기', 20, '2024-11-11 16:00:00', '2024-11-11 20:40:00', 'Low', '특별 공정 필요');


INSERT INTO ERP.WorkOrders (ProductID, ProductName, Quantity, StartDate, EndDate, Priority, etc)
VALUES
    (5, '라우겐', 120, '2024-11-01 08:00:00', '2024-11-01 16:00:00', 'Low', '품질 검사 대기');

-- 14. 생산 계획 (ProductionPlanning)
INSERT INTO ERP.ProductionPlanning (OrderID, ProductID, ProductName, Quantity, StartDate, EndDate, etc)
VALUES
    (1, 1, '갈릭꽈베기', 30, '2024-11-01 08:00:00', '2024-11-01 12:40:00', '생산 준비 완료'),
    (2, 2, '단팥도넛', 40, '2024-11-01 09:00:00', '2024-11-01 13:40:00', '생산 준비 완료'),
    (3, 3, '고구마케이크빵', 50, '2024-11-01 10:00:00', '2024-11-01 14:40:00', '생산 준비 완료'),
    (4, 4, '꽈베기', 25, '2024-11-01 11:00:00', '2024-11-01 15:40:00', '생산 준비 완료'),
    (5, 5, '라우겐', 30, '2024-11-01 13:00:00', '2024-11-01 17:40:00', '생산 준비 완료'),
    (6, 6, '베이글빵', 45, '2024-11-01 14:00:00', '2024-11-01 18:40:00', '생산 준비 완료'),
    (7, 7, '생크림소보로', 20, '2024-11-01 15:00:00', '2024-11-01 19:40:00', '생산 준비 완료'),
    (8, 8, '꿀버터바게트', 40, '2024-11-01 16:00:00', '2024-11-01 20:40:00', '생산 준비 완료'),

    (9, 9, '애플파이', 30, '2024-11-02 08:00:00', '2024-11-02 12:40:00', '생산 준비 완료'),
    (10, 10, '우유도넛', 25, '2024-11-02 09:00:00', '2024-11-02 13:40:00', '생산 준비 완료'),
    (11, 11, '찹쌀브레드', 50, '2024-11-02 10:00:00', '2024-11-02 14:40:00', '생산 준비 완료'),
    (12, 12, '카라멜 러스크', 20, '2024-11-02 11:00:00', '2024-11-02 15:40:00', '생산 준비 완료'),
    (13, 1, '갈릭꽈베기', 40, '2024-11-02 13:00:00', '2024-11-02 17:40:00', '생산 준비 완료'),
    (14, 2, '단팥도넛', 30, '2024-11-02 14:00:00', '2024-11-02 18:40:00', '생산 준비 완료'),
    (15, 3, '고구마케이크빵', 20, '2024-11-02 15:00:00', '2024-11-02 19:40:00', '생산 준비 완료'),
    (16, 4, '꽈베기', 50, '2024-11-02 16:00:00', '2024-11-02 20:40:00', '생산 준비 완료'),

    (17, 5, '라우겐', 30, '2024-11-03 08:00:00', '2024-11-03 12:40:00', '생산 준비 완료'),
    (18, 6, '베이글빵', 25, '2024-11-03 09:00:00', '2024-11-03 13:40:00', '생산 준비 완료'),
    (19, 7, '생크림소보로', 45, '2024-11-03 10:00:00', '2024-11-03 14:40:00', '생산 준비 완료'),
    (20, 8, '꿀버터바게트', 20, '2024-11-03 11:00:00', '2024-11-03 15:40:00', '생산 준비 완료'),
    (21, 9, '애플파이', 40, '2024-11-03 13:00:00', '2024-11-03 17:40:00', '생산 준비 완료'),
    (22, 10, '우유도넛', 30, '2024-11-03 14:00:00', '2024-11-03 18:40:00', '생산 준비 완료'),
    (23, 11, '찹쌀브레드', 25, '2024-11-03 15:00:00', '2024-11-03 19:40:00', '생산 준비 완료'),
    (24, 12, '카라멜 러스크', 50, '2024-11-03 16:00:00', '2024-11-03 20:40:00', '생산 준비 완료'),

    (25, 1, '갈릭꽈베기', 35, '2024-11-04 08:00:00', '2024-11-04 12:40:00', '생산 준비 완료'),
    (26, 2, '단팥도넛', 45, '2024-11-04 09:00:00', '2024-11-04 13:40:00', '생산 준비 완료'),
    (27, 3, '고구마케이크빵', 20, '2024-11-04 10:00:00', '2024-11-04 14:40:00', '생산 준비 완료'),
    (28, 4, '꽈베기', 30, '2024-11-04 11:00:00', '2024-11-04 15:40:00', '생산 준비 완료'),
    (29, 5, '라우겐', 40, '2024-11-04 13:00:00', '2024-11-04 17:40:00', '생산 준비 완료'),
    (30, 6, '베이글빵', 25, '2024-11-04 14:00:00', '2024-11-04 18:40:00', '생산 준비 완료'),
    (31, 7, '생크림소보로', 50, '2024-11-04 15:00:00', '2024-11-04 19:40:00', '생산 준비 완료'),
    (32, 8, '꿀버터바게트', 20, '2024-11-04 16:00:00', '2024-11-04 20:40:00', '생산 준비 완료'),

    (33, 9, '애플파이', 45, '2024-11-05 08:00:00', '2024-11-05 12:40:00', '생산 준비 완료'),
    (34, 10, '우유도넛', 30, '2024-11-05 09:00:00', '2024-11-05 13:40:00', '생산 준비 완료'),
    (35, 11, '찹쌀브레드', 40, '2024-11-05 10:00:00', '2024-11-05 14:40:00', '생산 준비 완료'),
    (36, 12, '카라멜 러스크', 20, '2024-11-05 11:00:00', '2024-11-05 15:40:00', '생산 준비 완료'),
    (37, 1, '갈릭꽈베기', 50, '2024-11-05 13:00:00', '2024-11-05 17:40:00', '생산 준비 완료'),
    (38, 2, '단팥도넛', 25, '2024-11-05 14:00:00', '2024-11-05 18:40:00', '생산 준비 완료'),
    (39, 3, '고구마케이크빵', 30, '2024-11-05 15:00:00', '2024-11-05 19:40:00', '생산 준비 완료'),
    (40, 4, '꽈베기', 20, '2024-11-05 16:00:00', '2024-11-05 20:40:00', '생산 준비 완료'),

    (41, 5, '라우겐', 40, '2024-11-06 08:00:00', '2024-11-06 12:40:00', '생산 준비 완료'),
    (42, 6, '베이글빵', 25, '2024-11-06 09:00:00', '2024-11-06 13:40:00', '생산 준비 완료'),
    (43, 7, '생크림소보로', 35, '2024-11-06 10:00:00', '2024-11-06 14:40:00', '생산 준비 완료'),
    (44, 8, '꿀버터바게트', 20, '2024-11-06 11:00:00', '2024-11-06 15:40:00', '생산 준비 완료'),
    (45, 9, '애플파이', 50, '2024-11-06 13:00:00', '2024-11-06 17:40:00', '생산 준비 완료'),
    (46, 10, '우유도넛', 30, '2024-11-06 14:00:00', '2024-11-06 18:40:00', '생산 준비 완료'),
    (47, 11, '찹쌀브레드', 20, '2024-11-06 15:00:00', '2024-11-06 19:40:00', '생산 준비 완료'),
    (48, 12, '카라멜 러스크', 40, '2024-11-06 16:00:00', '2024-11-06 20:40:00', '생산 준비 완료'),

    (49, 1, '갈릭꽈베기', 30, '2024-11-07 08:00:00', '2024-11-07 12:40:00', '생산 준비 완료'),
    (50, 2, '단팥도넛', 45, '2024-11-07 09:00:00', '2024-11-07 13:40:00', '생산 준비 완료'),
    (51, 3, '고구마케이크빵', 20, '2024-11-07 10:00:00', '2024-11-07 14:40:00', '생산 준비 완료'),
    (52, 4, '꽈베기', 50, '2024-11-07 11:00:00', '2024-11-07 15:40:00', '생산 준비 완료'),
    (53, 5, '라우겐', 35, '2024-11-07 13:00:00', '2024-11-07 17:40:00', '생산 준비 완료'),
    (54, 6, '베이글빵', 40, '2024-11-07 14:00:00', '2024-11-07 18:40:00', '생산 준비 완료'),
    (55, 7, '생크림소보로', 25, '2024-11-07 15:00:00', '2024-11-07 19:40:00', '생산 준비 완료'),
    (56, 8, '꿀버터바게트', 30, '2024-11-07 16:00:00', '2024-11-07 20:40:00', '생산 준비 완료'),

    -- 11월 8일 데이터
(57, 9, '애플파이', 45, '2024-11-08 08:00:00', '2024-11-08 12:40:00', '생산 준비 완료'),
(58, 10, '우유도넛', 30, '2024-11-08 09:00:00', '2024-11-08 13:40:00', '생산 준비 완료'),
(59, 11, '찹쌀브레드', 40, '2024-11-08 10:00:00', '2024-11-08 14:40:00', '생산 준비 완료'),
(60, 12, '카라멜 러스크', 20, '2024-11-08 11:00:00', '2024-11-08 15:40:00', '생산 준비 완료'),
(61, 1, '갈릭꽈베기', 50, '2024-11-08 13:00:00', '2024-11-08 17:40:00', '생산 준비 완료'),
(62, 2, '단팥도넛', 25, '2024-11-08 14:00:00', '2024-11-08 18:40:00', '생산 준비 완료'),
(63, 3, '고구마케이크빵', 30, '2024-11-08 15:00:00', '2024-11-08 19:40:00', '생산 준비 완료'),
(64, 4, '꽈베기', 20, '2024-11-08 16:00:00', '2024-11-08 20:40:00', '생산 준비 완료'),

-- 11월 9일 데이터
(65, 5, '라우겐', 40, '2024-11-09 08:00:00', '2024-11-09 12:40:00', '생산 준비 완료'),
(66, 6, '베이글빵', 25, '2024-11-09 09:00:00', '2024-11-09 13:40:00', '생산 준비 완료'),
(67, 7, '생크림소보로', 35, '2024-11-09 10:00:00', '2024-11-09 14:40:00', '생산 준비 완료'),
(68, 8, '꿀버터바게트', 20, '2024-11-09 11:00:00', '2024-11-09 15:40:00', '생산 준비 완료'),
(69, 9, '애플파이', 50, '2024-11-09 13:00:00', '2024-11-09 17:40:00', '생산 준비 완료'),
(70, 10, '우유도넛', 30, '2024-11-09 14:00:00', '2024-11-09 18:40:00', '생산 준비 완료'),
(71, 11, '찹쌀브레드', 20, '2024-11-09 15:00:00', '2024-11-09 19:40:00', '생산 준비 완료'),
(72, 12, '카라멜 러스크', 40, '2024-11-09 16:00:00', '2024-11-09 20:40:00', '생산 준비 완료'),

-- 11월 10일 데이터
(73, 1, '갈릭꽈베기', 30, '2024-11-10 08:00:00', '2024-11-10 12:40:00', '생산 준비 완료'),
(74, 2, '단팥도넛', 45, '2024-11-10 09:00:00', '2024-11-10 13:40:00', '생산 준비 완료'),
(75, 3, '고구마케이크빵', 20, '2024-11-10 10:00:00', '2024-11-10 14:40:00', '생산 준비 완료'),
(76, 4, '꽈베기', 50, '2024-11-10 11:00:00', '2024-11-10 15:40:00', '생산 준비 완료'),
(77, 5, '라우겐', 35, '2024-11-10 13:00:00', '2024-11-10 17:40:00', '생산 준비 완료'),
(78, 6, '베이글빵', 40, '2024-11-10 14:00:00', '2024-11-10 18:40:00', '생산 준비 완료'),
(79, 7, '생크림소보로', 25, '2024-11-10 15:00:00', '2024-11-10 19:40:00', '생산 준비 완료'),
(80, 8, '꿀버터바게트', 30, '2024-11-10 16:00:00', '2024-11-10 20:40:00', '생산 준비 완료'),

-- 11월 11일 데이터
(81, 9, '애플파이', 45, '2024-11-11 08:00:00', '2024-11-11 12:40:00', '생산 준비 완료'),
(82, 10, '우유도넛', 30, '2024-11-11 09:00:00', '2024-11-11 13:40:00', '생산 준비 완료'),
(83, 11, '찹쌀브레드', 40, '2024-11-11 10:00:00', '2024-11-11 14:40:00', '생산 준비 완료'),
(84, 12, '카라멜 러스크', 20, '2024-11-11 11:00:00', '2024-11-11 15:40:00', '생산 준비 완료'),
(85, 1, '갈릭꽈베기', 50, '2024-11-11 13:00:00', '2024-11-11 17:40:00', '생산 준비 완료'),
(86, 2, '단팥도넛', 25, '2024-11-11 14:00:00', '2024-11-11 18:40:00', '생산 준비 완료'),
(87, 3, '고구마케이크빵', 30, '2024-11-11 15:00:00', '2024-11-11 19:40:00', '생산 준비 완료'),
(88, 4, '꽈베기', 20, '2024-11-11 16:00:00', '2024-11-11 20:40:00', '생산 준비 완료');

--  15. 생산 모니터링 (ProductionMonitoring)
INSERT INTO ERP.ProductionMonitoring (OrderID, Temperature, Humidity, ProductionRate, OperationTime, StartTime)
VALUES
(1, 25.6, 60, 99.65, 306.79, '2024-04-23 13:06'),
(1, 25.0, 68, 99.68, 306.88, '2024-04-23 13:07'),
(1, 24.6, 67, 99.7, 306.96, '2024-04-23 13:07'),
(1, 28.8, 63, 99.73, 307.04, '2024-04-23 13:07'),
(1, 31.8, 66, 99.76, 307.13, '2024-04-23 13:07'),
(1, 26.4, 61, 99.78, 307.21, '2024-04-23 13:07'),
(1, 26.5, 68, 99.81, 307.29, '2024-04-23 13:07'),
(1, 32.1, 64, 99.84, 307.38, '2024-04-23 13:07'),
(1, 30.7, 61, 99.86, 307.46, '2024-04-23 13:07'),
(1, 30.9, 64, 99.89, 307.54, '2024-04-23 13:07'),
(1, 24.9, 66, 99.92, 307.63, '2024-04-23 13:07'),
(1, 25.4, 63, 99.95, 307.71, '2024-04-23 13:07'),
(1, 24.6, 67, 99.97, 307.79, '2024-04-23 13:07'),
(1, 24.2, 64, 100.0, 307.88, '2024-04-23 13:08'),

(2, 23, 61, 99.67, 307.67, '2024-05-09 15:59'),
(2, 24.7, 64, 99.75, 307.75, '2024-05-09 15:59'),
(2, 27.4, 67, 99.83, 307.83, '2024-05-09 15:59'),
(2, 23.5, 60, 99.92, 307.92, '2024-05-09 15:59'),
(2, 26.9, 68, 100, 308, '2024-05-09 16:00'),


(3, 34.4, 69, 87.58, 269.75, '2024-04-23 12:29'),
(3, 34.3, 60, 87.61, 269.83, '2024-04-23 12:29'),
(3, 35.9, 63, 87.64, 269.91, '2024-04-23 12:29'),
(3, 35.7, 68, 87.66, 270, '2024-04-23 12:30'),
(3, 36.6, 64, 87.69, 270.08, '2024-04-23 12:30'),
(3, 36.5, 60, 87.72, 270.16, '2024-04-23 12:30'),
(3, 37.1, 69, 87.74, 270.25, '2024-04-23 12:30'),
(3, 37.5, 67, 87.77, 270.33, '2024-04-23 12:30'),
(3, 37.8, 65, 87.8, 270.41, '2024-04-23 12:30'),
(3, 38, 64, 87.82, 270.5, '2024-04-23 12:30'),
(3, 39, 64, 87.85, 270.58, '2024-04-23 12:30'),
(3, 40, 66, 87.88, 270.66, '2024-04-23 12:30'),
(3, 45.9, 68, 87.91, 270.75, '2024-04-23 12:30'),
(3, 49.6, 67, 87.93, 270.83, '2024-04-23 12:30'),
(3, 57.8, 66, 87.96, 270.91, '2024-04-23 12:30'),
(3, 67, 69, 87.99, 271, '2024-04-23 12:31'),
(3, 76.3, 68, 88.01, 271.08, '2024-04-23 12:31'),
(3, 86.6, 65, 88.04, 271.16, '2024-04-23 12:31'),
(3, 86.9, 60, 88.07, 271.25, '2024-04-23 12:31'),
(3, 86.3, 62, 88.1, 271.33, '2024-04-23 12:31'),
(3, 86.3, 65, 88.12, 271.41, '2024-04-23 12:31'),
(3, 85.3, 68, 88.15, 271.5, '2024-04-23 12:31'),
(3, 85.8, 61, 88.18, 271.58, '2024-04-23 12:31'),
(3, 84.1, 60, 88.2, 271.66, '2024-04-23 12:31'),
(3, 83, 66, 88.23, 271.75, '2024-04-23 12:31'),
(3, 83, 60, 88.26, 271.83, '2024-04-23 12:31'),
(3, 82.5, 68, 88.28, 271.91, '2024-04-23 12:31'),
(3, 81.2, 64, 88.31, 272, '2024-04-23 12:32'),

(4, 25, 64, 0, 0, '2024-05-10 08:30'),
(4, 32, 67, 0.03, 0.08, '2024-05-10 08:30'),
(4, 27.8, 66, 0.05, 0.17, '2024-05-10 08:30'),
(4, 24.8, 68, 0.08, 0.25, '2024-05-10 08:30'),
(4, 24.3, 69, 0.11, 0.33, '2024-05-10 08:30'),
(4, 23, 64, 0.14, 0.42, '2024-05-10 08:30'),
(4, 26, 62, 0.16, 0.5, '2024-05-10 08:30'),
(4, 28.8, 69, 0.19, 0.58, '2024-05-10 08:30'),
(4, 28.6, 66, 0.22, 0.67, '2024-05-10 08:30'),
(4, 23.2, 69, 0.24, 0.75, '2024-05-10 08:30'),
(4, 30.8, 69, 0.27, 0.83, '2024-05-10 08:30'),
(4, 26.8, 71, 0.3, 0.92, '2024-05-10 08:30'),
(4, 31.4, 68, 0.32, 1, '2024-05-10 08:31'),
(4, 31.6, 68, 0.35, 1.08, '2024-05-10 08:31'),
(4, 24.6, 66, 0.38, 1.17, '2024-05-10 08:31'),
(4, 28.2, 71, 0.41, 1.25, '2024-05-10 08:31'),
(4, 32.4, 62, 0.43, 1.33, '2024-05-10 08:31'),
(4, 31.5, 65, 0.46, 1.42, '2024-05-10 08:31'),
(4, 22.7, 71, 0.49, 1.5, '2024-05-10 08:31'),
(4, 30.6, 65, 0.51, 1.58, '2024-05-10 08:31'),
(4, 24.5, 67, 0.54, 1.67, '2024-05-10 08:31'),
(4, 29, 71, 0.57, 1.75, '2024-05-10 08:31'),
(4, 23.3, 64, 0.6, 1.83, '2024-05-10 08:31'),
(4, 29.7, 70, 0.62, 1.92, '2024-05-10 08:31'),
(4, 29.5, 70, 0.65, 2, '2024-05-10 08:32'),
(4, 29.1, 63, 0.68, 2.08, '2024-05-10 08:32'),
(4, 23.3, 66, 0.7, 2.17, '2024-05-10 08:32'),
(4, 28.7, 70, 0.73, 2.25, '2024-05-10 08:32'),
(4, 32.5, 62, 0.76, 2.33, '2024-05-10 08:32'),
(4, 25.8, 67, 0.78, 2.42, '2024-05-10 08:32'),
(4, 29.1, 68, 0.81, 2.5, '2024-05-10 08:32'),
(4, 30, 63, 0.84, 2.58, '2024-05-10 08:32'),
(4, 24.7, 69, 0.87, 2.67, '2024-05-10 08:32'),
(4, 26.9, 64, 0.89, 2.75, '2024-05-10 08:32'),
(4, 30.5, 70, 0.92, 2.83, '2024-05-10 08:32'),
(4, 32, 63, 0.95, 2.92, '2024-05-10 08:32'),
(4, 24.2, 71, 0.97, 3, '2024-05-10 08:33'),
(4, 26.2, 67, 1, 3.08, '2024-05-10 08:33'),
(4, 23.4, 64, 1.03, 3.17, '2024-05-10 08:33'),
(4, 22.6, 64, 1.06, 3.25, '2024-05-10 08:33'),
(4, 26.6, 63, 1.08, 3.33, '2024-05-10 08:33'),
(4, 29.8, 70, 1.11, 3.42, '2024-05-10 08:33'),
(4, 31.8, 64, 1.14, 3.5, '2024-05-10 08:33'),
(4, 25.7, 70, 1.16, 3.58, '2024-05-10 08:33'),
(4, 23.3, 63, 1.19, 3.67, '2024-05-10 08:33'),
(4, 23.3, 65, 1.22, 3.75, '2024-05-10 08:33'),
(4, 28, 62, 1.24, 3.83, '2024-05-10 08:33'),
(4, 25.6, 65, 1.27, 3.92, '2024-05-10 08:33'),
(4, 27.2, 70, 1.3, 4, '2024-05-10 08:34'),
(4, 25.2, 65, 1.33, 4.08, '2024-05-10 08:34'),
(4, 25.8, 71, 1.35, 4.16, '2024-05-10 08:34'),
(4, 32.2, 67, 1.38, 4.25, '2024-05-10 08:34'),
(4, 29.8, 66, 1.41, 4.33, '2024-05-10 08:34'),
(4, 22.7, 62, 1.43, 4.41, '2024-05-10 08:34'),
(4, 31.3, 70, 1.46, 4.5, '2024-05-10 08:34'),
(4, 24.4, 65, 1.49, 4.58, '2024-05-10 08:34'),
(4, 28.2, 66, 1.52, 4.66, '2024-05-10 08:34'),
(4, 31.3, 68, 1.54, 4.75, '2024-05-10 08:34'),
(4, 29.4, 63, 1.57, 4.83, '2024-05-10 08:34'),
(4, 25.6, 67, 1.6, 4.91, '2024-05-10 08:34'),
(4, 31, 63, 1.62, 5, '2024-05-10 08:35'),
(4, 29.7, 68, 1.65, 5.08, '2024-05-10 08:35'),
(4, 30.9, 63, 1.68, 5.16, '2024-05-10 08:35'),
(4, 22.7, 71, 1.7, 5.25, '2024-05-10 08:35'),
(4, 22.6, 62, 1.73, 5.33, '2024-05-10 08:35'),
(4, 30.4, 62, 1.76, 5.41, '2024-05-10 08:35'),
(4, 31.3, 71, 1.79, 5.5, '2024-05-10 08:35'),
(4, 24.5, 65, 1.81, 5.58, '2024-05-10 08:35'),
(4, 22.9, 68, 1.84, 5.66, '2024-05-10 08:35'),
(4, 28.6, 70, 1.87, 5.75, '2024-05-10 08:35'),
(4, 22.9, 70, 1.89, 5.83, '2024-05-10 08:35'),
(4, 26.7, 63, 1.92, 5.91, '2024-05-10 08:35'),
(4, 30.2, 70, 1.95, 6, '2024-05-10 08:36'),
(4, 23.7, 70, 1.98, 6.08, '2024-05-10 08:36'),
(4, 25, 70, 2, 6.16, '2024-05-10 08:36'),
(4, 32.2, 70, 2.03, 6.25, '2024-05-10 08:36'),
(4, 24.5, 67, 2.06, 6.33, '2024-05-10 08:36'),
(4, 27.5, 67, 2.08, 6.41, '2024-05-10 08:36'),
(4, 25.8, 66, 2.11, 6.5, '2024-05-10 08:36'),
(4, 23.9, 67, 2.14, 6.58, '2024-05-10 08:36'),
(4, 28.2, 64, 2.16, 6.66, '2024-05-10 08:36'),
(4, 24.5, 66, 2.19, 6.75, '2024-05-10 08:36'),
(4, 25.7, 67, 2.22, 6.83, '2024-05-10 08:36'),
(4, 25.1, 62, 2.25, 6.91, '2024-05-10 08:36'),
(4, 31.5, 68, 2.27, 7, '2024-05-10 08:37'),
(4, 23.1, 69, 2.3, 7.08, '2024-05-10 08:37'),
(4, 28.3, 67, 2.33, 7.16, '2024-05-10 08:37'),
(4, 26.5, 66, 2.35, 7.25, '2024-05-10 08:37'),
(4, 24.4, 69, 2.38, 7.33, '2024-05-10 08:37'),
(4, 28.7, 64, 2.41, 7.41, '2024-05-10 08:37'),
(4, 31.4, 68, 2.44, 7.5, '2024-05-10 08:37'),
(4, 29.9, 71, 2.46, 7.58, '2024-05-10 08:37'),
(4, 23.3, 64, 2.49, 7.66, '2024-05-10 08:37'),
(4, 28.8, 65, 2.52, 7.75, '2024-05-10 08:37'),
(4, 23.8, 64, 2.54, 7.83, '2024-05-10 08:37'),
(4, 31.5, 69, 2.57, 7.91, '2024-05-10 08:37'),
(4, 28.3, 71, 2.6, 8, '2024-05-10 08:38'),
(4, 32.1, 69, 2.62, 8.08, '2024-05-10 08:38'),
(4, 24, 63, 2.65, 8.16, '2024-05-10 08:38'),
(4, 28.4, 70, 2.68, 8.25, '2024-05-10 08:38'),
(4, 26.8, 70, 2.71, 8.33, '2024-05-10 08:38'),
(4, 22.9, 70, 2.73, 8.41, '2024-05-10 08:38'),
(4, 22.9, 63, 2.76, 8.5, '2024-05-10 08:38'),
(4, 26.8, 62, 2.79, 8.58, '2024-05-10 08:38'),
(4, 25, 70, 2.81, 8.66, '2024-05-10 08:38'),
(4, 26.6, 67, 2.84, 8.75, '2024-05-10 08:38'),
(4, 24, 69, 2.87, 8.83, '2024-05-10 08:38'),
(4, 26.4, 65, 2.9, 8.91, '2024-05-10 08:38'),
(4, 26.3, 70, 2.92, 9, '2024-05-10 08:39'),
(4, 27.7, 64, 2.95, 9.08, '2024-05-10 08:39'),
(4, 23.8, 71, 2.98, 9.16, '2024-05-10 08:39'),
(4, 30.7, 65, 3, 9.25, '2024-05-10 08:39'),
(4, 26.2, 71, 3.03, 9.33, '2024-05-10 08:39'),
(4, 28.8, 63, 3.06, 9.41, '2024-05-10 08:39'),
(4, 22.9, 67, 3.08, 9.5, '2024-05-10 08:39'),
(4, 27, 65, 3.11, 9.58, '2024-05-10 08:39'),
(4, 23.6, 66, 3.14, 9.66, '2024-05-10 08:39'),
(4, 32.4, 70, 3.17, 9.75, '2024-05-10 08:39'),
(4, 30.2, 68, 3.19, 9.83, '2024-05-10 08:39'),
(4, 31.8, 68, 3.22, 9.91, '2024-05-10 08:39'),
(4, 26.1, 67, 3.25, 10, '2024-05-10 08:40'),
(4, 32.3, 66, 3.27, 10.08, '2024-05-10 08:40'),
(4, 26, 64, 3.3, 10.16, '2024-05-10 08:40'),
(4, 30.7, 63, 3.33, 10.25, '2024-05-10 08:40'),
(4, 27.1, 66, 3.35, 10.33, '2024-05-10 08:40'),
(4, 26.2, 70, 3.38, 10.41, '2024-05-10 08:40'),
(4, 29.7, 68, 3.41, 10.5, '2024-05-10 08:40'),
(4, 24.6, 65, 3.44, 10.58, '2024-05-10 08:40'); 




 
 -- 16. 생성 공정 상태 ProductionProcessStatus 테이블에 더미 데이터 삽입
INSERT INTO ERP.ProductionProcessStatus (MonitorID, Status, WeighingComplete, DoughComplete, FirstFermentationComplete, 
                                                            DivisionComplete, RoundingComplete, IntermediateFermentationComplete, 
                                                            ShapingComplete, PanningComplete, SecondFermentationComplete, 
                                                            BakingComplete, CoolingComplete, PackagingComplete) 
VALUES 
(1, '대기', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),   -- 1차 발효 단계 대기
(2, '완료', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),  -- 모든 공정 대기 상태
(3, '경고', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE),           -- 냉각 및 포장 대기
(4, '작업중', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE);             -- 모든 공정 완료

-- 17. 품질 관리 (QualityControl)
INSERT INTO QualityControl (OrderID, Quantity, ProductID, ProductName, TestResult, TestDate, etc)
VALUES 
    (1, 30, 1, '갈릭꽈베기', '합격', '2024-11-01 13:00:00', '정상 품질 검사 완료'),
    (2, 40, 2, '단팥도넛', '합격', '2024-11-01 14:00:00', '정상 품질 검사 완료'),
    (3, 50, 3, '고구마케이크빵', '합격', '2024-11-01 15:00:00', '정상 품질 검사 완료'),
    (4, 25, 4, '꽈베기', '합격', '2024-11-01 16:00:00', '정상 품질 검사 완료'),
    (5, 30, 5, '라우겐', '합격', '2024-11-01 18:00:00', '정상 품질 검사 완료'),
    (6, 45, 6, '베이글빵', '합격', '2024-11-01 19:00:00', '정상 품질 검사 완료'),
    (7, 20, 7, '생크림소보로', '합격', '2024-11-01 20:00:00', '정상 품질 검사 완료'),
    (8, 40, 8, '꿀버터바게트', '불합격', '2024-11-01 21:00:00', '검사에서 결함 발견'),

    (9, 30, 9, '애플파이', '합격', '2024-11-02 13:00:00', '정상 품질 검사 완료'),
    (10, 25, 10, '우유도넛', '합격', '2024-11-02 14:00:00', '정상 품질 검사 완료'),
    (11, 50, 11, '찹쌀브레드', '합격', '2024-11-02 15:00:00', '정상 품질 검사 완료'),
    (12, 20, 12, '카라멜 러스크', '합격', '2024-11-02 16:00:00', '정상 품질 검사 완료'),
    (13, 40, 1, '갈릭꽈베기', '합격', '2024-11-02 18:00:00', '정상 품질 검사 완료'),
    (14, 30, 2, '단팥도넛', '합격', '2024-11-02 19:00:00', '정상 품질 검사 완료'),
    (15, 20, 3, '고구마케이크빵', '합격', '2024-11-02 20:00:00', '정상 품질 검사 완료'),
    (16, 50, 4, '꽈베기', '불합격', '2024-11-02 21:00:00', '검사에서 결함 발견'),

    (17, 30, 5, '라우겐', '합격', '2024-11-03 13:00:00', '정상 품질 검사 완료'),
    (18, 25, 6, '베이글빵', '합격', '2024-11-03 14:00:00', '정상 품질 검사 완료'),
    (19, 45, 7, '생크림소보로', '합격', '2024-11-03 15:00:00', '정상 품질 검사 완료'),
    (20, 20, 8, '꿀버터바게트', '합격', '2024-11-03 16:00:00', '정상 품질 검사 완료'),
    (21, 40, 9, '애플파이', '합격', '2024-11-03 18:00:00', '정상 품질 검사 완료'),
    (22, 30, 10, '우유도넛', '합격', '2024-11-03 19:00:00', '정상 품질 검사 완료'),
    (23, 25, 11, '찹쌀브레드', '합격', '2024-11-03 20:00:00', '정상 품질 검사 완료'),
    (24, 50, 12, '카라멜 러스크', '불합격', '2024-11-03 21:00:00', '검사에서 결함 발견'),

    (25, 35, 1, '갈릭꽈베기', '합격', '2024-11-04 13:00:00', '정상 품질 검사 완료'),
    (26, 45, 2, '단팥도넛', '합격', '2024-11-04 14:00:00', '정상 품질 검사 완료'),
    (27, 20, 3, '고구마케이크빵', '합격', '2024-11-04 15:00:00', '정상 품질 검사 완료'),
    (28, 30, 4, '꽈베기', '합격', '2024-11-04 16:00:00', '정상 품질 검사 완료'),
    (29, 40, 5, '라우겐', '합격', '2024-11-04 18:00:00', '정상 품질 검사 완료'),
    (30, 25, 6, '베이글빵', '합격', '2024-11-04 19:00:00', '정상 품질 검사 완료'),
    (31, 50, 7, '생크림소보로', '합격', '2024-11-04 20:00:00', '정상 품질 검사 완료'),
    (32, 20, 8, '꿀버터바게트', '불합격', '2024-11-04 21:00:00', '검사에서 결함 발견'),

    -- 11월 5일 데이터
(33, 45, 9, '애플파이', '합격', '2024-11-05 13:00:00', '정상 품질 검사 완료'),
(34, 30, 10, '우유도넛', '합격', '2024-11-05 14:00:00', '정상 품질 검사 완료'),
(35, 40, 11, '찹쌀브레드', '합격', '2024-11-05 15:00:00', '정상 품질 검사 완료'),
(36, 20, 12, '카라멜 러스크', '합격', '2024-11-05 16:00:00', '정상 품질 검사 완료'),
(37, 50, 1, '갈릭꽈베기', '합격', '2024-11-05 18:00:00', '정상 품질 검사 완료'),
(38, 25, 2, '단팥도넛', '합격', '2024-11-05 19:00:00', '정상 품질 검사 완료'),
(39, 30, 3, '고구마케이크빵', '불합격', '2024-11-05 20:00:00', '검사에서 결함 발견'),
(40, 20, 4, '꽈베기', '합격', '2024-11-05 21:00:00', '정상 품질 검사 완료'),

-- 11월 6일 데이터
(41, 40, 5, '라우겐', '합격', '2024-11-06 13:00:00', '정상 품질 검사 완료'),
(42, 25, 6, '베이글빵', '합격', '2024-11-06 14:00:00', '정상 품질 검사 완료'),
(43, 35, 7, '생크림소보로', '합격', '2024-11-06 15:00:00', '정상 품질 검사 완료'),
(44, 20, 8, '꿀버터바게트', '합격', '2024-11-06 16:00:00', '정상 품질 검사 완료'),
(45, 50, 9, '애플파이', '합격', '2024-11-06 18:00:00', '정상 품질 검사 완료'),
(46, 30, 10, '우유도넛', '합격', '2024-11-06 19:00:00', '정상 품질 검사 완료'),
(47, 20, 11, '찹쌀브레드', '합격', '2024-11-06 20:00:00', '정상 품질 검사 완료'),
(48, 40, 12, '카라멜 러스크', '불합격', '2024-11-06 21:00:00', '검사에서 결함 발견'),

-- 11월 7일 데이터
(49, 30, 1, '갈릭꽈베기', '합격', '2024-11-07 13:00:00', '정상 품질 검사 완료'),
(50, 45, 2, '단팥도넛', '합격', '2024-11-07 14:00:00', '정상 품질 검사 완료'),
(51, 20, 3, '고구마케이크빵', '합격', '2024-11-07 15:00:00', '정상 품질 검사 완료'),
(52, 50, 4, '꽈베기', '합격', '2024-11-07 16:00:00', '정상 품질 검사 완료'),
(53, 35, 5, '라우겐', '합격', '2024-11-07 18:00:00', '정상 품질 검사 완료'),
(54, 40, 6, '베이글빵', '합격', '2024-11-07 19:00:00', '정상 품질 검사 완료'),
(55, 25, 7, '생크림소보로', '합격', '2024-11-07 20:00:00', '정상 품질 검사 완료'),
(56, 30, 8, '꿀버터바게트', '불합격', '2024-11-07 21:00:00', '검사에서 결함 발견'),

-- 11월 8일 데이터
(57, 45, 9, '애플파이', '합격', '2024-11-08 13:00:00', '정상 품질 검사 완료'),
(58, 30, 10, '우유도넛', '합격', '2024-11-08 14:00:00', '정상 품질 검사 완료'),
(59, 40, 11, '찹쌀브레드', '합격', '2024-11-08 15:00:00', '정상 품질 검사 완료'),
(60, 20, 12, '카라멜 러스크', '합격', '2024-11-08 16:00:00', '정상 품질 검사 완료'),
(61, 50, 1, '갈릭꽈베기', '합격', '2024-11-08 18:00:00', '정상 품질 검사 완료'),
(62, 25, 2, '단팥도넛', '합격', '2024-11-08 19:00:00', '정상 품질 검사 완료'),
(63, 30, 3, '고구마케이크빵', '합격', '2024-11-08 20:00:00', '정상 품질 검사 완료'),
(64, 20, 4, '꽈베기', '불합격', '2024-11-08 21:00:00', '검사에서 결함 발견'),

-- 11월 9일 데이터
(65, 40, 5, '라우겐', '합격', '2024-11-09 13:00:00', '정상 품질 검사 완료'),
(66, 25, 6, '베이글빵', '합격', '2024-11-09 14:00:00', '정상 품질 검사 완료'),
(67, 35, 7, '생크림소보로', '합격', '2024-11-09 15:00:00', '정상 품질 검사 완료'),
(68, 20, 8, '꿀버터바게트', '합격', '2024-11-09 16:00:00', '정상 품질 검사 완료'),
(69, 50, 9, '애플파이', '합격', '2024-11-09 18:00:00', '정상 품질 검사 완료'),
(70, 30, 10, '우유도넛', '합격', '2024-11-09 19:00:00', '정상 품질 검사 완료'),
(71, 20, 11, '찹쌀브레드', '불합격', '2024-11-09 20:00:00', '검사에서 결함 발견'),
(72, 40, 12, '카라멜 러스크', '합격', '2024-11-09 21:00:00', '정상 품질 검사 완료'),

-- 11월 10일 데이터
(73, 30, 1, '갈릭꽈베기', '합격', '2024-11-10 13:00:00', '정상 품질 검사 완료'),
(74, 45, 2, '단팥도넛', '합격', '2024-11-10 14:00:00', '정상 품질 검사 완료'),
(75, 20, 3, '고구마케이크빵', '합격', '2024-11-10 15:00:00', '정상 품질 검사 완료'),
(76, 50, 4, '꽈베기', '합격', '2024-11-10 16:00:00', '정상 품질 검사 완료'),
(77, 35, 5, '라우겐', '합격', '2024-11-10 18:00:00', '정상 품질 검사 완료'),
(78, 40, 6, '베이글빵', '합격', '2024-11-10 19:00:00', '정상 품질 검사 완료'),
(79, 25, 7, '생크림소보로', '불합격', '2024-11-10 20:00:00', '검사에서 결함 발견'),
(80, 30, 8, '꿀버터바게트', '합격', '2024-11-10 21:00:00', '정상 품질 검사 완료'),

-- 11월 11일 데이터
(81, 45, 9, '애플파이', '합격', '2024-11-11 13:00:00', '정상 품질 검사 완료'),
(82, 30, 10, '우유도넛', '합격', '2024-11-11 14:00:00', '정상 품질 검사 완료'),
(83, 40, 11, '찹쌀브레드', '합격', '2024-11-11 15:00:00', '정상 품질 검사 완료'),
(84, 20, 12, '카라멜 러스크', '합격', '2024-11-11 16:00:00', '정상 품질 검사 완료'),
(85, 50, 1, '갈릭꽈베기', '합격', '2024-11-11 18:00:00', '정상 품질 검사 완료'),
(86, 25, 2, '단팥도넛', '합격', '2024-11-11 19:00:00', '정상 품질 검사 완료'),
(87, 30, 3, '고구마케이크빵', '합격', '2024-11-11 20:00:00', '정상 품질 검사 완료'),
(88, 20, 4, '꽈베기', '불합격', '2024-11-11 21:00:00', '검사에서 결함 발견');

 
   

-- 18. 불량 관리 (DefectManagement)
INSERT INTO DefectManagement (QCID, OrderID, Quantity, ProductID, ProductName, DefectType, DefectQuantity, CauseDescription, Status, Defectrate, etc)
VALUES
    (8, 8, 40, 8, '꿀버터바게트', '외관 결함', 2, '불량 형태의 변형 발생', '완료', 5, '불량률 적용 완료'),
    (16, 16, 50, 4, '꽈베기', '내부 결함', 3, '반죽의 문제로 인한 품질 저하', '완료', 6, '불량률 적용 완료'),
    (24, 24, 50, 12, '카라멜 러스크', '색상 불량', 2, '색상 차이가 발생하여 검수 실패', '완료', 4, '불량률 적용 완료'),
    (32, 32, 20, 8, '꿀버터바게트', '외관 결함', 1, '형태가 비정상적으로 나옴', '완료', 5, '불량률 적용 완료'),
    (39, 39, 30, 3, '고구마케이크빵', '맛 불량', 2, '특유의 고구마 향이 부족함', '완료', 5, '불량률 적용 완료'),
    (48, 48, 40, 12, '카라멜 러스크', '질감 불량', 2, '바삭함이 덜해 품질 저하', '완료', 5, '불량률 적용 완료'),
    (56, 56, 30, 8, '꿀버터바게트', '내부 결함', 3, '반죽 속 공기층 불량', '완료', 5, '불량률 적용 완료'),
    (64, 64, 20, 4, '꽈베기', '형태 불량', 1, '꽈배기의 특유 모양이 흐트러짐', '완료', 5, '불량률 적용 완료'),
    (71, 71, 20, 11, '찹쌀브레드', '내부 결함', 1, '찹쌀 식감 부족', '완료', 5, '불량률 적용 완료'),
    (79, 79, 25, 7, '생크림소보로', '내부 결함', 2, '크림의 밀도가 낮음', '미처리', 5, '불량률 적용 필요'),
    (88, 88, 20, 4, '꽈베기', '형태 불량', 1, '전형적인 모양을 벗어남', '미처리', 5, '불량률 적용 필요');


    

-- 19. 생산 입고 (ProductionEntry)
INSERT INTO ProductionEntry (QCID, OrderID, Quantity, ProductID, ProductName, EntryDate, etc)
VALUES
    (1, 1, 30, 1, '갈릭꽈베기', '2024-11-01', '입고 완료'),
    (2, 2, 40, 2, '단팥도넛', '2024-11-01', '입고 완료'),
    (3, 3, 50, 3, '고구마케이크빵', '2024-11-01', '입고 완료'),
    (4, 4, 25, 4, '꽈베기', '2024-11-01', '입고 완료'),
    (5, 5, 30, 5, '라우겐', '2024-11-01', '입고 완료'),
    (6, 6, 45, 6, '베이글빵', '2024-11-01', '입고 완료'),
    (7, 7, 20, 7, '생크림소보로', '2024-11-01', '입고 완료'),
    (8, 8, 40, 8, '꿀버터바게트', '2024-11-01', '입고 완료'),

    (9, 9, 30, 9, '애플파이', '2024-11-02', '입고 완료'),
    (10, 10, 25, 10, '우유도넛', '2024-11-02', '입고 완료'),
    (11, 11, 50, 11, '찹쌀브레드', '2024-11-02', '입고 완료'),
    (12, 12, 20, 12, '카라멜 러스크', '2024-11-02', '입고 완료'),
    (13, 13, 40, 1, '갈릭꽈베기', '2024-11-02', '입고 완료'),
    (14, 14, 30, 2, '단팥도넛', '2024-11-02', '입고 완료'),
    (15, 15, 20, 3, '고구마케이크빵', '2024-11-02', '입고 완료'),
    (16, 16, 50, 4, '꽈베기', '2024-11-02', '입고 완료'),

    (17, 17, 30, 5, '라우겐', '2024-11-03', '입고 완료'),
    (18, 18, 25, 6, '베이글빵', '2024-11-03', '입고 완료'),
    (19, 19, 45, 7, '생크림소보로', '2024-11-03', '입고 완료'),
    (20, 20, 20, 8, '꿀버터바게트', '2024-11-03', '입고 완료'),
    (21, 21, 40, 9, '애플파이', '2024-11-03', '입고 완료'),
    (22, 22, 30, 10, '우유도넛', '2024-11-03', '입고 완료'),
    (23, 23, 25, 11, '찹쌀브레드', '2024-11-03', '입고 완료'),
    (24, 24, 50, 12, '카라멜 러스크', '2024-11-03', '입고 완료'),

    (25, 25, 35, 1, '갈릭꽈베기', '2024-11-04', '입고 완료'),
    (26, 26, 45, 2, '단팥도넛', '2024-11-04', '입고 완료'),
    (27, 27, 20, 3, '고구마케이크빵', '2024-11-04', '입고 완료'),
    (28, 28, 30, 4, '꽈베기', '2024-11-04', '입고 완료'),
    (29, 29, 40, 5, '라우겐', '2024-11-04', '입고 완료'),
    (30, 30, 25, 6, '베이글빵', '2024-11-04', '입고 완료'),
    (31, 31, 50, 7, '생크림소보로', '2024-11-04', '입고 완료'),
    (32, 32, 20, 8, '꿀버터바게트', '2024-11-04', '입고 완료'),

    (33, 33, 45, 9, '애플파이', '2024-11-05', '입고 완료'),
    (34, 34, 30, 10, '우유도넛', '2024-11-05', '입고 완료'),
    (35, 35, 40, 11, '찹쌀브레드', '2024-11-05', '입고 완료'),
    (36, 36, 20, 12, '카라멜 러스크', '2024-11-05', '입고 완료'),
    (37, 37, 50, 1, '갈릭꽈베기', '2024-11-05', '입고 완료'),
    (38, 38, 25, 2, '단팥도넛', '2024-11-05', '입고 완료'),
    (39, 39, 30, 3, '고구마케이크빵', '2024-11-05', '입고 완료'),
    (40, 40, 20, 4, '꽈베기', '2024-11-05', '입고 완료'),

    (41, 41, 40, 5, '라우겐', '2024-11-06', '입고 완료'),
    (42, 42, 25, 6, '베이글빵', '2024-11-06', '입고 완료'),
    (43, 43, 35, 7, '생크림소보로', '2024-11-06', '입고 완료'),
    (44, 44, 20, 8, '꿀버터바게트', '2024-11-06', '입고 완료'),
    (45, 45, 50, 9, '애플파이', '2024-11-06', '입고 완료'),
    (46, 46, 30, 10, '우유도넛', '2024-11-06', '입고 완료'),
    (47, 47, 20, 11, '찹쌀브레드', '2024-11-06', '입고 완료'),
    (48, 48, 40, 12, '카라멜 러스크', '2024-11-06', '입고 완료'),

    (49, 49, 30, 1, '갈릭꽈베기', '2024-11-07', '입고 완료'),
    (50, 50, 45, 2, '단팥도넛', '2024-11-07', '입고 완료'),
    (51, 51, 20, 3, '고구마케이크빵', '2024-11-07', '입고 완료'),
    (52, 52, 50, 4, '꽈베기', '2024-11-07', '입고 완료'),
    (53, 53, 35, 5, '라우겐', '2024-11-07', '입고 완료'),
    (54, 54, 40, 6, '베이글빵', '2024-11-07', '입고 완료'),
    (55, 55, 25, 7, '생크림소보로', '2024-11-07', '입고 완료'),
    (56, 56, 30, 8, '꿀버터바게트', '2024-11-07', '입고 완료'),

    (57, 57, 45, 9, '애플파이', '2024-11-08', '입고 완료'),
    (58, 58, 30, 10, '우유도넛', '2024-11-08', '입고 완료'),
    (59, 59, 40, 11, '찹쌀브레드', '2024-11-08', '입고 완료'),
    (60, 60, 20, 12, '카라멜 러스크', '2024-11-08', '입고 완료'),
    (61, 61, 50, 1, '갈릭꽈베기', '2024-11-08', '입고 완료'),
    (62, 62, 25, 2, '단팥도넛', '2024-11-08', '입고 완료'),
    (63, 63, 30, 3, '고구마케이크빵', '2024-11-08', '입고 완료'),
    (64, 64, 20, 4, '꽈베기', '2024-11-08', '입고 완료'),

    (65, 65, 40, 5, '라우겐', '2024-11-09', '입고 완료'),
    (66, 66, 25, 6, '베이글빵', '2024-11-09', '입고 완료'),
    (67, 67, 35, 7, '생크림소보로', '2024-11-09', '입고 완료'),
    (68, 68, 20, 8, '꿀버터바게트', '2024-11-09', '입고 완료'),
    (69, 69, 50, 9, '애플파이', '2024-11-09', '입고 완료'),
    (70, 70, 30, 10, '우유도넛', '2024-11-09', '입고 완료'),
    (71, 71, 20, 11, '찹쌀브레드', '2024-11-09', '입고 완료'),
    (72, 72, 40, 12, '카라멜 러스크', '2024-11-09', '입고 완료'),

    (73, 73, 30, 1, '갈릭꽈베기', '2024-11-10', '입고 완료'),
    (74, 74, 45, 2, '단팥도넛', '2024-11-10', '입고 완료'),
    (75, 75, 20, 3, '고구마케이크빵', '2024-11-10', '입고 완료'),
    (76, 76, 50, 4, '꽈베기', '2024-11-10', '입고 완료'),
    (77, 77, 35, 5, '라우겐', '2024-11-10', '입고 완료'),
    (78, 78, 40, 6, '베이글빵', '2024-11-10', '입고 완료'),

    (81, 81, 45, 9, '애플파이', '2024-11-11', '입고 대기'),
    (82, 82, 30, 10, '우유도넛', '2024-11-11', '입고 대기'),
    (83, 83, 40, 11, '찹쌀브레드', '2024-11-11', '입고 대기'),
    (84, 84, 20, 12, '카라멜 러스크', '2024-11-11', '입고 대기'),
    (85, 85, 50, 1, '갈릭꽈베기', '2024-11-11', '입고 대기'),
    (86, 86, 25, 2, '단팥도넛', '2024-11-11', '입고 대기'),
    (87, 87, 30, 3, '고구마케이크빵', '2024-11-11', '입고 대기'),
    (88, 88, 20, 4, '꽈베기', '2024-11-11', '입고 대기');

-- 20. 매장 재고 (StoreInventory) 테이블 더미 데이터
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

-- 커피 재료 재고 
(NULL, 4, 4000, '2024-10-29 00:00:00'),  -- 물
(NULL, 19, 5000, '2024-10-29 00:00:00'),  -- 우유
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
(NULL, 33, 250, '2024-10-29 00:00:00'); -- 빨대


-- 21. MBOM 테이블 더미 데이터
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
(4, 'Product', NULL, 10, '꽈베기', 20, 'ml', 18, 20 * 18),         -- 올리브오일
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
(7, 'Product', NULL, 16, '생크림소보로', 40, 'g', 20, 40 * 20),     -- 생크림
(7, 'Product', NULL, 19, '생크림소보로', 20, 'ml', 8, 20 * 8),      -- 우유
(7, 'Product', NULL, 30, '생크림소보로', 1, 'ea', 10, 10),          -- 포장지

-- 꿀버터바게트 1085원
(8, 'Product', NULL, 5, '꿀버터바게트', 60, 'g', 1.5, 60 * 1.5),       -- 밀가루
(8, 'Product', NULL, 8, '꿀버터바게트', 10, 'g', 2, 10 * 2),           -- 소금
(8, 'Product', NULL, 9, '꿀버터바게트', 5, 'g', 6, 5 * 6),             -- 시나몬 가루
(8, 'Product', NULL, 11, '꿀버터바게트', 5, 'g', 3, 5 * 3),            -- 이스트
(8, 'Product', NULL, 17, '꿀버터바게트', 20, 'g', 0.5, 20 * 0.5),      -- 설탕
(8, 'Product', NULL, 19, '꿀버터바게트', 20, 'ml', 8, 20 * 8),         -- 우유
(8, 'Product', NULL, 13, '꿀버터바게트', 30, 'ml', 25, 30 * 25),       -- 꿀
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
(12, 'Product', NULL, 21, '카라멜러스크', 10, 'ml', 15, 10 * 15),        -- 카라멜 시럽
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
(1, 'Coffee', 'Regular', 20, '아메리카노', 20, 'g', 20, 20 * 20),       -- 원두(에스프레소)
(1, 'Coffee', 'Regular', 4, '아메리카노', 100, 'ml', 0.2, 100 * 0.2),  -- 물
(1, 'Coffee', 'Regular', 25, '아메리카노', 150, 'ml', 2, 150 * 2),      -- 얼음
(1, 'Coffee', 'Regular', 31, '아메리카노', 1, 'ea', 70, 70),            -- 컵(regular size)

-- 카라멜 마끼야또 1392.5원
(2, 'Coffee', 'Regular', 20, '카라멜 마끼야또', 20, 'g', 20, 20 * 20),       -- 원두(에스프레소)
(2, 'Coffee', 'Regular', 21, '카라멜 마끼야또', 15, 'ml', 1.5, 15 * 1.5),    -- 카라멜 시럽
(2, 'Coffee', 'Regular', 19, '카라멜 마끼야또', 100, 'ml', 3, 100 * 3),      -- 우유
(2, 'Coffee', 'Regular', 25, '카라멜 마끼야또', 150, 'ml', 2, 150 * 2),      -- 얼음
(2, 'Coffee', 'Regular', 31, '카라멜 마끼야또', 1, 'ea', 70, 70),            -- 컵(regular size)

-- 카페라떼 1070원
(3, 'Coffee', 'Regular', 20, '카페라떼', 20, 'g', 20, 20 * 20),            -- 원두(에스프레소)
(3, 'Coffee', 'Regular', 19, '카페라떼', 100, 'ml', 3, 100 * 3),           -- 우유
(3, 'Coffee', 'Regular', 25, '카페라떼', 150, 'ml', 2, 150 * 2),           -- 얼음
(3, 'Coffee', 'Regular', 31, '카페라떼', 1, 'ea', 70, 70),                 -- 컵(regular size)

-- 바닐라라떼 1220원
(4, 'Coffee', 'Regular', 20, '바닐라라떼', 20, 'g', 20, 20 * 20),          -- 원두(에스프레소)
(4, 'Coffee', 'Regular', 19, '바닐라라떼', 100, 'ml', 3, 100 * 3),         -- 우유
(4, 'Coffee', 'Regular', 27, '바닐라라떼', 15, 'ml', 10, 15 * 10),         -- 바닐라 시럽
(4, 'Coffee', 'Regular', 25, '바닐라라떼', 150, 'ml', 2, 150 * 2),         -- 얼음
(4, 'Coffee', 'Regular', 31, '바닐라라떼', 1, 'ea', 70, 70),               -- 컵(regular size)

-- 카푸치노 1070원
(5, 'Coffee', 'Regular', 20, '카푸치노', 20, 'g', 20, 20 * 20),           -- 원두(에스프레소)
(5, 'Coffee', 'Regular', 19, '카푸치노', 100, 'ml', 3, 100 * 3),          -- 우유
(5, 'Coffee', 'Regular', 25, '카푸치노', 150, 'ml', 2, 150 * 2),          -- 얼음
(5, 'Coffee', 'Regular', 31, '카푸치노', 1, 'ea', 70, 70),                -- 컵(regular size)

-- 헤이즐넛라떼 1270원
(6, 'Coffee', 'Regular', 20, '헤이즐넛라떼', 20, 'g', 20, 20 * 20),       -- 원두(에스프레소)
(6, 'Coffee', 'Regular', 19, '헤이즐넛라떼', 100, 'ml', 3, 100 * 3),      -- 우유
(6, 'Coffee', 'Regular', 26, '헤이즐넛라떼', 15, 'ml', 10, 15 * 10),      -- 헤이즐넛 시럽
(6, 'Coffee', 'Regular', 25, '헤이즐넛라떼', 150, 'ml', 2, 150 * 2),      -- 얼음
(6, 'Coffee', 'Regular', 31, '헤이즐넛라떼', 1, 'ea', 70, 70),            -- 컵(regular size)

-- 헤이즐넛아메리카노 970원
(7, 'Coffee', 'Regular', 20, '헤이즐넛아메리카노', 20, 'g', 20, 20 * 20),       -- 원두(에스프레소)
(7, 'Coffee', 'Regular', 26, '헤이즐넛아메리카노', 15, 'ml', 10, 15 * 10),      -- 헤이즐넛 시럽
(7, 'Coffee', 'Regular', 4, '헤이즐넛아메리카노', 100, 'ml', 0.2, 100 * 0.2),   -- 물
(7, 'Coffee', 'Regular', 25, '헤이즐넛아메리카노', 150, 'ml', 2, 150 * 2),      -- 얼음
(7, 'Coffee', 'Regular', 31, '헤이즐넛아메리카노', 1, 'ea', 70, 70),            -- 컵(regular size)

-- 바닐라 아메리카노 1220원
(8, 'Coffee', 'Regular', 20, '바닐라 아메리카노', 20, 'g', 20, 20 * 20),         -- 원두(에스프레소)
(8, 'Coffee', 'Regular', 27, '바닐라 아메리카노', 15, 'ml', 10, 15 * 10),        -- 바닐라 시럽
(8, 'Coffee', 'Regular', 4, '바닐라 아메리카노', 100, 'ml', 0.2, 100 * 0.2),     -- 물
(8, 'Coffee', 'Regular', 25, '바닐라 아메리카노', 150, 'ml', 2, 150 * 2),        -- 얼음
(8, 'Coffee', 'Regular', 31, '바닐라 아메리카노', 1, 'ea', 70, 70),              -- 컵(regular size)

-- 콜드브루라떼 1630원
(10, 'Coffee', 'Regular', 23, '콜드브루라떼', 20, 'g', 20, 20 * 20),             -- 콜드브루 원액
(10, 'Coffee', 'Regular', 19, '콜드브루라떼', 100, 'ml', 3, 100 * 3),            -- 우유
(10, 'Coffee', 'Regular', 25, '콜드브루라떼', 150, 'ml', 2, 150 * 2),            -- 얼음
(10, 'Coffee', 'Regular', 31, '콜드브루라떼', 1, 'ea', 70, 70),                  -- 컵(regular size)

-- 헤이즐넛라떼(핫) 1370원
(11, 'Coffee', 'Regular', 20, '헤이즐넛라떼핫', 20, 'g', 20, 20 * 20),             -- 원두(에스프레소)
(11, 'Coffee', 'Regular', 26, '헤이즐넛라떼핫', 15, 'ml', 10, 15 * 10),            -- 헤이즐넛 시럽
(11, 'Coffee', 'Regular', 19, '헤이즐넛라떼핫', 100, 'ml', 3, 100 * 3),            -- 우유
(11, 'Coffee', 'Regular', 31, '헤이즐넛라떼핫', 1, 'ea', 70, 70),                  -- 컵(regular size)

-- 헤이즐넛아메리카노(핫) 970원
(12, 'Coffee', 'Regular', 20, '헤이즐넛아메리카노핫', 20, 'g', 20, 20 * 20),       -- 원두(에스프레소)
(12, 'Coffee', 'Regular', 26, '헤이즐넛아메리카노핫', 15, 'ml', 10, 15 * 10),      -- 헤이즐넛 시럽
(12, 'Coffee', 'Regular', 4, '헤이즐넛아메리카노핫', 100, 'ml', 0.2, 100 * 0.2),   -- 물
(12, 'Coffee', 'Regular', 31, '헤이즐넛아메리카노핫', 1, 'ea', 70, 70),            -- 컵(regular size)

-- 연유라떼 1470원
(13, 'Coffee', 'Regular', 20, '연유라떼', 20, 'g', 20, 20 * 20),                -- 원두(에스프레소)
(13, 'Coffee', 'Regular', 25, '연유라떼', 150, 'ml', 2, 150 * 2),               -- 얼음
(13, 'Coffee', 'Regular', 19, '연유라떼', 100, 'ml', 3, 100 * 3),               -- 우유
(13, 'Coffee', 'Regular', 24, '연유라떼', 20, 'g', 2, 20 * 2),                  -- 연유
(13, 'Coffee', 'Regular', 31, '연유라떼', 1, 'ea', 70, 70),                     -- 컵(regular size)

-- 에스프레소(레귤러) 470원
(14, 'Coffee', 'Regular', 20, '에스프레소', 20, 'g', 20, 20 * 20),      -- 원두(에스프레소)
(14, 'Coffee', 'Regular', 31, '에스프레소', 1, 'ea', 70, 70),           -- 컵(regular size)


-- 엑스트라-----------------------------------------------------------------------
-- 아메리카노 1210원
(1, 'Coffee', 'Extra', 20, '아메리카노(엑스트라)', 30, 'g', 20, 30 * 20),       -- 원두(에스프레소)
(1, 'Coffee', 'Extra', 4, '아메리카노(엑스트라)', 150, 'ml', 0.2, 150 * 0.2),   -- 물
(1, 'Coffee', 'Extra', 25, '아메리카노(엑스트라)', 250, 'ml', 2, 250 * 2),      -- 얼음
(1, 'Coffee', 'Extra', 32, '아메리카노(엑스트라)', 1, 'ea', 80, 80),            -- 컵(extra size)

-- 카라멜 마끼야또 1660원
(2, 'Coffee', 'Extra', 20, '카라멜 마끼야또(엑스트라)', 30, 'g', 20, 30 * 20),    -- 원두(에스프레소)
(2, 'Coffee', 'Extra', 21, '카라멜 마끼야또(엑스트라)', 20, 'ml', 1.5, 20 * 1.5), -- 카라멜 시럽
(2, 'Coffee', 'Extra', 19, '카라멜 마끼야또(엑스트라)', 150, 'ml', 3, 150 * 3),   -- 우유
(2, 'Coffee', 'Extra', 25, '카라멜 마끼야또(엑스트라)', 250, 'ml', 2, 250 * 2),   -- 얼음
(2, 'Coffee', 'Extra', 32, '카라멜 마끼야또(엑스트라)', 1, 'ea', 80, 80),         -- 컵(extra size)

-- 카페라떼 1630원
(3, 'Coffee', 'Extra', 20, '카페라떼(엑스트라)', 30, 'g', 20, 30 * 20),         -- 원두(에스프레소)
(3, 'Coffee', 'Extra', 19, '카페라떼(엑스트라)', 150, 'ml', 3, 150 * 3),        -- 우유
(3, 'Coffee', 'Extra', 25, '카페라떼(엑스트라)', 250, 'ml', 2, 250 * 2),        -- 얼음
(3, 'Coffee', 'Extra', 32, '카페라떼(엑스트라)', 1, 'ea', 80, 80),              -- 컵(extra size)

-- 바닐라라떼 1830원
(4, 'Coffee', 'Extra', 20, '바닐라라떼(엑스트라)', 30, 'g', 20, 30 * 20),       -- 원두(에스프레소)
(4, 'Coffee', 'Extra', 19, '바닐라라떼(엑스트라)', 150, 'ml', 3, 150 * 3),      -- 우유
(4, 'Coffee', 'Extra', 27, '바닐라라떼(엑스트라)', 20, 'ml', 10, 20 * 10),      -- 바닐라 시럽
(4, 'Coffee', 'Extra', 25, '바닐라라떼(엑스트라)', 250, 'ml', 2, 250 * 2),      -- 얼음
(4, 'Coffee', 'Extra', 32, '바닐라라떼(엑스트라)', 1, 'ea', 80, 80),            -- 컵(extra size)

-- 카푸치노 1630원
(5, 'Coffee', 'Extra', 20, '카푸치노(엑스트라)', 30, 'g', 20, 30 * 20),         -- 원두(에스프레소)
(5, 'Coffee', 'Extra', 19, '카푸치노(엑스트라)', 150, 'ml', 3, 150 * 3),        -- 우유
(5, 'Coffee', 'Extra', 25, '카푸치노(엑스트라)', 250, 'ml', 2, 250 * 2),        -- 얼음
(5, 'Coffee', 'Extra', 32, '카푸치노(엑스트라)', 1, 'ea', 80, 80),              -- 컵(extra size)

-- 헤이즐넛라떼 1830원
(6, 'Coffee', 'Extra', 20, '헤이즐넛라떼(엑스트라)', 30, 'g', 20, 30 * 20),     -- 원두(에스프레소)
(6, 'Coffee', 'Extra', 19, '헤이즐넛라떼(엑스트라)', 150, 'ml', 3, 150 * 3),    -- 우유
(6, 'Coffee', 'Extra', 26, '헤이즐넛라떼(엑스트라)', 20, 'ml', 10, 20 * 10),    -- 헤이즐넛 시럽
(6, 'Coffee', 'Extra', 25, '헤이즐넛라떼(엑스트라)', 250, 'ml', 2, 250 * 2),    -- 얼음
(6, 'Coffee', 'Extra', 32, '헤이즐넛라떼(엑스트라)', 1, 'ea', 80, 80),          -- 컵(extra size)

-- 헤이즐넛아메리카노(엑스트라) 910원
(7, 'Coffee', 'Extra', 20, '헤이즐넛아메리카노(엑스트라)', 30, 'g', 20, 30 * 20),       -- 원두(에스프레소)
(7, 'Coffee', 'Extra', 26, '헤이즐넛아메리카노(엑스트라)', 20, 'ml', 10, 20 * 10),     -- 헤이즐넛 시럽
(7, 'Coffee', 'Extra', 4, '헤이즐넛아메리카노(엑스트라)', 150, 'ml', 0.2, 150 * 0.2),   -- 물
(7, 'Coffee', 'Extra', 25, '헤이즐넛아메리카노(엑스트라)', 250, 'ml', 2, 250 * 2),    -- 얼음
(7, 'Coffee', 'Extra', 32, '헤이즐넛아메리카노(엑스트라)', 1, 'ea', 80, 80),           -- 컵(extra size)

-- 바닐라 아메리카노 1410원
(8, 'Coffee', 'Extra', 20, '바닐라 아메리카노(엑스트라)', 30, 'g', 20, 30 * 20),         -- 원두(에스프레소)
(8, 'Coffee', 'Extra', 27, '바닐라 아메리카노(엑스트라)', 20, 'ml', 10, 20 * 10),       -- 바닐라 시럽
(8, 'Coffee', 'Extra', 4, '바닐라 아메리카노(엑스트라)', 150, 'ml', 0.2, 150 * 0.2),     -- 물
(8, 'Coffee', 'Extra', 25, '바닐라 아메리카노(엑스트라)', 250, 'ml', 2, 250 * 2),       -- 얼음
(8, 'Coffee', 'Extra', 32, '바닐라 아메리카노(엑스트라)', 1, 'ea', 80, 80),             -- 컵(extra size)

-- 콜드브루라떼(엑스트라) 1630원
(10, 'Coffee', 'Extra', 23, '콜드브루라떼(엑스트라)', 30, 'g', 20, 30 * 20),            -- 콜드브루 원액
(10, 'Coffee', 'Extra', 19, '콜드브루라떼(엑스트라)', 150, 'ml', 3, 150 * 3),           -- 우유
(10, 'Coffee', 'Extra', 25, '콜드브루라떼(엑스트라)', 250, 'ml', 2, 250 * 2),           -- 얼음
(10, 'Coffee', 'Extra', 32, '콜드브루라떼(엑스트라)', 1, 'ea', 80, 80),                 -- 컵(extra size)

-- 헤이즐넛라떼(핫, 엑스트라) 1330원
(11, 'Coffee', 'Extra', 20, '헤이즐넛라떼핫(엑스트라)', 30, 'g', 20, 30 * 20),            -- 원두(에스프레소)
(11, 'Coffee', 'Extra', 26, '헤이즐넛라떼핫(엑스트라)', 20, 'ml', 10, 20 * 10),           -- 헤이즐넛 시럽
(11, 'Coffee', 'Extra', 19, '헤이즐넛라떼핫(엑스트라)', 150, 'ml', 3, 150 * 3),           -- 우유
(11, 'Coffee', 'Extra', 32, '헤이즐넛라떼핫(엑스트라)', 1, 'ea', 80, 80),                 -- 컵(extra size)

-- 헤이즐넛아메리카노(핫, 엑스트라) 910원
(12, 'Coffee', 'Extra', 20, '헤이즐넛아메리카노핫(엑스트라)', 30, 'g', 20, 30 * 20),       -- 원두(에스프레소)
(12, 'Coffee', 'Extra', 26, '헤이즐넛아메리카노핫(엑스트라)', 20, 'ml', 10, 20 * 10),     -- 헤이즐넛 시럽
(12, 'Coffee', 'Extra', 4, '헤이즐넛아메리카노핫(엑스트라)', 150, 'ml', 0.2, 150 * 0.2),   -- 물
(12, 'Coffee', 'Extra', 32, '헤이즐넛아메리카노핫(엑스트라)', 1, 'ea', 80, 80),           -- 컵(extra size)

-- 연유라떼(엑스트라) 1690원
(13, 'Coffee', 'Extra', 20, '연유라떼(엑스트라)', 30, 'g', 20, 30 * 20),               -- 원두(에스프레소)
(13, 'Coffee', 'Extra', 25, '연유라떼(엑스트라)', 250, 'ml', 2, 250 * 2),              -- 얼음
(13, 'Coffee', 'Extra', 19, '연유라떼(엑스트라)', 150, 'ml', 3, 150 * 3),              -- 우유
(13, 'Coffee', 'Extra', 24, '연유라떼(엑스트라)', 30, 'g', 2, 30 * 2),                 -- 연유
(13, 'Coffee', 'Extra', 32, '연유라떼(엑스트라)', 1, 'ea', 80, 80),                   -- 컵(extra size)

-- 에스프레소(엑스트라) 680원
(14, 'Coffee', 'Extra', 20, '에스프레소(엑스트라)', 20, 'g', 30, 30 * 20),      -- 원두(에스프레소)
(14, 'Coffee', 'Extra', 31, '에스프레소(엑스트라)', 1, 'ea', 80, 80);           -- 컵(extra size)
-- 22. ProductMaterials
INSERT INTO ProductMaterials (ProductID, MaterialID, Quantity)
VALUES 
    (1, 5, 50),  -- 갈릭꽈베기 - 밀가루
    (2, 5, 60),  -- 단팥도넛 - 밀가루
    (3, 2, 30),  -- 고구마케이크빵 - 고구마필링
    (4, 5, 30);  -- 꽈베기 - 밀가루

-- 23. 사용자 (Users) 테이블 더미 데이터
INSERT INTO ERP.Users (Name, PhoneNumber, Email, Username, Password)
VALUES
('박민수', '010-5555-6666', 'minsoo@example.com', 'minsoo', 'pass9101');

-- 24. 커피 재료 테이블 더미 데이터
INSERT INTO ERP.coffee_materials (CoffeeID, MaterialID, RawMaterialQuantity)
VALUES
(1, 1, 50),  -- 아메리카노에 자재 1번 사용, 50 단위
(2, 2, 30),  -- 카라멜 마끼야또에 자재 2번 사용, 30 단위
(3, 3, 20);  -- 카페라떼에 자재 3번 사용, 20 단위

-- 25 유저 스탬프 더미 데이터
INSERT INTO UserStamp (phone, stamp, coupon) VALUES
('01012345678', 5, 1),
('01023456789', 9, 2),
('01034567890', 8, 1),
('01045678901', 2, 4),
('01056789012', 3, 0);

-- 주문 내역
INSERT INTO OrderHistory (Category, ProductID, MaterialID, ProductName, Quantity, Unit, OrderType, OrderStatus, OrderDate, CompletedDate)
VALUES
('빵', 1, NULL, '갈릭꽈베기', 50, '개', '수동입력', '처리 완료', '2024-11-01 09:00:00', '2024-11-02 14:30:00'),
('커피', NULL, 20, '원두(에스프레소)', 5000, 'g', '수동입력', '처리 완료', '2024-11-02 10:15:00', '2024-11-03 11:45:00'),
('빵', 3, NULL, '고구마케이크빵', 30, '개', '수동입력', '처리 완료', '2024-11-03 08:30:00', '2024-11-04 13:20:00'),
('부자재', NULL, 31, '컵(regular size)', 1000, '개', '수동입력', '처리 완료', '2024-11-04 11:45:00', '2024-11-05 16:00:00'),
('빵', 5, NULL, '라우겐', 40, '개', '수동입력', '처리 완료', '2024-11-05 09:30:00', '2024-11-06 15:15:00'),
('커피', NULL, 21, '카라멜시럽', 2000, 'ml', '수동입력', '미처리', '2024-11-06 10:00:00', NULL),
('빵', 2, NULL, '단팥도넛', 60, '개', '수동입력', '미처리', '2024-11-07 08:45:00', NULL),
('부자재', NULL, 33, '빨대', 5000, '개', '수동입력', '미처리', '2024-11-08 11:30:00', NULL),
('빵', 4, NULL, '꽈베기', 45, '개', '수동입력', '미처리', '2024-11-09 09:15:00', NULL),
('커피', NULL, 27, '바닐라 시럽', 1500, 'ml', '수동입력', '미처리', '2024-11-10 10:30:00', NULL),
('빵', 6, NULL, '베이글빵', 35, '개', '수동입력', '미처리', '2024-11-11 08:00:00', NULL),
('부자재', NULL, 32, '컵(extra size)', 800, '개', '수동입력', '미처리', '2024-11-12 13:45:00', NULL),
('커피', NULL, 23, '콜드브루 원액', 3000, 'ml', '수동입력', '미처리', '2024-11-13 09:30:00', NULL),
('빵', 8, NULL, '꿀버터바게트', 25, '개', '수동입력', '미처리', '2024-11-14 11:15:00', NULL),
('부자재', NULL, 30, '포장지', 2000, '개', '수동입력', '미처리', '2024-11-15 14:00:00', NULL);

-- 1. 제품 조회
SELECT * FROM ERP.Product;

-- 2. 공급업체 조회
SELECT * FROM ERP.Suppliers;

-- 3. 원자재 재고 조회
SELECT * FROM ERP.MaterialsInventory;

-- 4. 원자재 입고 이력 조회
SELECT * FROM ERP.RawMaterialRestockHistory;

-- 5. 원자재 소비 내역 조회
SELECT * FROM ERP.ProductionConsumption;

-- 6. 공장 재고 조회
SELECT * FROM ERP.FactoryInventory;

-- 7. 폐기 기록 조회
SELECT * FROM ERP.DisposedRecords;

-- 8. 매장 커피 종류 조회
SELECT * FROM ERP.Coffee;

-- 9. 커피부가옵션 조회
SELECT * FROM ERP.CoffeeOptions;

-- 10. 판매 기록 조회
SELECT * FROM ERP.SalesRecords;

-- 11. 판매 세부 기록 조회
SELECT * FROM ERP.SalesDetails;

-- 12. 커피 판매 세부 기록 조회
SELECT * FROM ERP.CoffeeOptionSalesDetails;

-- 13. 작업 지시 조회
SELECT * FROM ERP.WorkOrders;

-- 14. 생산 계획 조회
SELECT * FROM ERP.ProductionPlanning;

-- 15. 생산 모니터링 조회
SELECT * FROM ERP.ProductionMonitoring;

-- 16. 생산 공정 상태 조회
SELECT * FROM ProductionProcessStatus;

-- 17. 품질 관리 조회
SELECT * FROM QualityControl;

-- 18. 생산 입고 조회
SELECT * FROM ProductionEntry;

-- 19. 매장 재고 조회
SELECT * FROM ERP.StoreInventory;

-- 20. MBOM 조회
SELECT * FROM ERP.MBOM;

-- 21. 제품-원자재 관계 조회
SELECT * FROM ProductMaterials;

-- 22. 사용자 조회
SELECT * FROM ERP.Users;

-- 23. 커피 재료 조회
SELECT * FROM ERP.coffee_materials;

-- 24. 유저 스탬프 데이터 조회
SELECT * FROM UserStamp;

-- 26. 주문 내역 조회
SELECT * FROM orderhistory;


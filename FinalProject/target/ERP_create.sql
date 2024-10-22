


DROP TABLE IF EXISTS ERP.coffee_materials;
DROP TABLE IF EXISTS ERP.Users;
DROP TABLE IF EXISTS ERP.MBOM;
DROP TABLE IF EXISTS ERP.StoreInventory;
DROP TABLE IF EXISTS ERP.QualityControl;
DROP TABLE IF EXISTS ERP.ProductionEntry;
DROP TABLE IF EXISTS ERP.ProductionMonitoring;
DROP TABLE IF EXISTS ERP.ProductionPlanning;
DROP TABLE IF EXISTS ERP.WorkOrders;
DROP TABLE IF EXISTS ERP.SalesRecords;
DROP TABLE IF EXISTS ERP.StoreCoffeeTypes;
DROP TABLE IF EXISTS ERP.DisposedRecords;
DROP TABLE IF EXISTS ERP.FactoryInventory;
DROP TABLE IF EXISTS ERP.ProductionConsumption;
DROP TABLE IF EXISTS ERP.RawMaterialRestockHistory;
DROP TABLE IF EXISTS ERP.MaterialsInventory;
DROP TABLE IF EXISTS ERP.Suppliers;
DROP TABLE IF EXISTS ERP.Product;

DROP SCHEMA IF EXISTS ERP;

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
    UnitPrice INT NULL, -- 단가
    LastUpdated DATETIME NULL, -- 최종 업데이트
    PRIMARY KEY (MaterialID),
    FOREIGN KEY (SupplierID) REFERENCES ERP.Suppliers(SupplierID)
);

-- 4. 원자재 재입고 이력 (RawMaterialRestockHistory)
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

-- 5. 생산 소비 (ProductionConsumption)
CREATE TABLE ERP.ProductionConsumption (
    ConsumptionID INT NOT NULL AUTO_INCREMENT, -- 소비ID
    MaterialID INT NOT NULL, -- 자재ID
    QuantityUsed INT NULL, -- 사용된 수량
    ProductionDate DATETIME NULL, -- 생산 날짜
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

-- 8. 판매 기록 (SalesRecords)
CREATE TABLE ERP.SalesRecords (
    SaleID INT NOT NULL AUTO_INCREMENT, -- 판매ID
    ProductID INT NOT NULL, -- 제품ID
    CoffeeID INT NOT NULL, -- 커피ID
    ProductName VARCHAR(100) NULL, -- 제품명
    QuantitySold INT NULL, -- 판매된 수량
    SalePrice INT NULL, -- 판매가
    SaleDate DATETIME NULL, -- 판매 날짜
    PaymentType VARCHAR(50) NULL, -- 결제 유형
    PRIMARY KEY (SaleID, ProductID, CoffeeID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID)
);

-- 9. 매장 커피 종류 (StoreCoffeeTypes)
CREATE TABLE ERP.Coffee (
    CoffeeID INT NOT NULL AUTO_INCREMENT, -- 커피ID
    CoffeeName VARCHAR(50) NULL, -- 커피 이름
    SalePrice INT NULL, -- 판매가
    CoffeeImage VARCHAR(200) NULL, -- 커피 이미지
	Recommend varchar(30) check (Recommend in ('Y','N')), -- 제품 추천여부(키오스크용)
    Temperature varchar(30) check (Temperature in ('ICE','HOT')), -- 제품 온도(ICE 이거나 HOT이거나)
	DetailDescription varchar(300) NULL, -- 제품 설명(키오스크용)
    PRIMARY KEY (CoffeeID)
);

-- 10. 작업 지시 (WorkOrders)
CREATE TABLE ERP.WorkOrders (
    OrderID INT NOT NULL AUTO_INCREMENT, -- 작업 지시ID
    ProductID INT NOT NULL, -- 제품ID
    Quantity INT NULL, -- 수량
    StartDate DATE NULL, -- 시작 날짜
    EndDate DATE NULL, -- 종료 날짜
    Status VARCHAR(50) NULL, -- 상태
    Priority VARCHAR(50) NULL, -- 우선순위
    PRIMARY KEY (OrderID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID)
);

-- 11. 생산 계획 (ProductionPlanning)
CREATE TABLE ERP.ProductionPlanning (
    PlanID INT NOT NULL AUTO_INCREMENT, -- 계획ID
    OrderID INT NOT NULL, -- 작업 지시ID
    ProductID INT NOT NULL, -- 제품ID
    RequiredDate DATE NULL, -- 필요 날짜
    MaterialsNeeded INT NULL, -- 필요 자재
    StartDate DATE NULL, -- 시작 날짜
    EndDate DATE NULL, -- 종료 날짜
    PRIMARY KEY (PlanID),
    FOREIGN KEY (OrderID) REFERENCES ERP.WorkOrders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID)
);

-- 12. 생산 모니터링 (ProductionMonitoring)
CREATE TABLE ERP.ProductionMonitoring (
    MonitorID INT NOT NULL AUTO_INCREMENT, -- 모니터링ID
    OrderID INT NOT NULL, -- 작업 지시ID
    Temperature FLOAT NULL, -- 온도
    Humidity FLOAT NULL, -- 습도
    ProductionRate INT NULL, -- 생산률
    OperationTime INT NULL, -- 작업 시간
    PRIMARY KEY (MonitorID),
    FOREIGN KEY (OrderID) REFERENCES ERP.WorkOrders(OrderID)
);

-- 13. 생산 입력 (ProductionEntry)
CREATE TABLE ERP.ProductionEntry (
    EntryID INT NOT NULL AUTO_INCREMENT, -- 입력ID
    OrderID INT NOT NULL, -- 작업 지시ID
    ProductID INT NOT NULL, -- 제품ID
    Quantity INT NULL, -- 수량
    EntryDate DATE NULL, -- 입력 날짜
    PRIMARY KEY (EntryID),
    FOREIGN KEY (OrderID) REFERENCES ERP.WorkOrders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID)
);

-- 14. 품질 관리 (QualityControl)
CREATE TABLE ERP.QualityControl (
    QCID INT NOT NULL AUTO_INCREMENT, -- 품질관리ID
    EntryID INT NOT NULL, -- 입력ID
    ProductID INT NOT NULL, -- 제품ID
    TestResult VARCHAR(50) NULL, -- 테스트 결과
    TestDate DATETIME NULL, -- 테스트 날짜
    DefectRate INT DEFAULT 0 NULL, -- 불량률
    PRIMARY KEY (QCID),
    FOREIGN KEY (EntryID) REFERENCES ERP.ProductionEntry(EntryID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID)
);

-- 15. 매장 재고 (StoreInventory)

CREATE TABLE ERP.StoreInventory (
    StoreInventoryID INT NOT NULL AUTO_INCREMENT, -- 매장 재고ID
    ProductID INT NOT NULL, -- 제품ID
    MaterialID INT NOT NULL, -- 자재ID
    SaleID INT NOT NULL, -- 판매ID
    DisposalID INT NOT NULL, -- 폐기ID
    QuantityInStore INT NOT NULL, -- 매장 내 수량
    StoreDate DATETIME NOT NULL, -- 매장 날짜
    PRIMARY KEY (StoreInventoryID, ProductID, MaterialID, SaleID, DisposalID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID),
    FOREIGN KEY (SaleID) REFERENCES ERP.SalesRecords(SaleID),
    FOREIGN KEY (DisposalID) REFERENCES ERP.DisposedRecords(DisposalID)
);


-- 16. MBOM (MBOM)

CREATE TABLE ERP.MBOM (
    BOMID INT NOT NULL AUTO_INCREMENT, -- BOMID
    ProductID INT NOT NULL, -- 제품ID
    MaterialID INT NOT NULL, -- 자재ID
    ProductName VARCHAR(100) NOT NULL, -- 제품명 (참고용 필드, 외래 키로 사용 안 함)
    Quantity INT NOT NULL, -- 수량
    Unit VARCHAR(50) NOT NULL, -- 단위
    ProductionProcess VARCHAR(50) NOT NULL, -- 생산 공정
    PRIMARY KEY (BOMID, ProductID, MaterialID), -- ProductName을 PRIMARY KEY에서 제외
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID), -- ProductID만 외래 키로 설정
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);


-- 17. 사용자 (Users)
CREATE TABLE ERP.Users (
    UserID INT NOT NULL AUTO_INCREMENT,-- 사용자ID
    Name VARCHAR(30) NULL, -- 이름
    PhoneNumber VARCHAR(30) NULL, -- 전화번호
    Email VARCHAR(30) NULL, -- 이메일
    Username VARCHAR(30) NULL, -- 사용자 이름
    Password VARCHAR(30) NULL, -- 비밀번호
    PRIMARY KEY (UserID)
);

-- 18. ERP.coffee_materials (커피 재료)
CREATE TABLE ERP.coffee_materials (
    CoffeeMaterialID INT NOT NULL AUTO_INCREMENT,-- 커피 재료ID
    CoffeeID INT NOT NULL, -- 커피ID
    MaterialID INT NOT NULL, -- 자재ID
    RawMaterialQuantity INT NULL, -- 원재료 수량
    PRIMARY KEY (CoffeeMaterialID, CoffeeID, MaterialID),
    FOREIGN KEY (CoffeeID) REFERENCES ERP.Coffee(CoffeeID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);

-- 상품 insert문
INSERT INTO ERP.Product (ProductName, ProductCategory, UnitPrice, SalePrice, ProductionDate, ProductImage, Recommend, DetailDescription)
VALUES ('갈릭꽈베기', 'bread', 2000, 3500, '2024-01-01', '/images/bread/갈릭꽈배기.jpg', 'Y', '결결이 바삭한 식감의 패스트리에 알싸한 남해 마늘의 진한 맛과 향이 더해진 간식형 제품');
INSERT INTO ERP.Product (ProductName, ProductCategory, UnitPrice, SalePrice, ProductionDate, ProductImage, Recommend, DetailDescription)
VALUES ('단팥도넛', 'bread', 2500, 3700, '2024-01-01', '/images/bread/단팥도넛.jpg', 'N', '달콤한 팥 앙금이 가득한 부드러운 도넛으로 전통과 현대의 맛이 조화로운 디저트');
INSERT INTO ERP.Product (ProductName, ProductCategory, UnitPrice, SalePrice, ProductionDate, ProductImage, Recommend, DetailDescription)
VALUES ('고구마케이크빵', 'bread', 1800, 3000, '2024-01-01', '/images/bread/고구마케이크빵.jpg', 'Y', '부드러운 빵 속에 달콤한 고구마 필링이 가득한 케이크 스타일의 빵');
INSERT INTO ERP.Product (ProductName, ProductCategory, UnitPrice, SalePrice, ProductionDate, ProductImage, Recommend, DetailDescription)
VALUES ('꽈베기', 'bread', 2000, 2500, '2024-01-01', '/images/bread/꽈베기.jpg', 'N', '쫄깃한 식감과 달콤한 맛이 일품인 전통적인 꽈배기');
INSERT INTO ERP.Product (ProductName, ProductCategory, UnitPrice, SalePrice, ProductionDate, ProductImage, Recommend, DetailDescription)
VALUES ('라우겐', 'bread', 2400, 4000, '2024-01-01', '/images/bread/라우겐.jpg', 'Y', '독일식 프레첼 빵으로, 짭짤하고 쫄깃한 식감이 특징인 빵');
INSERT INTO ERP.Product (ProductName, ProductCategory, UnitPrice, SalePrice, ProductionDate, ProductImage, Recommend, DetailDescription)
VALUES ('베이글빵', 'bread', 2000, 3800, '2024-01-01', '/images/bread/베이글빵.jpg', 'Y', '쫄깃한 식감과 부드러운 맛이 일품인 클래식한 베이글');
INSERT INTO ERP.Product (ProductName, ProductCategory, UnitPrice, SalePrice, ProductionDate, ProductImage, Recommend, DetailDescription)
VALUES ('생크림소보로', 'bread', 2000, 3800, '2024-01-01', '/images/bread/생크림소보로.jpg', 'Y', '부드러운 생크림과 바삭한 소보로의 조화가 매력적인 달콤한 빵');
INSERT INTO ERP.Product (ProductName, ProductCategory, UnitPrice, SalePrice, ProductionDate, ProductImage, Recommend, DetailDescription)
VALUES ('꿀버터바게트', 'bread', 2000, 3800, '2024-01-01', '/images/bread/꿀버터바게트.jpg', 'N', '바삭한 바게트에 꿀과 버터가 스며들어 고소하고 달콤한 맛이 돋보이는 빵');

-- 커피 insert문
INSERT INTO ERP.Coffee (CoffeeID, CoffeeName, SalePrice, CoffeeImage, Recommend, Temperature, DetailDescription)
VALUES 
(1, '아메리카노', 3200, '/images/coffee/아메리카노ice.jpg', 'Y', 'ICE', '진한 에스프레소에 차가운 물을 더해 시원하고 깔끔한 맛을 느낄 수 있는 아이스 커피'),
(2, '카라멜 마끼야또', 3000, '/images/coffee/마끼야또ice.jpg', 'Y', 'ICE', '카라멜 시럽의 달콤함과 에스프레소의 진한 맛이 조화롭게 어우러진 아이스 커피'),
(3, '카페라떼', 3500, '/images/coffee/카페라떼ice.jpg', 'N', 'ICE', '에스프레소와 우유가 조화롭게 어우러진 부드러운 맛의 아이스 커피'),
(4, '바닐라라떼', 3800, '/images/coffee/바닐라라떼hot.jpg', 'Y', 'HOT', '바닐라 시럽의 달콤함과 에스프레소, 우유가 조화롭게 어우러진 따뜻한 커피'),
(5, '카푸치노', 3500, '/images/coffee/카푸치노hot.jpg', 'N', 'HOT', '에스프레소와 스팀 밀크, 우유 거품이 1:1:1 비율로 어우러진 클래식한 이탈리안 커피'),
(6, '헤이즐넛라떼', 3800, '/images/coffee/헤이즐넛라떼ice.jpg', 'Y', 'ICE', '헤이즐넛 시럽의 고소한 향과 에스프레소, 우유가 조화롭게 어우러진 시원한 라떼'),
(7, '헤이즐넛아메리카노', 3500, '/images/coffee/헤이즐넛아메리카노ice.jpg', 'N', 'ICE', '헤이즐넛 시럽의 고소함과 에스프레소의 깔끔한 맛이 어우러진 시원한 아메리카노'),
(8, '바닐라아메리카노', 3500, '/images/coffee/바닐라아메리카노ice.jpg', 'Y', 'ICE', '바닐라 시럽의 달콤함과 에스프레소의 깊은 맛이 조화를 이루는 시원한 아메리카노'),
(9, '카페모카', 4000, '/images/coffee/카페모카hot.jpg', 'Y', 'HOT', '초콜릿의 달콤함과 에스프레소의 쌉쌀함이 어우러진 따뜻한 모카 커피'),
(10, '콜드브루라떼', 4200, '/images/coffee/콜드브루라떼hot.jpg', 'N', 'HOT', '차갑게 추출한 콜드브루 커피에 따뜻한 우유를 더해 부드러운 맛을 즐길 수 있는 라떼'),
(11, '헤이즐넛라떼', 3800, '/images/coffee/헤이즐넛라떼hot.jpg', 'Y', 'HOT', '헤이즐넛 시럽의 고소한 향과 에스프레소, 스팀 밀크가 어우러진 따뜻한 라떼'),
(12, '헤이즐넛아메리카노', 3500, '/images/coffee/헤이즐넛아메리카노hot.jpg', 'N', 'HOT', '헤이즐넛 시럽의 고소함과 에스프레소의 깊은 맛이 어우러진 따뜻한 아메리카노'),
(13, '연유라떼', 4000, '/images/coffee/연유라떼ice.jpg', 'Y', 'ICE', '달콤한 연유와 에스프레소, 차가운 우유가 조화롭게 어우러진 시원한 라떼'),
(14, '에스프레소', 2500, '/images/coffee/에스프레소hot.jpg', 'N', 'HOT', '진한 커피의 맛과 향을 온전히 즐길 수 있는 에스프레소 샷');




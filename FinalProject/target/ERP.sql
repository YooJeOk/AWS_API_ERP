@ -0,0 +1,225 @@
CREATE SCHEMA ERP;
USE ERP;

-- 1. 제품 (Product)
CREATE TABLE ERP.Product (
    ProductID INT NOT NULL, -- 제품ID
    ProductName VARCHAR(100) NULL, -- 제품명
    ProductCategory VARCHAR(50) NULL, -- 제품 카테고리
    UnitPrice INT NULL, -- 단가
    SalePrice INT NULL, -- 판매가
    ProductionDate DATETIME NULL, -- 생산 날짜
    ProductImage VARCHAR(2500) NULL, -- 제품 이미지
    PRIMARY KEY (ProductID)
);

-- 2. 공급업체 (Suppliers)
CREATE TABLE ERP.Suppliers (
    SupplierID INT NOT NULL, -- 공급업체ID
    SupplierName VARCHAR(100) NULL, -- 공급업체명
    ContactInfo VARCHAR(100) NULL, -- 연락처 정보
    Address VARCHAR(200) NULL, -- 주소
    SupplierType VARCHAR(50) NULL, -- 공급업체 유형
    RegistrationDate DATETIME NULL, -- 등록 날짜
    PRIMARY KEY (SupplierID)
);

-- 3. 원자재 재고 (MaterialsInventory)
CREATE TABLE ERP.MaterialsInventory (
    MaterialID INT NOT NULL, -- 자재ID
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
    RestockID INT NOT NULL, -- 재입고ID
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
    ConsumptionID INT NOT NULL, -- 소비ID
    MaterialID INT NOT NULL, -- 자재ID
    QuantityUsed INT NULL, -- 사용된 수량
    ProductionDate DATETIME NULL, -- 생산 날짜
    PRIMARY KEY (ConsumptionID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);

-- 6. 공장 재고 (FactoryInventory)
CREATE TABLE ERP.FactoryInventory (
    FactoryInventoryID INT NOT NULL, -- 공장 재고ID
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
    DisposalID INT NOT NULL, -- 폐기ID
    ProductID INT NOT NULL, -- 제품ID
    QuantityDisposed INT NULL, -- 폐기된 수량
    DisposalDate DATETIME NULL, -- 폐기 날짜
    DisposalReason VARCHAR(255) NULL, -- 폐기 이유
    PRIMARY KEY (DisposalID),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID)
);

-- 8. 판매 기록 (SalesRecords)
CREATE TABLE ERP.SalesRecords (
    SaleID INT NOT NULL, -- 판매ID
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
CREATE TABLE ERP.StoreCoffeeTypes (
    CoffeeID INT NOT NULL, -- 커피ID
    CoffeeName VARCHAR(50) NULL, -- 커피 이름
    SalePrice INT NULL, -- 판매가
    CoffeeImage VARCHAR(200) NULL, -- 커피 이미지
    PRIMARY KEY (CoffeeID)
);

-- 10. 작업 지시 (WorkOrders)
CREATE TABLE ERP.WorkOrders (
    OrderID INT NOT NULL, -- 작업 지시ID
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
    PlanID INT NOT NULL, -- 계획ID
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
    MonitorID INT NOT NULL, -- 모니터링ID
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
    EntryID INT NOT NULL, -- 입력ID
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
    QCID INT NOT NULL, -- 품질관리ID
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
    StoreInventoryID INT NOT NULL, -- 매장 재고ID
    ProductID INT NOT NULL, -- 제품ID
    MaterialID INT NOT NULL, -- 자재ID
    SaleID INT NOT NULL, -- 판매ID
    DisposalID INT NOT NULL, -- 폐기ID
    ProductName VARCHAR(100) NULL, -- 제품명
    QuantityInStore INT NULL, -- 매장 내 수량
    StoreDate DATETIME NULL, -- 매장 날짜
    PRIMARY KEY (StoreInventoryID, ProductID, MaterialID, SaleID, DisposalID, ProductName),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID),
    FOREIGN KEY (ProductName) REFERENCES ERP.Product(ProductName),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID),
    FOREIGN KEY (SaleID) REFERENCES ERP.SalesRecords(SaleID),
    FOREIGN KEY (DisposalID) REFERENCES ERP.DisposedRecords(DisposalID)
);

-- 16. MBOM (MBOM)
CREATE TABLE ERP.MBOM (
    BOMID INT NOT NULL, -- BOMID
    ProductID INT NOT NULL, -- 제품ID
    MaterialID INT NOT NULL, -- 자재ID
    ProductName VARCHAR(100) NULL, -- 제품명
    Quantity INT NOT NULL, -- 수량
    Unit VARCHAR(50) NOT NULL, -- 단위
    ProductionProcess VARCHAR(50) NOT NULL, -- 생산 공정
    PRIMARY KEY (BOMID, ProductID, MaterialID, ProductName),
    FOREIGN KEY (ProductID) REFERENCES ERP.Product(ProductID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);

-- 17. 사용자 (Users)
CREATE TABLE ERP.Users (
    UserID VARCHAR(255) NOT NULL, -- 사용자ID
    Name VARCHAR(30) NULL, -- 이름
    PhoneNumber VARCHAR(30) NULL, -- 전화번호
    Email VARCHAR(30) NULL, -- 이메일
    Username VARCHAR(30) NULL, -- 사용자 이름
    Password VARCHAR(30) NULL, -- 비밀번호
    PRIMARY KEY (UserID)
);

-- 18. Untitled (커피 재료)
CREATE TABLE ERP.Untitled (
    CoffeeMaterialID INT NOT NULL, -- 커피 재료ID
    CoffeeID INT NOT NULL, -- 커피ID
    MaterialID INT NOT NULL, -- 자재ID
    RawMaterialQuantity INT NULL, -- 원재료 수량
    PRIMARY KEY (CoffeeMaterialID, CoffeeID, MaterialID),
    FOREIGN KEY (CoffeeID) REFERENCES ERP.StoreCoffeeTypes(CoffeeID),
    FOREIGN KEY (MaterialID) REFERENCES ERP.MaterialsInventory(MaterialID)
);
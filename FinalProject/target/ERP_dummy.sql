-- 1. 제품 (Product) 테이블 더미 데이터
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

-- 2. 공급업체 (Suppliers) 테이블 더미 데이터
INSERT INTO ERP.Suppliers (SupplierName, ContactInfo, Address, SupplierType, RegistrationDate)
VALUES
('공급업체X', '010-1111-2222', '서울특별시 강남구', '식자재 공급', '2024-04-01 08:00:00'),
('공급업체Y', '010-3333-4444', '부산광역시 해운대구', '포장재 공급', '2024-04-02 09:00:00'),
('공급업체Z', '010-5555-6666', '대구광역시 북구', '기계 공급', '2024-04-03 10:00:00');

-- 3. 원자재 재고 (MaterialsInventory) 테이블 더미 데이터
INSERT INTO ERP.MaterialsInventory (SupplierID, MaterialName, Category, UnitPrice, LastUpdated)
VALUES
(1, '자재X', '식자재', 5000, '2024-04-05 10:30:00'),
(2, '자재Y', '포장재', 3000, '2024-04-06 11:00:00'),
(3, '자재Z', '기계 부품', 10000, '2024-04-07 12:00:00');

-- 4. 원자재 재입고 이력 (RawMaterialRestockHistory) 테이블 더미 데이터
INSERT INTO ERP.RawMaterialRestockHistory (MaterialID, SupplierID, RestockQuantity, UnitPrice, RestockDate)
VALUES
(1, 1, 500, 5000, '2024-04-08 09:30:00'),
(2, 2, 300, 3000, '2024-04-09 10:00:00'),
(3, 3, 400, 10000, '2024-04-10 11:00:00');

-- 5. 생산 소비 (ProductionConsumption) 테이블 더미 데이터
INSERT INTO ERP.ProductionConsumption (MaterialID, QuantityUsed, ProductionDate)
VALUES
(1, 100, '2024-04-11 10:00:00'),
(2, 200, '2024-04-12 11:00:00'),
(3, 150, '2024-04-13 12:00:00');

-- 6. 공장 재고 (FactoryInventory) 테이블 더미 데이터
INSERT INTO ERP.FactoryInventory (ProductID, MaterialID, DisposalID, QuantityInFactory, FactoryDate)
VALUES
(1, 1, 1, 500, '2024-04-14 09:00:00'),
(2, 2, 2, 300, '2024-04-15 10:00:00'),
(3, 3, 3, 400, '2024-04-16 11:00:00');

-- 7. 폐기 기록 (DisposedRecords) 테이블 더미 데이터
INSERT INTO ERP.DisposedRecords (ProductID, QuantityDisposed, DisposalDate, DisposalReason)
VALUES
(1, 100, '2024-04-17 10:00:00', '불량품 폐기'),
(2, 200, '2024-04-18 11:00:00', '유통기한 초과'),
(3, 150, '2024-04-19 12:00:00', '고객 반품');

-- 8. 판매 기록 (SalesRecords) 테이블 더미 데이터
INSERT INTO ERP.SalesRecords (ProductID, CoffeeID, ProductName, QuantitySold, SalePrice, SaleDate, PaymentType)
VALUES
(1, 1, '갈릭꽈베기', 300, 3500, '2024-04-20 10:00:00', '카드'),
(2, 2, '단팥도넛', 150, 3700, '2024-04-21 11:00:00', '현금'),
(3, 3, '고구마케이크빵', 200, 3000, '2024-04-22 12:00:00', '모바일 결제');

-- 9. 커피 종류 (Coffee) 테이블 더미 데이터
INSERT INTO ERP.Coffee (CoffeeName, SalePrice, CoffeeImage, Recommend, Temperature, DetailDescription)
VALUES 
('아메리카노', 3200, '/images/coffee/아메리카노ice.jpg', 'Y', 'ICE', '진한 에스프레소에 차가운 물을 더해 시원하고 깔끔한 맛을 느낄 수 있는 아이스 커피'),
('카라멜 마끼야또', 3000, '/images/coffee/마끼야또ice.jpg', 'Y', 'ICE', '카라멜 시럽의 달콤함과 에스프레소의 진한 맛이 조화롭게 어우러진 아이스 커피'),
('카페라떼', 3500, '/images/coffee/카페라떼ice.jpg', 'N', 'ICE', '에스프레소와 우유가 조화롭게 어우러진 부드러운 맛의 아이스 커피');

-- 10. 작업 지시 (WorkOrders) 테이블 더미 데이터
INSERT INTO ERP.WorkOrders (ProductID, Quantity, StartDate, EndDate, Status, Priority)
VALUES
(1, 500, '2024-04-23', '2024-04-30', '진행 중', '높음'),
(2, 300, '2024-05-01', '2024-05-05', '대기', '중간'),
(3, 400, '2024-05-06', '2024-05-12', '완료', '낮음');

-- 11. 생산 계획 (ProductionPlanning) 테이블 더미 데이터
INSERT INTO ERP.ProductionPlanning (OrderID, ProductID, RequiredDate, MaterialsNeeded, StartDate, EndDate)
VALUES
(1, 1, '2024-04-24', 1000, '2024-04-23', '2024-04-30'),
(2, 2, '2024-05-02', 500, '2024-05-01', '2024-05-05'),
(3, 3, '2024-05-07', 800, '2024-05-06', '2024-05-12');

-- 12. 생산 모니터링 (ProductionMonitoring) 테이블 더미 데이터
INSERT INTO ERP.ProductionMonitoring (OrderID, Temperature, Humidity, ProductionRate, OperationTime)
VALUES
(1, 75.5, 45, 95, 8),
(2, 80.0, 50, 85, 7),
(3, 70.0, 40, 90, 6);

-- 13. 생산 입력 (ProductionEntry) 테이블 더미 데이터
INSERT INTO ERP.ProductionEntry (OrderID, ProductID, Quantity, EntryDate)
VALUES
(1, 1, 500, '2024-04-30'),
(2, 2, 300, '2024-05-05'),
(3, 3, 400, '2024-05-12');

-- 14. 품질 관리 (QualityControl) 테이블 더미 데이터
INSERT INTO ERP.QualityControl (EntryID, ProductID, TestResult, TestDate, DefectRate)
VALUES
(1, 1, '합격', '2024-05-01 10:00:00', 2),
(2, 2, '불합격', '2024-05-06 11:00:00', 10),
(3, 3, '합격', '2024-05-13 12:00:00', 0);

-- 15. 매장 재고 (StoreInventory) 테이블 더미 데이터

INSERT INTO ERP.StoreInventory (ProductID, MaterialID, SaleID, DisposalID, QuantityInStore, StoreDate)
VALUES
(1, 1, 1, 1, 500, '2024-05-14 10:00:00'),
(2, 2, 2, 2, 300, '2024-05-15 11:00:00'),
(3, 3, 3, 3, 400, '2024-05-16 12:00:00');


-- 16. MBOM (MBOM) 테이블 더미 데이터
INSERT INTO ERP.MBOM (ProductID, MaterialID, ProductName, Quantity, Unit, ProductionProcess)
VALUES
(1, 1, '갈릭꽈베기', 1000, '개', '조립'),
(2, 2, '단팥도넛', 800, '개', '포장'),
(3, 3, '고구마케이크빵', 600, '개', '검사');

-- 17. 사용자 (Users) 테이블 더미 데이터
INSERT INTO ERP.Users (UserID, Name, PhoneNumber, Email, Username, Password)
VALUES
('user001', '김철수', '010-1111-2222', 'chulsoo@example.com', 'chulsoo', 'pass1234'),
('user002', '이영희', '010-3333-4444', 'younghee@example.com', 'younghee', 'pass5678'),
('user003', '박민수', '010-5555-6666', 'minsoo@example.com', 'minsoo', 'pass9101');

-- 18. 커피 재료 (Untitled) 테이블 더미 데이터
-- 커피 insert문
-- coffee_materials 테이블에 더미 데이터 삽입
INSERT INTO ERP.coffee_materials (CoffeeID, MaterialID, RawMaterialQuantity)
VALUES
(1, 1, 50),  -- 아메리카노에 자재 1번 사용, 50 단위
(2, 2, 30),  -- 카라멜 마끼야또에 자재 2번 사용, 30 단위
(3, 3, 20);  -- 카페라떼에 자재 3번 사용, 20 단위
-- 1. Product 테이블 조회
SELECT * FROM ERP.Product;

-- 2. Coffee 테이블 조회
SELECT * FROM ERP.Coffee;

-- 3. Suppliers 테이블 조회
SELECT * FROM ERP.Suppliers;

-- 4. MaterialsInventory 테이블 조회
SELECT * FROM ERP.MaterialsInventory;

-- 5. RawMaterialRestockHistory 테이블 조회
SELECT * FROM ERP.RawMaterialRestockHistory;

-- 6. ProductionConsumption 테이블 조회
SELECT * FROM ERP.ProductionConsumption;

-- 7. FactoryInventory 테이블 조회
SELECT * FROM ERP.FactoryInventory;

-- 8. DisposedRecords 테이블 조회
SELECT * FROM ERP.DisposedRecords;

-- 9. SalesRecords 테이블 조회
SELECT * FROM ERP.SalesRecords;

-- 10. WorkOrders 테이블 조회
SELECT * FROM ERP.WorkOrders;

-- 11. ProductionPlanning 테이블 조회
SELECT * FROM ERP.ProductionPlanning;

-- 12. ProductionMonitoring 테이블 조회
SELECT * FROM ERP.ProductionMonitoring;

-- 13. ProductionEntry 테이블 조회
SELECT * FROM ERP.ProductionEntry;

-- 14. QualityControl 테이블 조회
SELECT * FROM ERP.QualityControl;

-- 15. StoreInventory 테이블 조회
SELECT * FROM ERP.StoreInventory;

-- 16. MBOM 테이블 조회
SELECT * FROM ERP.MBOM;

-- 17. Users 테이블 조회
SELECT * FROM ERP.Users;

-- 18. Untitled 테이블 조회 (커피 재료)
SELECT * FROM ERP.coffee_materials;

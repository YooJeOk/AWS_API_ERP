// import React, { useState, useEffect, useCallback } from 'react';
// import KioskProduct from '../../components/KioskManagement/KioskProduct';
// import KioskCoffee from '../../components/KioskManagement/KioskCoffee';
// import Pagination from '../../components/InventoryManage/Pagination';
// import './KioskInventory.css';

// const KioskInventory = () => {
//   const [products, setProducts] = useState({ products: [], totalPages: 0 });
//   const [coffees, setCoffees] = useState({ coffees: [], totalPages: 0 });
//   const [productPage, setProductPage] = useState(0);
//   const [coffeePage, setCoffeePage] = useState(0);
//   const [editMode, setEditMode] = useState(false);
//   const [editedProducts, setEditedProducts] = useState({});
//   const [editedCoffees, setEditedCoffees] = useState({});
//   const [deletedProducts, setDeletedProducts] = useState([]);
//   const [deletedCoffees, setDeletedCoffees] = useState([]);

//   const fetchProducts = useCallback(async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/kiosk/inventory/products?page=${productPage}&size=5`);
//       const data = await response.json();
//       setProducts(data);
//       if (!editedProducts[productPage]) {
//         setEditedProducts(prev => ({
//           ...prev,
//           [productPage]: data.products.map(item => ({ ...item }))
//         }));
//       }
//     } catch (error) {
//       console.error("상품 데이터 fetch 오류:", error);
//     }
//   }, [productPage, editedProducts]);

//   const fetchCoffees = useCallback(async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/kiosk/inventory/coffees?page=${coffeePage}&size=5`);
//       const data = await response.json();
//       setCoffees(data);
//       if (!editedCoffees[coffeePage]) {
//         setEditedCoffees(prev => ({
//           ...prev,
//           [coffeePage]: data.coffees.map(item => ({ ...item }))
//         }));
//       }
//     } catch (error) {
//       console.error("커피 데이터 fetch 오류:", error);
//     }
//   }, [coffeePage, editedCoffees]);

//   useEffect(() => {
//     fetchProducts();
//     fetchCoffees();
//   }, [fetchProducts, fetchCoffees]);

//   const handleProductChange = (pageIndex, productIndex, field, value) => {
//     setEditedProducts(prev => ({
//       ...prev,
//       [pageIndex]: prev[pageIndex].map((item, index) =>
//         index === productIndex ? { ...item, product: { ...item.product, [field]: value } } : item
//       )
//     }));
//   };

//   const handleCoffeeChange = (pageIndex, coffeeIndex, field, value) => {
//     setEditedCoffees(prev => ({
//       ...prev,
//       [pageIndex]: prev[pageIndex].map((coffee, index) =>
//         index === coffeeIndex ? { ...coffee, [field]: value } : coffee
//       )
//     }));
//   };
//   useEffect(() => {
//     console.log('Edited products:', editedProducts);
//   }, [editedProducts]);

//   const handleSaveChanges = async () => {
//     const allEditedProducts = Object.values(editedProducts).flat().map(item => ({
//       productId: item.product.productId,
//       productName: item.product.productName,
//       productCategory: item.product.productCategory,
//       unitPrice: item.product.unitPrice,
//       salePrice: item.product.salePrice,
//       productionDate: item.product.productionDate,
//       productImage: item.product.productImage,
//       onKiosk: item.product.onKiosk,
//       recommend: item.product.recommend,
//       detailDescription: item.product.detailDescription
//     }));
//     console.log("보내는 제품 데이터:" + JSON.stringify(allEditedProducts));

//     const allEditedCoffees = Object.values(editedCoffees).flat();
//     console.log("보내는 커피 데이터:" + JSON.stringify(allEditedCoffees));

//     try {
//       // 수정된 상품 업데이트
//       const productResponse = await fetch('http://localhost:8080/api/kiosk/inventory/update/products', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(allEditedProducts),
//       });
//       const coffeeResponse = await fetch('http://localhost:8080/api/kiosk/inventory/update/coffees', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(allEditedCoffees),
//       });

//       for (let productId of deletedProducts) {
//         await fetch(`http://localhost:8080/api/kiosk/inventory/products/${productId}/update/onkiosk`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ OnKiosk: 'N' }),
//         });
//       }

//       for (let coffeeId of deletedCoffees) {
//         await fetch(`http://localhost:8080/api/kiosk/inventory/coffees/${coffeeId}/update/onkiosk`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ OnKiosk: 'N' }),
//         });
//       }


//       if (productResponse.ok && coffeeResponse.ok) {
//         fetchProducts();
//         fetchCoffees();
//         setEditMode(false);
//         setEditedProducts({});
//         setEditedCoffees({});
//         setDeletedProducts([]);
//         setDeletedCoffees([]);
//       } else {
//         console.error('Failed to update products or coffees');
//       }
//     } catch (error) {
//       console.error('Error updating data:', error);
//     }
//   };

//   const handleDeleteProduct = (productId) => {
//     setDeletedProducts(prev => [...prev, productId]);
//   };

//   const handleCancelDeleteProduct = (productId) => {
//     setDeletedProducts(prev => prev.filter(id => id !== productId));
//   };

//   const handleDeleteCoffee = (coffeeId) => {
//     setDeletedCoffees(prev => [...prev, coffeeId]);
//   };

//   const handleCancelDeleteCoffee = (coffeeId) => {
//     setDeletedCoffees(prev => prev.filter(id => id !== coffeeId));
//   };

//   return (
//     <div className='product-coffee-container container-md mt-4'>
//       <div className='edit-container'>
//         <h4>빵 목록</h4>
//         <div>
//           <button className='change-mode-btn' onClick={() => setEditMode(!editMode)}>
//             {editMode ? '편집 모드 종료' : '편집 모드'}
//           </button>
//           {editMode && <button className='change-save-btn' onClick={handleSaveChanges}>변경사항 저장</button>}
//         </div>
//       </div>
//       <div className='product-container'>
//         <div className='product-table'>
//           <KioskProduct
//             products={editMode ? editedProducts[productPage] || [] : products.products || []}
//             editMode={editMode}
//             onProductChange={(index, field, value) => handleProductChange(productPage, index, field, value)}
//             onProductDelete={handleDeleteProduct}
//             onCancelDelete={handleCancelDeleteProduct}
//             deletedProducts={deletedProducts}
//           />
//         </div>
//         <div className='product-page'>
//           <Pagination
//             currentPage={productPage}
//             totalPages={products.totalPages}
//             onPageChange={setProductPage}
//           />
//         </div>
//       </div>
//       <div className='coffee-container'>
//         <div className='coffee-table'>
//           <KioskCoffee
//             coffees={editMode ? editedCoffees[coffeePage] || [] : coffees.coffees || []}
//             editMode={editMode}
//             onCoffeeChange={(index, field, value) => handleCoffeeChange(coffeePage, index, field, value)}
//             onCoffeeDelete={handleDeleteCoffee}
//             onCancelDelete={handleCancelDeleteCoffee}
//             deletedCoffees={deletedCoffees}
//           />
//         </div>
//         <div className='coffee-page'>
//           <Pagination
//             currentPage={coffeePage}
//             totalPages={coffees.totalPages}
//             onPageChange={setCoffeePage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KioskInventory;
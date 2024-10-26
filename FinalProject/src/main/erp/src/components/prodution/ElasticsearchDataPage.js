// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import './ProductionPage.css';

// function ElasticsearchDataPage() {
//     const [data, setData] = useState([]);
//     const [isDataLoaded, setIsDataLoaded] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/products/search');
//                 console.log('Fetched Data:', response.data);

//                 // Elasticsearch 응답에서 searchHits 배열 가져오기
//                 const searchHits = response.data.searchHits;
//                 if (searchHits && Array.isArray(searchHits)) {
//                     // 각 히트에서 필요한 제품 데이터를 배열로 변환
//                     const products = searchHits.map(hit => {
//                         const product = hit.content;  // content가 실제 제품 데이터가 있는 곳
//                         return Object.values(product); // 객체를 배열로 변환
//                     });
//                     setData(products);  // 배열로 변환된 데이터 저장
//                     setIsDataLoaded(true);
//                 } else {
//                     console.error('Unexpected data structure:', response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data from Elasticsearch:', error);
//                 setIsDataLoaded(false);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="custom-container">
//             <aside id="sidebar"></aside>
//             <main className="elasticsearch-content">
//                 <div className="elasticsearch-mainbar">
//                     <h1>Elasticsearch 데이터 리스트</h1>
//                     <table className="elasticsearch-table">
//                         <thead>
//                             <tr>
//                                 <th>제품 이름</th>
//                                 <th>단가</th>
//                                 <th>제품 카테고리</th>
//                                 <th>생산일</th>
//                                 <th>추천 여부</th>
//                                 <th>상세 설명</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {isDataLoaded ? (
//                                 data.length > 0 ? (
//                                     data.map((productArray, index) => (
//                                         <tr key={index}>
//                                             <td>{productArray[0]}</td> {/* 제품 이름 */}
//                                             <td>${productArray[1]}</td> {/* 단가 */}
//                                             <td>{productArray[2]}</td> {/* 제품 카테고리 */}
//                                             <td>{new Date(productArray[3]).toLocaleDateString()}</td> {/* 생산일 */}
//                                             <td>{productArray[4]}</td> {/* 추천 여부 */}
//                                             <td>{productArray[5]}</td> {/* 상세 설명 */}
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6">데이터가 없습니다.</td>
//                                     </tr>
//                                 )
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6">로딩 중...</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default ElasticsearchDataPage;

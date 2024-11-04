import React, { useState, useEffect, useCallback } from 'react';
import KioskProduct from '../../components/KioskManagement/KioskProduct';
import KioskCoffee from '../../components/KioskManagement/KioskCoffee';
import Pagination from '../../components/InventoryManage/Pagination';
import './KioskInventory.css';
import { Modal } from 'react-bootstrap';

const KioskInventory = () => {
  const [products, setProducts] = useState({ products: [], totalPages: 0 });
  const [coffees, setCoffees] = useState({ coffees: [], totalPages: 0 });
  const [productPage, setProductPage] = useState(0);
  const [coffeePage, setCoffeePage] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedProducts, setEditedProducts] = useState({});
  const [editedCoffees, setEditedCoffees] = useState({});
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [deletedCoffees, setDeletedCoffees] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [changedItems, setChangedItems] = useState({ products: [], coffees: [] });
  const [productSearch, setProductSearch] = useState('');
  const [coffeeSearch, setCoffeeSearch] = useState('');
  const [productSize, setProductSize] = useState(5);
  const [coffeeSize, setCoffeeSize] = useState(5);
  const [expandedProduct, setExpandedProduct] = useState(false);
  const [expandedCoffee, setExpandedCoffee] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/kiosk/inventory/products?page=${productPage}&size=${productSize}&search=${productSearch}`);
      const data = await response.json();
      setProducts(data);
      if (editMode) {
        setEditedProducts(prev => ({ ...prev, [productPage]: prev[productPage] || data.products.map(item => ({ ...item })) }));
      }
    } catch (error) {
      console.error("상품 데이터 fetch 오류:", error);
    }
  }, [productPage, editMode, productSearch, productSize]);

  const fetchCoffees = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/kiosk/inventory/coffees?page=${coffeePage}&size=${coffeeSize}&search=${coffeeSearch}`);
      const data = await response.json();
      setCoffees(data);
      if (editMode) {
        setEditedCoffees(prev => ({ ...prev, [coffeePage]: prev[coffeePage] || data.coffees.map(item => ({ ...item })) }));
      }
    } catch (error) {
      console.error("커피 데이터 fetch 오류:", error);
    }
  }, [coffeePage, editMode, coffeeSearch, coffeeSize]);

  useEffect(() => {
    fetchProducts();
    fetchCoffees();
  }, [fetchProducts, fetchCoffees]);

  const handleProductSearch = (e) => {
    setProductSearch(e.target.value);
    setProductPage(0);
  };

  const handleCoffeeSearch = (e) => {
    setCoffeeSearch(e.target.value);
    setCoffeePage(0);
  };

  const toggleProductExpand = () => {
    setExpandedProduct(!expandedProduct);
    if (!expandedProduct) {
      setExpandedCoffee(false);
    }
    setProductSize(expandedProduct ? 5 : 10);
    setProductPage(0);
  };

  const toggleCoffeeExpand = () => {
    setExpandedCoffee(!expandedCoffee);
    if (!expandedCoffee) {
      setExpandedProduct(false);
    }
    setCoffeeSize(expandedCoffee ? 5 : 10);
    setCoffeePage(0);
  };

  const handleProductChange = (pageIndex, productIndex, field, value) => {
    setEditedProducts(prev => ({
      ...prev,
      [pageIndex]: prev[pageIndex].map((item, index) =>
        index === productIndex ? { ...item, product: { ...item.product, [field]: value } } : item
      )
    }));
  };

  const handleCoffeeChange = (pageIndex, coffeeIndex, field, value) => {
    setEditedCoffees(prev => ({
      ...prev,
      [pageIndex]: prev[pageIndex].map((coffee, index) =>
        index === coffeeIndex ? { ...coffee, [field]: value, coffeeId: coffee.coffeeId } : coffee
      )
    }));
  };
  const checkForChanges = (original, edited) => {
    return original.map((originalItem, index) => {
      const editedItem = edited[index];
      if (!editedItem) return null;

      const changes = {};
      for (const key in originalItem) {
        if (key === 'product') {
          for (const productKey in originalItem.product) {
            if (JSON.stringify(originalItem.product[productKey]) !== JSON.stringify(editedItem.product[productKey])) {
              changes[productKey] = { from: originalItem.product[productKey], to: editedItem.product[productKey] };
            }
          }
        } else if (JSON.stringify(originalItem[key]) !== JSON.stringify(editedItem[key])) {
          changes[key] = { from: originalItem[key], to: editedItem[key] };
        }
      }
      return Object.keys(changes).length > 0 ? {
        id: originalItem.product ? originalItem.product.productId : originalItem.coffeeId,
        name: originalItem.product ? originalItem.product.productName : originalItem.coffeeName,
        changes
      } : null;
    }).filter(Boolean);
  };


  const handleSaveChanges = () => {
    const currentProductPage = editedProducts[productPage] || [];
    const currentCoffeePage = editedCoffees[coffeePage] || [];

    const productChanges = checkForChanges(products.products, currentProductPage);
    const coffeeChanges = checkForChanges(coffees.coffees, currentCoffeePage);

    if (productChanges.length > 0 || coffeeChanges.length > 0 || deletedProducts.length > 0 || deletedCoffees.length > 0) {
      setChangedItems({ products: productChanges, coffees: coffeeChanges });
      setShowConfirmModal(true);
    } else {
      alert("변경사항이 없습니다.");
    }
  };
  const handleConfirmSave = async () => {
    const allEditedProducts = Object.values(editedProducts).flat().map(item => ({
      productId: item.product.productId,
      productName: item.product.productName,
      productCategory: item.product.productCategory,
      unitPrice: item.product.unitPrice,
      salePrice: item.product.salePrice,
      productionDate: item.product.productionDate,
      productImage: item.product.productImage,
      onKiosk: item.product.onKiosk,
      recommend: item.product.recommend,
      detailDescription: item.product.detailDescription
    }));
    const allEditedCoffees = Object.values(editedCoffees).flat();

    try {
      const productResponse = await fetch('http://localhost:8080/api/kiosk/inventory/update/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allEditedProducts),
      });

      const coffeeResponse = await fetch('http://localhost:8080/api/kiosk/inventory/update/coffees', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allEditedCoffees),
      });

      for (let productId of deletedProducts) {
        await fetch(`http://localhost:8080/api/kiosk/inventory/products/${productId}/update/downkiosk`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ OnKiosk: 'N' }),
        });
      }

      for (let coffeeId of deletedCoffees) {
        await fetch(`http://localhost:8080/api/kiosk/inventory/coffees/${coffeeId}/update/downkiosk`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ OnKiosk: 'N' }),
        });
      }

      if (productResponse.ok && coffeeResponse.ok) {
        fetchProducts();
        fetchCoffees();
        setEditMode(false);
        setEditedProducts({});
        setEditedCoffees({});
        setDeletedProducts([]);
        setDeletedCoffees([]);
        setShowConfirmModal(false);
      } else {
        console.error('Failed to update products or coffees');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  const handleDeleteProduct = (productId) => {
    setDeletedProducts(prev => [...prev, productId]);
  };

  const handleCancelDeleteProduct = (productId) => {
    setDeletedProducts(prev => prev.filter(id => id !== productId));
  };

  const handleDeleteCoffee = (coffeeId) => {
    setDeletedCoffees(prev => [...prev, coffeeId]);
  };

  const handleCancelDeleteCoffee = (coffeeId) => {
    setDeletedCoffees(prev => prev.filter(id => id !== coffeeId));
  };
  const ConfirmChangesModal = ({ show, onHide, changedItems, onConfirm }) => (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>변경사항 확인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>다음과 같은 변경사항이 있습니다. 저장하시겠습니까?</p>
        {changedItems.products.length > 0 && (
          <div>
            <h5>제품 변경사항:</h5>
            <ul>
              {changedItems.products.map(item => (
                <li key={item.id}>
                  {item.name} (ID: {item.id}):
                  <ul>
                    {Object.entries(item.changes).map(([key, value]) => (
                      <li key={key}>
                        {key}: {JSON.stringify(value.from)} → {JSON.stringify(value.to)}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
        {changedItems.coffees.length > 0 && (
          <div>
            <h5>커피 변경사항:</h5>
            <ul>
              {changedItems.coffees.map(item => (
                <li key={item.id}>
                  {item.name} (ID: {item.id}):
                  <ul>
                    {Object.entries(item.changes).map(([key, value]) => (
                      <li key={key}>
                        {key}: {JSON.stringify(value.from)} → {JSON.stringify(value.to)}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
        {deletedProducts.length > 0 && (
          <div>
            <h5>키오스크에서 내릴 제품:</h5>
            <ul>
              {deletedProducts.map(id => (
                <li key={id}>제품 ID: {id}</li>
              ))}
            </ul>
          </div>
        )}
        {deletedCoffees.length > 0 && (
          <div>
            <h5>키오스크에서 내릴 커피:</h5>
            <ul>
              {deletedCoffees.map(id => (
                <li key={id}>커피 ID: {id}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="edit-detail-cancel-btn" onClick={onHide}>취소</button>
        <button className="edit-detail-certain-btn" onClick={onConfirm}>저장</button>
      </Modal.Footer>
    </Modal>

  );
  return (
    <div className='product-coffee-container container-md mt-4'>
      <h3 className='text-center'>키오스크 재고</h3>
      {(!expandedCoffee || expandedProduct) && (

      <div className='product-container'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <div className='d-flex align-items-center'>
            <h4 className='mb-0'>빵 목록</h4>
            <button
              onClick={toggleProductExpand}
              className="toggle-expand-btn ms-2"
            >
              {expandedProduct ? '-' : '+'}
            </button>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            {!editMode && (
              <input
                type="text"
                placeholder="제품 검색"
                value={productSearch}
                onChange={handleProductSearch}
                className="form-control w-auto inven-search mx-3"
                style={{ maxWidth: '200px', maxHeight: '40px' }}
              />
            )}
            <span className={`edit-container ${(expandedProduct || expandedCoffee) ? 'hidden' : ''}`}>
              <div>
                <button className='change-mode-btn' onClick={() => setEditMode(!editMode)}>
                  {editMode ? '편집 모드 종료' : '편집 모드'}
                </button>
                {editMode && <button className='change-save-btn ms-2' onClick={handleSaveChanges}>변경사항 저장</button>}
              </div>
            </span>
          </div>
        </div>
        <div className='product-table' style={{ minHeight: '300px' }}>
          {products.products && products.products.length > 0 ? (
            <KioskProduct
              products={editMode ? editedProducts[productPage] || [] : products.products || []}
              editMode={editMode}
              onProductChange={(index, field, value) => handleProductChange(productPage, index, field, value)}
              onProductDelete={handleDeleteProduct}
              onCancelDelete={handleCancelDeleteProduct}
              deletedProducts={deletedProducts}
            />
          ) : (
            <p className="text-center">조회 결과가 없습니다.</p>
          )}
        </div>
        <div className='product-page'>
          <Pagination
            currentPage={productPage}
            totalPages={products.totalPages}
            onPageChange={setProductPage}
          />
        </div>
      </div>
      )}
            {(!expandedProduct || expandedCoffee) && (

      <div className='coffee-container mt-4'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <div className='d-flex align-items-center'>
            <h4 className='mb-0'>커피 목록</h4>
            <button
              onClick={toggleCoffeeExpand}
              className="toggle-expand-btn ms-2"
            >
              {expandedCoffee ? '-' : '+'}
            </button>
          </div>
          {!editMode && (
            <input
              type="text"
              placeholder="커피 검색"
              value={coffeeSearch}
              onChange={handleCoffeeSearch}
              className="form-control w-auto inven-search"
              style={{ maxWidth: '200px', maxHeight: '40px' }}
            />
          )}
        </div>
        <div className='coffee-table' style={{ minHeight: '300px' }}>
          {coffees.coffees && coffees.coffees.length > 0 ? (
            <KioskCoffee
              coffees={editMode ? editedCoffees[coffeePage] || [] : coffees.coffees || []}
              editMode={editMode}
              onCoffeeChange={(index, field, value) => handleCoffeeChange(coffeePage, index, field, value)}
              onCoffeeDelete={handleDeleteCoffee}
              onCancelDelete={handleCancelDeleteCoffee}
              deletedCoffees={deletedCoffees}
            />
          ) : (
            <p className="text-center">조회 결과가 없습니다.</p>
          )}
        </div>
        <div className='coffee-page'>
          <Pagination
            currentPage={coffeePage}
            totalPages={coffees.totalPages}
            onPageChange={setCoffeePage}
          />
        </div>
      </div>
            )}

      <ConfirmChangesModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        changedItems={changedItems}
        onConfirm={handleConfirmSave}
      />
    </div>
  );
};

export default KioskInventory;
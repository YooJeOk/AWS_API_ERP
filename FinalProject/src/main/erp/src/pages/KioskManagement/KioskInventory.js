import React, { useState, useEffect, useCallback } from 'react';
import KioskProduct from '../../components/KioskManagement/KioskProduct';
import KioskCoffee from '../../components/KioskManagement/KioskCoffee';
import Pagination from '../../components/InventoryManage/Pagination';
import './KioskInventory.css';
import { Button, Modal } from 'react-bootstrap';

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

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/kiosk/inventory/products?page=${productPage}&size=5`);
      const data = await response.json();
      setProducts(data);
      if (!editedProducts[productPage]) {
        setEditedProducts(prev => ({
          ...prev,
          [productPage]: data.products.map(item => ({ ...item }))
        }));
      }
    } catch (error) {
      console.error("상품 데이터 fetch 오류:", error);
    }
  }, [productPage, editedProducts]);

  const fetchCoffees = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/kiosk/inventory/coffees?page=${coffeePage}&size=5`);
      const data = await response.json();
      setCoffees(data);
      if (!editedCoffees[coffeePage]) {
        setEditedCoffees(prev => ({
          ...prev,
          [coffeePage]: data.coffees.map(item => ({ ...item }))
        }));
      }
    } catch (error) {
      console.error("커피 데이터 fetch 오류:", error);
    }
  }, [coffeePage, editedCoffees]);

  useEffect(() => {
    fetchProducts();
    fetchCoffees();
  }, [fetchProducts, fetchCoffees]);

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
        index === coffeeIndex ? { ...coffee, [field]: value } : coffee
      )
    }));
  };
 
const checkForChanges = (original, edited) => {
    return original.map((originalItem, index) => {
      const editedItem = edited[index];
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
      return Object.keys(changes).length > 0 ? { id: originalItem.productId || originalItem.coffeeId, changes } : null;
    }).filter(Boolean);
  };


  const handleSaveChanges = () => {
    const allEditedProducts = Object.values(editedProducts).flat();
    const allEditedCoffees = Object.values(editedCoffees).flat();
    const productChanges = checkForChanges(products.products, allEditedProducts);
    const coffeeChanges = checkForChanges(coffees.coffees, allEditedCoffees);

    if (productChanges.length > 0 || coffeeChanges.length > 0 || deletedProducts.length > 0 || deletedCoffees.length > 0) {
      setChangedItems({ products: productChanges, coffees: coffeeChanges });
      setShowConfirmModal(true);
    } else {
      alert("변경사항이 없습니다.");
    }
  };

  const handleConfirmSave = async () => {
    const allEditedProducts = Object.values(editedProducts).flat().map(item => ({
      productId: item.productId,
      productName: item.productName,
      productCategory: item.productCategory,
      unitPrice: item.unitPrice,
      salePrice: item.salePrice,
      productionDate: item.productionDate,
      productImage: item.productImage,
      onKiosk: item.onKiosk,
      recommend: item.recommend,
      detailDescription: item.detailDescription
    }));
    const allEditedCoffees = Object.values(editedCoffees).flat();
    console.log("보내는 제품 데이터:"+JSON.stringify(allEditedProducts));
    console.log("보내는 커피 데이터:"+JSON.stringify(allEditedCoffees));
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
        await fetch(`http://localhost:8080/api/kiosk/inventory/products/${productId}/update/onkiosk`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ OnKiosk: 'N' }),
        });
      }

      for (let coffeeId of deletedCoffees) {
        await fetch(`http://localhost:8080/api/kiosk/inventory/coffees/${coffeeId}/update/onkiosk`, {
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
    <Modal show={show} onHide={onHide} size="lg">
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
                  제품 ID {item.id}:
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
                  커피 ID {item.id}:
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
        <Button variant="secondary" onClick={onHide}>취소</Button>
        <Button variant="primary" onClick={onConfirm}>저장</Button>
      </Modal.Footer>
    </Modal>

  );
  return (
    <div className='product-coffee-container container-md mt-4'>
      <div className='edit-container'>
        <h4>빵 목록</h4>
        <div>
          <button className='change-mode-btn' onClick={() => setEditMode(!editMode)}>
            {editMode ? '편집 모드 종료' : '편집 모드'}
          </button>
          {editMode && <button className='change-save-btn' onClick={handleSaveChanges}>변경사항 저장</button>}
        </div>
      </div>
      <div className='product-container'>
        <div className='product-table'>
          <KioskProduct
            products={editMode ? editedProducts[productPage] || [] : products.products || []}
            editMode={editMode}
            onProductChange={(index, field, value) => handleProductChange(productPage, index, field, value)}
            onProductDelete={handleDeleteProduct}
            onCancelDelete={handleCancelDeleteProduct}
            deletedProducts={deletedProducts}
          />
        </div>
        <div className='product-page'>
          <Pagination
            currentPage={productPage}
            totalPages={products.totalPages}
            onPageChange={setProductPage}
          />
        </div>
      </div>
      <div className='coffee-container'>
        <div className='coffee-table'>
          <KioskCoffee
            coffees={editMode ? editedCoffees[coffeePage] || [] : coffees.coffees || []}
            editMode={editMode}
            onCoffeeChange={(index, field, value) => handleCoffeeChange(coffeePage, index, field, value)}
            onCoffeeDelete={handleDeleteCoffee}
            onCancelDelete={handleCancelDeleteCoffee}
            deletedCoffees={deletedCoffees}
          />
        </div>
        <div className='coffee-page'>
          <Pagination
            currentPage={coffeePage}
            totalPages={coffees.totalPages}
            onPageChange={setCoffeePage}
          />
        </div>
      </div>
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


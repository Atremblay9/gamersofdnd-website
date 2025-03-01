import React, { useState } from 'react';
import { useEffect } from 'react';

export default function InventoryList({isDashboard}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', edition: '', quantity: '', condition: '', type: '' });
  const [showModal, setShowModal] = useState(false);

  // Fetch inventory only on component mount (no dependency)
  useEffect(() => {
    fetchInventory();
  }, []);  // Empty dependency array ensures it runs only once on component mount

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory');
      if (!response.ok) {
        console.log('Failed to fetch inventory');
      }
      const data = await response.json();
      setInventory(data.inventory);  // Update state with the new inventory data
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.quantity) return;

    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newItem.name,
          edition: newItem.edition,
          quantity: newItem.quantity,
          condition: newItem.condition,
          type: newItem.type,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setInventory((prevInventory) => [...prevInventory, data.item]);  // Optimistically update state
    } catch (error) {
      console.error('Error adding item:', error.message);
    } finally {
      setNewItem({ name: '', edition: '', quantity: '', condition: '', type: '' });
      setShowModal(false);
      fetchInventory();  // Trigger a re-fetch after adding an item
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch('/api/inventory', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Remove item from state
      });
      if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete item');
    }

    const data = await response.json();
    console.log('Item deleted successfully:', data);
    fetchInventory(); // Refresh the list of items
  } catch (error) {
    console.error('Error deleting item:', error.message);
    alert(error.message); // Show error message to the user
  }
};

  const handleEditCondition = async (id, newCondition) => {
    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ condition: newCondition }),
      });

      if (response.ok) {
        setInventory((prevInventory) =>
          prevInventory.map(item =>
            item.id === id ? { ...item, condition: newCondition } : item
          )
        ); // Optimistically update condition in state
      }
    } catch (error) {
      console.error('Error updating condition:', error);
    } finally {
      fetchInventory();  // Trigger a re-fetch after editing an item's condition
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item && item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Add null/undefined check for item and item.name
  );
  if(isDashboard){
    return (
    <div className='search-inventory'>
      <div className="inventory-header">
        <h3>Inventory</h3>
        <button onClick={() => setShowModal(true)}>Add Item</button>
      </div>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
      />

      {showModal && (
        <div className="modal inventory-modal">
          <div className="modal-content">
            <h2>Add Item</h2>
            <label>Name
              <input type="text" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            </label>
            <label>Edition
              <input type="text" value={newItem.edition} onChange={(e) => setNewItem({ ...newItem, edition: e.target.value })} />
            </label>
            <label>Quantity
              <input type="number" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} />
            </label>
            <label>Condition
              <input type="text" value={newItem.condition} onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })} />
            </label>
            <label>Type
              <input type="text" value={newItem.type} onChange={(e) => setNewItem({ ...newItem, type: e.target.value })} />
            </label>
            <div className="modal-actions">
              <button onClick={handleAddItem}>Add</button>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="inventory-table-container" style={{ overflowY: 'scroll', maxHeight: '300px', width: '100%' }}>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Edition</th>
              <th>Quantity</th>
              <th>Condition</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.edition}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                  <td>
                    <input
                      type="text"
                      value={item.condition}
                      onChange={(e) => handleEditCondition(item.id, e.target.value)}
                    />
                  </td>
                  <td>{item.type}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No items match your search</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  }else{

  
  
  return (
    <div className='search-inventory'>
      {/* Search Input */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
      </div>

      <div className="inventory-table-container" style={{ overflowY: 'scroll', maxHeight: '300px', width: '100%' }}>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Edition</th>
              <th>Quantity</th>
              <th>Condition</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.edition}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                  <td>{item.condition}</td>
                  <td>{item.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No items match your search</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  }
}
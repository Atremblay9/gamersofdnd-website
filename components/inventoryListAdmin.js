import React, { useState, useEffect } from 'react';

export default function InventoryList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', edition: '', quantity: '', condition: '', type: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('/api/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }
        const data = await response.json();
        setInventory(data.inventory);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  const handleAddItem = async () => {
  if (!newItem.name || !newItem.quantity) return;

  try {
    console.log("Adding item:", newItem);

    const response = await fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get raw response text
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Server response:', data);

  } catch (error) {
    console.error('Error adding item:', error.message);
  } finally {
    setNewItem({ name: '', edition: '', quantity: '', condition: '', type: '' });
    setShowModal(false);
  }
};
  


  const handleRemoveItem = async (id) => {
    try {
      await fetch(`/api/inventory/${id}`, { method: 'DELETE' });
      setInventory(inventory.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
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
        setInventory(
          inventory.map(item =>
            item.id === id ? { ...item, condition: newCondition } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating condition:', error);
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
}

import React, { useState } from 'react';
import { useEffect } from 'react';

export default function InventoryList() {
  const [searchTerm, setSearchTerm] = useState('');

  const [inventory, setInventory] = useState([]);
  
    // Fetch the data from the API when the component mounts
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
          console.error('Error fetching Inventory:', error);
        }
      };
  
      fetchInventory();
    }, []);

  // Filter the inventory based on the search term
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
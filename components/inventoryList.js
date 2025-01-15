import React, { useState } from 'react';
import data from '../SampleData';

export default function InventoryList() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the inventory based on the search term
  const filteredInventory = data.inventory.filter((item) =>
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
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.edition}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantity}</td>
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
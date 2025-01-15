import data from '../SampleData';

export default function InventoryList() {
  return (
    <div className="inventory-table-container">
      <div style={{ overflowY: 'scroll', maxHeight: '300px', width: '100%' }}>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Edition</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.inventory.length > 0 ? (
              data.inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.edition}</td>
                  <td style={{'textAlign': 'center'}}>{item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
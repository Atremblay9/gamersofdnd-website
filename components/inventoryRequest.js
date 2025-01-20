import React, { useState } from 'react';

export default function InventoryManager() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: '',
    discordName: '',
    email: '',
    itemName: '',
    details: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRequestForm({ ...requestForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate NAIT email
    if (!/^[^@\s]+@nait\.ca$/.test(requestForm.email)) {
      alert('Please enter a valid NAIT email address.');
      return;
    }

    // Send POST request to the API
    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestForm),
      });

      if (response.ok) {
        alert('Request submitted successfully!');
        setRequestForm({
          name: '',
          discordName: '',
          email: '',
          itemName: '',
          details: ''
        });
        setShowRequestForm(false);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request');
    }
  };

  return (
    <div>
      <p>If you'd like to request an item for the inventory, use the form below.</p>

      {/* Section: Search Inventory */}
      <section>
        {/* Dropdown for "Item Request" */}
        <button onClick={() => setShowRequestForm(!showRequestForm)}>
          {showRequestForm ? 'Close Item Request Form' : 'Open Item Request Form'}
        </button>

        {showRequestForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={requestForm.name}
                  onChange={handleFormChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Discord Name:
                <input
                  type="text"
                  name="discordName"
                  value={requestForm.discordName}
                  onChange={handleFormChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                NAIT Email:
                <input
                  type="email"
                  name="email"
                  value={requestForm.email}
                  onChange={handleFormChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Item Name:
                <input
                  type="text"
                  name="itemName"
                  value={requestForm.itemName}
                  onChange={handleFormChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Details (e.g., version, specifics):
                <textarea
                  name="details"
                  value={requestForm.details}
                  onChange={handleFormChange}
                  required
                />
              </label>
            </div>
            <button type="submit">Submit Request</button>
          </form>
        )}
      </section>
    </div>
  );
}

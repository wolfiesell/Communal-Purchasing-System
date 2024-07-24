// src/components/CreateListingForm.js

import React, { useState } from 'react';

const CreateListingForm = ({ createListing }) => {
  const [itemName, setItemName] = useState('');
  const [units, setUnits] = useState('');
  const [price, setPrice] = useState('');
  const [expiration, setExpiration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const listing = {
      itemName,
      units,
      price,
      expiration,
    };
    createListing(listing);
  };

  return (
    <form onSubmit={handleSubmit} className="create-listing-form">
      <div>
        <label>Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Units for Sale:</label>
        <input
          type="number"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price per Unit:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Hours until Expiration:</label>
        <input
          type="number"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Listing</button>
    </form>
  );
};

export default CreateListingForm;

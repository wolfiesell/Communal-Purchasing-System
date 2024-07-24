// src/components/MintButton.js

import React from 'react';

const MintButton = ({ closeListingAndMint, loading }) => {
  return (
    <button onClick={closeListingAndMint} disabled={loading}>
      {loading ? 'Processing...' : 'Close Listing and Mint NFTs'}
    </button>
  );
};

export default MintButton;

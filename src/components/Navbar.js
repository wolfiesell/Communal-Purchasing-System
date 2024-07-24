// src/components/Navbar.js

import React from 'react';

const Navbar = ({ connectWallet, provider, account }) => {
  return (
    <div className="navbar">
      <div className="left-section">
        <button onClick={connectWallet}>
          {provider ? 'Change Wallet' : 'Connect Wallet'}
        </button>
      </div>
      <div className="center-section">
        {provider && <span>Connected: {account}</span>}
      </div>
    </div>
  );
};

export default Navbar;

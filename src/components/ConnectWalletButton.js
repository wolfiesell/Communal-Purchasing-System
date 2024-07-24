// src/components/ConnectWalletButton.js

import React from 'react';

const ConnectWalletButton = ({ connectWallet, account }) => {
  return (
    <div className="left-section">
      <button onClick={connectWallet}>
        {account ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectWalletButton;

// src/App.js

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import ConnectWalletButton from './components/ConnectWalletButton';
import Navbar from './components/Navbar';
import CreateListingForm from './components/CreateListingForm';
import Listing from './components/Listing';
import { contractAddress } from './contracts/contractAddress';
import ContributionNFTABI from './contracts/ContributionNFTABI.json';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [listings, setListings] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (provider && contract) {
      provider.listAccounts().then(accounts => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });

      contract.owner().then(owner => {
        setIsOwner(owner.toLowerCase() === account?.toLowerCase());
      });
    }
  }, [provider, contract, account]);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
    });
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    setProvider(provider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ContributionNFTABI, signer);
    setContract(contract);

    const accounts = await provider.listAccounts();
    setAccount(accounts[0]);

    const owner = await contract.owner();
    setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());
  };

  const closeListingAndMint = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const tx = await contract.closeListingAndMint();
      await tx.wait();
      alert('NFTs minted successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred. Check the console for details.');
    }
    setLoading(false);
  };

  const createListing = (listing) => {
    setListings([...listings, { ...listing, units: parseInt(listing.units, 10), price: parseFloat(listing.price), expiration: parseInt(listing.expiration, 10), contributions: [] }]);
    console.log('New listing created:', listing);
  };

  const contribute = (listing, units) => {
    const updatedListings = listings.map(l => {
      if (l === listing) {
        return {
          ...l,
          contributions: [
            ...l.contributions,
            { address: account, units }
          ]
        };
      }
      return l;
    });
    setListings(updatedListings);
  };

  return (
    <div className="App">
      <Navbar connectWallet={connectWallet} provider={provider} account={account} />
      <h1>Communal Purchasing System</h1>
      {provider && (
        <CreateListingForm createListing={createListing} />
      )}
      <div className="listings">
        {listings.map((listing, index) => (
          <Listing
            key={index}
            listing={listing}
            contribute={contribute}
            closeListingAndMint={closeListingAndMint}
            isOwner={isOwner}
          />
        ))}
      </div>
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLDmorlwKwZLMg4tw0ZY-U2habJQBYe9kyFw&s" 
        alt="Logo" 
        className="logo" 
      />
    </div>
  );
}

export default App;

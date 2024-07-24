// src/components/Listing.js

import React, { useState, useEffect } from 'react';

const Listing = ({ listing, contribute, closeListingAndMint, isOwner }) => {
  const [units, setUnits] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(listing.expiration * 60 * 60); // convert hours to seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleContribute = () => {
    const parsedUnits = parseInt(units, 10);
    const totalContributed = listing.contributions.reduce((acc, c) => acc + c.units, 0);
    if (timeLeft === 0) {
      setError('This listing has expired.');
    } else if (parsedUnits <= 0 || parsedUnits > (listing.units - totalContributed)) {
      setError('Invalid number of units');
    } else {
      contribute(listing, parsedUnits);
      setUnits('');
      setError('');
    }
  };

  const totalContributed = listing.contributions.reduce((acc, c) => acc + c.units, 0);
  const progress = (totalContributed / listing.units) * 100;
  const isListingComplete = totalContributed >= listing.units;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="listing">
      <h3>{listing.itemName}</h3>
      <p>Units Contributed: {totalContributed} / {listing.units}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>Price per Unit: ${listing.price}</p>
      <p>Total Price: ${listing.units * listing.price}</p>
      <p>Time Left: {timeLeft > 0 ? formatTime(timeLeft) : 'Expired'}</p>
      <div>
        <input
          type="number"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="Units to contribute"
          disabled={timeLeft === 0 || isListingComplete}
        />
        <button onClick={handleContribute} disabled={timeLeft === 0 || isListingComplete}>
          Contribute
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <div>
        <h4>Contributions:</h4>
        {listing.contributions.map((contribution, index) => (
          <p key={index}>
            {contribution.address}: {contribution.units} units
          </p>
        ))}
      </div>
      {isListingComplete && (
        <button onClick={closeListingAndMint}>
          NFT Receipt
        </button>
      )}
    </div>
  );
};

export default Listing;

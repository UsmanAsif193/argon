import React from 'react';

const Welcome = ({ user, signOut }) => {
  return (
    <div>
      <h1>Welcome, {user.displayName}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Welcome;

import React from 'react';

export const SimpleTestPage: React.FC = () => {
  return (
    <div style={{
      background: '#1B365D',
      color: 'white',
      padding: '50px',
      textAlign: 'center',
      minHeight: '100vh'
    }}>
      <h1 style={{fontSize: '3rem', marginBottom: '20px'}}>
        🐎 Mam Center Test Page
      </h1>
      <p style={{fontSize: '1.5rem', marginBottom: '30px'}}>
        If you can see this, React is working!
      </p>
      <div style={{fontSize: '1.2rem'}}>
        <p>✅ React Router: Working</p>
        <p>✅ Styles: Applied</p>
        <p>✅ Deployment: Successful</p>
      </div>
    </div>
  );
};

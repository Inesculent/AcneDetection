import React from 'react';
import { signInWithGoogle } from './authLogic';
const GoogleSignInButton = () => (
    <button
        onClick={signInWithGoogle}
        style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            background: '#4285F4',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
        }}
    >
        <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            style={{ width: '20px', marginRight: '10px' }}
        />
        Sign In with Google
    </button>
);

export default GoogleSignInButton;

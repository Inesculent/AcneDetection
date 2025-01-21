import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase'; // Import your Firebase instance

const provider = new GoogleAuthProvider(); // Initialize Google provider

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider); // Popup for sign-in
        const user = result.user; // Access user info
        console.log('Google Sign-In successful:', user);


    } catch (error) {
        console.error('Error during Google Sign-In:', error.message);
    }
};

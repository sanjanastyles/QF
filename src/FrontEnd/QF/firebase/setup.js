import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB5jRNbhqips38jcf_Am9vV-k8iTXe27X8',
  authDomain: 'qwickfix-3b131.firebaseapp.com',
  prpojectId: 'qwickfix-3b131',
  storageBucket: 'qwickfix-3b131.appspot.com',
  messagingSenderId: '141703295838',
  appId: '1:141703295838:web:acc1e8e9b575acd72495cf',
  measurementId: 'G-MXWV7CQN66',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBHwVgFJgsvOp1ZgU4nQetHM_KgzxeXzZI",
  authDomain: "weekend-warrior-social-v2.firebaseapp.com",
  projectId: "weekend-warrior-social-v2",
  storageBucket: "weekend-warrior-social-v2.firebasestorage.app",
  messagingSenderId: "147800031459",
  appId: "1:147800031459:web:d72e1fc2b81b8b152405d6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const COL = {
  USERS: 'users',
  POSTS: 'posts',
  FRIEND_REQUESTS: 'friend_requests',
  FRIENDS: 'friends',
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  CHALLENGES: 'challenges',
};

export const RANKS = [
  { id: 'Rookie', min: 0 },
  { id: 'Warrior', min: 500 },
  { id: 'Champion', min: 2000 },
  { id: 'Legend', min: 10000 },
];

export function getRank(points = 0) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (points >= RANKS[i].min) return RANKS[i].id;
  }
  return 'Rookie';
}

export function getLevel(points = 0) {
  return Math.floor(points / 500) + 1;
}

export { 
  collection, doc, getDoc, getDocs, setDoc, updateDoc, 
  query, where, orderBy, limit, onSnapshot, serverTimestamp, arrayUnion, addDoc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

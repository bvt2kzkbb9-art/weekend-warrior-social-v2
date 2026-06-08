import { auth, db, COL, googleProvider, getRank, getLevel } from './firebase.js';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, updateProfile, signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  doc, setDoc, getDoc, serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export function showToast(msg, type = 'info') {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
    background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : '#3b82f6'};
    color: white; padding: 12px 20px; border-radius: 8px; font-size: 14px; z-index: 1000;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

export async function ensureUserDoc(user) {
  if (!user) return;
  const ref = doc(db, COL.USERS, user.uid);
  const snap = await getDoc(ref).catch(() => null);
  
  if (!snap?.exists()) {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Wojownik',
      points: 0,
      level: 1,
      rank: getRank(0),
      bio: '',
      createdAt: serverTimestamp(),
    };
    await setDoc(ref, userData);
    return userData;
  }
  return snap.data();
}

export async function getCurrentUserData(uid) {
  if (!uid) return null;
  const snap = await getDoc(doc(db, COL.USERS, uid)).catch(() => null);
  return snap?.data() || null;
}

export function checkAuth(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getCurrentUserData(user.uid);
      callback(user, userData || {});
    } else {
      callback(null, null);
    }
  });
}

export async function registerWithEmail(email, password, displayName) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    await ensureUserDoc(user);
    showToast('✅ Konto utworzone!', 'success');
    return user;
  } catch (err) {
    showToast('❌ ' + (err.code === 'auth/email-already-in-use' ? 'Email już w użyciu' : 'Błąd'), 'error');
    throw err;
  }
}

export async function loginWithEmail(email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    showToast('✅ Zalogowano!', 'success');
    return user;
  } catch (err) {
    showToast('❌ Email lub hasło niepoprawne', 'error');
    throw err;
  }
}

export async function logout() {
  try {
    await signOut(auth);
    window.location.href = 'login.html';
  } catch (err) {
    showToast('❌ Błąd wylogowania', 'error');
  }
}

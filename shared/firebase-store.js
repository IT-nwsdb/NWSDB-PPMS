import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjt4bMkIP4hG1FQuXH_AJz_PW8E_ZoErM",
  authDomain: "ppms-project-abc5c.firebaseapp.com",
  projectId: "ppms-project-abc5c",
  storageBucket: "ppms-project-abc5c.firebasestorage.app",
  messagingSenderId: "335038631717",
  appId: "1:335038631717:web:012fcaa00ea24d5fbf54cc"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function clean(value) {
  return clone(value);
}

function docRef(remotePath) {
  return doc(db, ...remotePath);
}

export function readLocalState(localKey) {
  try {
    const raw = localStorage.getItem(localKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeLocalState(localKey, value) {
  try {
    localStorage.setItem(localKey, JSON.stringify(clean(value)));
  } catch {
    // Ignore local storage failures; Firestore sync may still succeed.
  }
}

export function removeLocalState(localKey) {
  try {
    localStorage.removeItem(localKey);
  } catch {
    // Ignore local storage failures.
  }
}

export async function readRemoteState(remotePath) {
  const snapshot = await getDoc(docRef(remotePath));
  if (!snapshot.exists()) return null;
  const data = snapshot.data() || {};
  delete data.updatedAt;
  return data;
}

export async function syncRemoteState({ remotePath, data }) {
  const payload = clean(data) || {};
  await setDoc(docRef(remotePath), { ...payload, updatedAt: serverTimestamp() }, { merge: false });
}

export async function clearRemoteState(remotePath) {
  await deleteDoc(docRef(remotePath));
}

export async function loadState({ localKey, remotePath, defaultValue, validate }) {
  const localValue = readLocalState(localKey);

  try {
    const remoteValue = await readRemoteState(remotePath);
    if (validate(remoteValue)) {
      writeLocalState(localKey, remoteValue);
      return clone(remoteValue);
    }

    if (validate(localValue)) {
      await syncRemoteState({ remotePath, data: localValue });
      return clone(localValue);
    }
  } catch {
    if (validate(localValue)) {
      return clone(localValue);
    }
  }

  return clone(defaultValue);
}

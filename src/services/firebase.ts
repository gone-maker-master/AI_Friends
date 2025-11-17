import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, Auth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import {Message, UserProfile} from '../types';

// Firebase configuration
// Replace these with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-auth-domain",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: process.env.FIREBASE_APP_ID || "your-app-id",
};

class FirebaseService {
  private userId: string | null = null;
  private app;
  private auth: Auth;
  private db: Firestore;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }

  async initializeUser() {
    try {
      // Anonymous auth for simplicity
      const userCredential = await signInAnonymously(this.auth);
      this.userId = userCredential.user.uid;
      return this.userId;
    } catch (error) {
      console.error('Firebase auth error:', error);
      throw error;
    }
  }

  async saveMessage(message: Message) {
    if (!this.userId) await this.initializeUser();

    try {
      const messagesRef = collection(
        this.db,
        'users',
        this.userId!,
        'messages'
      );
      await addDoc(messagesRef, {
        ...message,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }

  async getMessages(): Promise<Message[]> {
    if (!this.userId) await this.initializeUser();

    try {
      const messagesRef = collection(
        this.db,
        'users',
        this.userId!,
        'messages'
      );
      const q = query(messagesRef, orderBy('timestamp', 'asc'));
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          sender: data.sender,
          timestamp: data.timestamp?.toDate() || new Date(),
        };
      });
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }

  async saveUserProfile(profile: UserProfile) {
    if (!this.userId) await this.initializeUser();

    try {
      const userRef = doc(this.db, 'users', this.userId!);
      await setDoc(
        userRef,
        {
          profile,
          updatedAt: serverTimestamp(),
        },
        {merge: true}
      );
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }

  async getUserProfile(): Promise<UserProfile | null> {
    if (!this.userId) await this.initializeUser();

    try {
      const userRef = doc(this.db, 'users', this.userId!);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data()?.profile || null;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  async savePersonality(personalityId: string) {
    if (!this.userId) await this.initializeUser();

    try {
      const userRef = doc(this.db, 'users', this.userId!);
      await setDoc(
        userRef,
        {
          personalityId,
          updatedAt: serverTimestamp(),
        },
        {merge: true}
      );
    } catch (error) {
      console.error('Error saving personality:', error);
    }
  }

  async getPersonality(): Promise<string | null> {
    if (!this.userId) await this.initializeUser();

    try {
      const userRef = doc(this.db, 'users', this.userId!);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data()?.personalityId || null;
      }
      return null;
    } catch (error) {
      console.error('Error getting personality:', error);
      return null;
    }
  }
}

export default new FirebaseService();

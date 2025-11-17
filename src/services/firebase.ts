import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Message, UserProfile} from '../types';

class FirebaseService {
  private userId: string | null = null;

  async initializeUser() {
    try {
      // Anonymous auth for simplicity
      const userCredential = await auth().signInAnonymously();
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
      await firestore()
        .collection('users')
        .doc(this.userId!)
        .collection('messages')
        .add({
          ...message,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }

  async getMessages(): Promise<Message[]> {
    if (!this.userId) await this.initializeUser();

    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(this.userId!)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .get();

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
      await firestore()
        .collection('users')
        .doc(this.userId!)
        .set({
          profile,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        }, {merge: true});
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }

  async getUserProfile(): Promise<UserProfile | null> {
    if (!this.userId) await this.initializeUser();

    try {
      const doc = await firestore()
        .collection('users')
        .doc(this.userId!)
        .get();

      return doc.data()?.profile || null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  async savePersonality(personalityId: string) {
    if (!this.userId) await this.initializeUser();

    try {
      await firestore()
        .collection('users')
        .doc(this.userId!)
        .set({
          personalityId,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        }, {merge: true});
    } catch (error) {
      console.error('Error saving personality:', error);
    }
  }

  async getPersonality(): Promise<string | null> {
    if (!this.userId) await this.initializeUser();

    try {
      const doc = await firestore()
        .collection('users')
        .doc(this.userId!)
        .get();

      return doc.data()?.personalityId || null;
    } catch (error) {
      console.error('Error getting personality:', error);
      return null;
    }
  }
}

export default new FirebaseService();

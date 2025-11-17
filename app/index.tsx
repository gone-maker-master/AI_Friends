import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import PersonalitySelectionScreen from '../src/screens/PersonalitySelectionScreen';
import ChatScreen from '../src/screens/ChatScreen';
import {Personality} from '../src/types';
import firebaseService from '../src/services/firebase';

export default function Index() {
  const [selectedPersonality, setSelectedPersonality] = useState<Personality | null>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await firebaseService.initializeUser();
      // You can load previously selected personality here if needed
    } catch (error) {
      console.error('App initialization error:', error);
    }
  };

  const handleSelectPersonality = async (personality: Personality) => {
    setSelectedPersonality(personality);
    await firebaseService.savePersonality(personality.id);
  };

  const handleChangePersonality = () => {
    setSelectedPersonality(null);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      {selectedPersonality ? (
        <ChatScreen
          personality={selectedPersonality}
          onChangePersonality={handleChangePersonality}
        />
      ) : (
        <PersonalitySelectionScreen onSelectPersonality={handleSelectPersonality} />
      )}
    </>
  );
}

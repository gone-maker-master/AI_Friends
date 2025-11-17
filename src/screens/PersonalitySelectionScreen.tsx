import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {PERSONALITIES, Personality} from '../types';

interface Props {
  onSelectPersonality: (personality: Personality) => void;
}

const PersonalitySelectionScreen: React.FC<Props> = ({onSelectPersonality}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>AI Companion</Text>
        <Text style={styles.subtitle}>どんな性格のパートナーがいいですか?</Text>

        <View style={styles.personalitiesContainer}>
          {PERSONALITIES.map(personality => (
            <TouchableOpacity
              key={personality.id}
              style={styles.personalityCard}
              onPress={() => onSelectPersonality(personality)}
              activeOpacity={0.7}>
              <Text style={styles.emoji}>{personality.emoji}</Text>
              <Text style={styles.personalityName}>{personality.name}</Text>
              <Text style={styles.personalityDescription}>
                {personality.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  personalitiesContainer: {
    gap: 15,
  },
  personalityCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 10,
  },
  personalityName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  personalityDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
});

export default PersonalitySelectionScreen;

// context/AudioContext.js
"use client";
import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isAudioOn, setIsAudioOn] = useState(false);

  const speak = (message) => {
    if (isAudioOn && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const sentences = message.split(/(?<=[.?!])\s+/); // Split message into sentences

      sentences.forEach((sentence, index) => {
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.rate = 0.8; // Adjust the speed of the voice
        utterance.pitch = 1; // Pitch of the voice
        utterance.volume = 1; // Volume level

        // Delay each sentence
        setTimeout(() => {
          synth.speak(utterance);
          console.log('Speaking:', sentence);
        }, index * 2000); // Adjust the delay as needed (2000ms = 2 seconds)
      });
    } else if (!isAudioOn) {
      console.log('Audio is off.');
    } else {
      console.error('SpeechSynthesis API not supported in this browser.');
    }
  };

  return (
    <AudioContext.Provider value={{ isAudioOn, setIsAudioOn, speak }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);

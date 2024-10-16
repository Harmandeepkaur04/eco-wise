"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isAudioOn, setIsAudioOn] = useState(false);

  const speak = (message) => {
    const synth = window.speechSynthesis;
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
          if (isAudioOn){
          synth.speak(utterance);
          console.log('Speaking:', sentence);}
        }, index * 2000); // Adjust the delay as needed (2000ms = 2 seconds)
      });
    } else if (!isAudioOn) {
      console.log('Audio is off.');
    } else {
      console.error('SpeechSynthesis API not supported in this browser.');
    }
  };

  useEffect(() => {
    if (!isAudioOn && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Cancel ongoing speech
      console.log('Speech synthesis canceled.');
    }
  }, [isAudioOn]);

  // Global click event listener to handle button and link clicks
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      
      // Check if the clicked element is a button or a link
      if (target.tagName === 'BUTTON') {
        speak(`You clicked ${target.innerText}`);
      }
      if (target.tagName === 'A') {
        speak(`Navigating to ${target.innerText}`);
      }
    };

    // Add event listener on mount
    window.addEventListener('click', handleClick);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isAudioOn]);

  return (
    <AudioContext.Provider value={{ isAudioOn, setIsAudioOn, speak }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);

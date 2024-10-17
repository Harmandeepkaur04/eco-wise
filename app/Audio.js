"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';

const AudioContext = createContext();

/*Reference: React Documentation for using API 
URL: https://reactjs.org/docs/context.html */
export const AudioProvider = ({ children }) => {
  const [isAudioOn, setIsAudioOn] = useState(false);
  
/* */

  const speak = (message) => {
    const synth = window.speechSynthesis;
    if (isAudioOn && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const sentences = message.split(/(?<=[.?!])\s+/); 

      sentences.forEach((sentence, index) => {
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.rate = 0.8; 
        utterance.pitch = 1; 
        utterance.volume = 1; 

        // Delay each sentence
        setTimeout(() => {
          if (isAudioOn){
          synth.speak(utterance);
          console.log('Speaking:', sentence);}
        }, index * 2000); 
      });
    } else if (!isAudioOn) {
      console.log('Audio is off.');
    } else {
      console.error('SpeechSynthesis API not supported in this browser.');
    }
  };

  useEffect(() => {
    if (!isAudioOn && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); 
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

import React, { useEffect, useRef, useState } from 'react';
import './section.css';

function FooterSec() {

  const btnRef = useRef(null);
  const contentRef = useRef(null);

    const speak = (text) => {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.volume = 1;
    textSpeak.pitch = -5;
    window.speechSynthesis.speak(textSpeak);
  };

  const wishMe = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) speak("Good Morning BOSS...");
    else if (hour >= 12 && hour < 17) speak("Good Afternoon BOSS...");
    else speak("Good Evening BOSS...");
  };
  

  useEffect(() => {

    const btn = btnRef.current;
    const content = contentRef.current;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      content.textContent = "Listening...";
      console.log("Speech recognition started...");
    };

    recognition.onresult = (event) => {
      console.log("Speech recognition result:", event);
      if (!event.results || !event.results[0]) { 
        speak("Sorry, I didn't catch that.");
        return;
      }
      const transcript = event.results[0][0].transcript;
      console.log("Transcript:", transcript);
      content.textContent = transcript;
      takeCommand(transcript.toLowerCase());
    };

    recognition.onspeechend = () => {
      console.log("Speech ended");
      recognition.stop();
    };

    recognition.onnomatch = () => {
      content.textContent = "Sorry, I didn't recognize that.";
      speak("Sorry, I didn't recognize that.");
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      if (event.error === "no-speech") {
        content.textContent = "Sorry, I couldn't hear you. Please try again.";
        speak("Sorry, I couldn't hear you. Please try again.");
      } else {
        console.error("Speech Recognition Error:", event.error);
        content.textContent = `Error occurred: ${event.error}`;
        speak(`There was an error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };

    const handleClick = () => {
      try {
        content.textContent = "Initializing mic...";
        setTimeout(() => {
          recognition.start();
        }, 800); 
      } catch (err) {
        console.error("Speech recognition error:", err);
        content.textContent = "Mic error. Please try again.";
        speak("Mic error. Please try again.");
      }
    };

    if (btn) btn.addEventListener('click', handleClick);
    return () => {
      if (btn) btn.removeEventListener('click', handleClick);
    };


  }, []);

  const takeCommand = (message) => {
    if (message.includes('hey') || message.includes('hello')) {
      speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
      window.open("https://google.com", "_blank");
      speak("Opening Google...");
    } else if (message.includes("open youtube")) {
      window.open("https://youtube.com", "_blank");
      speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Opening Facebook...");
    } else if (message.includes("open chatgpt")) {
      window.open("https://chatgpt.com", "_blank");
      speak("Opening chatgpt...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
      window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
      speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
      window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
      speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
      speak(new Date().toLocaleTimeString());
    } else if (message.includes('date')) {
      speak(new Date().toLocaleDateString());
    } else if (message.includes('calculator')) {
      speak("Opening Calculator");
      window.open('Calculator:///');
    }else if (message.includes('spotify')) {
      window.open("https://chatgpt.com", "_blank");
      speak("Opening chatgpt...");
    } else {
      window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
      speak("I found some information for " + message);
    }
  };

  return (
    
    <div className='footer-holder'>
      <div className="footer-container">
        {/* <button className="initialize" onClick={() => { speak("Initializing HARRY..."); wishMe(); }}>
          Initialize HARRY
        </button> */}
        <div className="image-container">
          <p>I'm a Virtual Assistant HARRY, How may I help you?</p>
          <h1>H A R R Y</h1>
          <p>by Darshan</p>
        </div>
        <div className="input" ref={btnRef}>
          <button className="talk">
            <i className="fas fa-microphone-alt"></i>
          </button>
          <h1 className="content" ref={contentRef}>Click here to speak</h1>
        </div>
      </div>
    </div>
  );
}

export default FooterSec;

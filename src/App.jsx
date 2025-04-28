import React, { useEffect, useState } from 'react';
import './App.css';
import Interface from './sections/interface';
import Loader from './sections/loader';


function App() {

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

  const[Loading,setLoading] = useState(true) 
  useEffect(()=>{

    const timer = setTimeout(()=>{
      speak("Initializing HARRY..."); 
      wishMe();
      setLoading(false)
    },2900)

    return ()=>{
      clearTimeout(timer)
    }

  },[])

  if(Loading){
    return (<Loader/>)
  }

  return (
    <div className="App">
      <Interface/>
    </div>
  );
}

export default App;

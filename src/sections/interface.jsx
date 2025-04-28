import React from 'react'
import "./section.css"
import HeroSec from './hero' 
import FooterSec from './footer';


function Interface() {
  return (
    <div className='interface-holder'>
      <div className="interface-container">
        <HeroSec/>
        <FooterSec/>
      </div>
    </div>
  )
}

export default Interface;

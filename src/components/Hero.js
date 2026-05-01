import React from "react";
import "./Hero.css";
import bracelet from "../assets/bracelet.png";

function Hero() {
  return (
    <section className="hero">
         <div className="floating bead1"></div>
  <div className="floating bead2"></div>
      
      <div className="hero-left">
        <img src={bracelet} alt="Beaded bracelet" />
      </div>

      <div className="hero-right">
        <h1>
          Design your own <br />
          <span>custom jewelry</span>
        </h1>

        <p>
          Create beautiful beaded jewelry by choosing your own colors,
          patterns, and wire styles.
        </p>

        <button className="cta">Start Designing</button>
      </div>
   
    </section>
  );
}

export default Hero;
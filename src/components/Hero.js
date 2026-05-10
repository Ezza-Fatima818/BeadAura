// Hero.jsx

import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="floating bead1"></div>
      <div className="floating bead2"></div>

      <div className="hero-left">
        <img
          src={require("../assets/bracelet.png")}
          alt="bracelet"
        />
      </div>

      <div className="hero-right">
        <h1>
          Create Your Own
          <br />
          <span>Luxury Jewelry</span>
        </h1>

        <p>
          Design personalized bracelets and jewelry
          with our modern customization studio.
          Create elegant pieces that reflect your
          unique style.
        </p>

        <button className="cta">
          Start Designing
        </button>
      </div>
    </section>
  );
}

export default Hero;
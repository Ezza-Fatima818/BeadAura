import React from "react";

export default function LetterBead({

  letter = "A",

  beadColor = "#f4f4f4",

  textColor = "#222",

  size = 42,

}) {

  return (

    <div
      style={{

        width: size,
        height: size,

        borderRadius: "50%",

        background: beadColor,

        display: "flex",

        justifyContent: "center",
        alignItems: "center",

        fontWeight: "700",

        fontSize: size * 0.45,

        color: textColor,

        border: "2px solid #ddd",

        boxShadow:
          "0 2px 5px rgba(0,0,0,0.15)",

        userSelect: "none"
      }}
    >

      {letter}

    </div>

  );
}
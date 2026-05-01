import { useDrop } from "react-dnd";
import { useRef } from "react";
import "./DesignPage.css";
import FlowerBracelet from "../components/templates/FlowerBracelet";
import CustomBracelet from "../components/templates/CustomBracelet";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { useState } from "react";

export default function DesignPage({
  selectedString,
  beads,
  setBeads,
  selectedBeadIndex,
  setSelectedBeadIndex
}) {
  const ref = useRef(null);
  const designRef = useRef(null);   // KEEP HERE
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  

  // Drag and Drop
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BEAD",

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));


  if (!selectedString) {
    return (
      <div className="canvas-area">
        <h2>Select a bracelet template ✨</h2>
      </div>
    );
  }
const getColoredImage = (src, hue, brightness, size) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const dimension =
        size === "large" ? 90 :
        size === "small" ? 45 : 65;

      canvas.width = dimension;
      canvas.height = dimension;

      // draw original bead
      ctx.drawImage(img, 0, 0, dimension, dimension);

      // apply color inside canvas
      ctx.globalCompositeOperation = "source-atop";
      ctx.filter = `hue-rotate(${hue}deg) brightness(${brightness})`;

      ctx.drawImage(canvas, 0, 0);

      resolve(canvas.toDataURL("image/png"));
    };
  });
};
// Save Design
const saveDesign = async () => {
  try {
    const designData = [];

    Object.keys(beads).forEach((key) => {
      const bead = beads[key];

      if (bead && bead.x !== undefined && bead.y !== undefined) {
        designData.push({
          x: bead.x,
          y: bead.y,
          src: bead.src,
          size: bead.size
        });
      }
    });

    console.log("FINAL DESIGN DATA:", designData);

    if (designData.length === 0) {
      alert("No beads to save!");
      return;
    }

    const canvas = await html2canvas(designRef.current, {
      useCORS: true,
        useCORS: true,
  backgroundColor: "#ffffff",
  scale: 2
    });

    const imageData = canvas.toDataURL("image/jpeg", 0.8);

    const response = await fetch("http://localhost:5000/api/save-design", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageData,   // ✅ this is what you'll display
        design: designData  // optional (for editing later)
      }),
    });

    const data = await response.json();
    console.log(data);

    alert("Design saved successfully!");

  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="canvas-area">

      {/* Bracelet Area */}
      <div
        ref={(node) => {
          ref.current = node;
          drop(node);
        }}
        className={`bracelet-area ${isOver ? "droppable" : ""}`}
      >
        {/* ONLY THIS gets captured */}
        <div ref={designRef}>
          
          {selectedString.name === "Flower Bracelet" && (
            <FlowerBracelet
              beads={beads}
              setBeads={setBeads}
              selectedBeadIndex={selectedBeadIndex}
              setSelectedBeadIndex={setSelectedBeadIndex}
            />
          )}

          {selectedString.name === "Custom Design" && (
            <CustomBracelet
               beads={beads}
               setBeads={setBeads}
               positions={positions}
               setPositions={setPositions}
                selectedBeadIndex={selectedBeadIndex}
                setSelectedBeadIndex={setSelectedBeadIndex}
/>
            
          )}

        </div>
      </div>


      {/* Buttons */}
      <div className="button-group">
        <button onClick={saveDesign}>
          Save Design
        </button>

        

        <button onClick={() => navigate("/saved-designs")}>
          View Saved Designs
        </button>
      </div>

    </div>
  );
}
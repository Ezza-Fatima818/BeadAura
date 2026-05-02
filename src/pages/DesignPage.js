import { useDrop } from "react-dnd";
import { useRef, useState } from "react";
import "./DesignPage.css";
import FlowerBracelet from "../components/templates/FlowerBracelet";
import CustomBracelet from "../components/templates/CustomBracelet";
import { useNavigate } from "react-router-dom";

export default function DesignPage({
  selectedString,
  beads,
  setBeads,
  selectedBeadIndex,
  setSelectedBeadIndex
}) {
  const ref = useRef(null);
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

  // 🔥 CANVAS DRAW FUNCTION (IMPORTANT)
  const drawDesignToCanvas = async (beads) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = 600;
    const height = 400;

    canvas.width = width;
    canvas.height = height;

    // white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const loadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => resolve(img);
      });

    for (const bead of Object.values(beads)) {
      if (!bead || bead.x === undefined || bead.y === undefined) continue;

      const img = await loadImage(bead.src);

      const size =
        bead.size === "large" ? 90 :
        bead.size === "small" ? 45 : 65;

      ctx.filter = `
        brightness(${bead.brightness || 1})
        sepia(1)
        saturate(5)
        hue-rotate(${bead.hue || 0}deg)
      `;

      ctx.drawImage(
        img,
        bead.x - size / 2,
        bead.y - size / 2,
        size,
        size
      );

      ctx.filter = "none";
    }

    return canvas.toDataURL("image/jpeg", 0.9);
  };

  // 🔥 FINAL SAVE DESIGN (NO html2canvas)
 const saveDesign = async () => {
  try {
    const designData = [];

    Object.values(beads).forEach((bead) => {
      if (bead && bead.x !== undefined && bead.y !== undefined) {
        designData.push({
          x: bead.x,
          y: bead.y,
          src: bead.src,
          size: bead.size,
          hue: bead.hue,
          brightness: bead.brightness
        });
      }
    });

    if (designData.length === 0) {
      alert("No beads to save!");
      return;
    }

    const imageData = await drawDesignToCanvas(beads);

    const userId = localStorage.getItem("userId"); // 🔥 important

    await fetch("http://localhost:5000/api/save-design", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         image: imageData,
         userId,
         material: "Custom",
         ageGroup: "18",
         color: "Custom",
         occasion: "None",
         description: "Canvas Design",
         status: "Pending"
      }),
    });

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
        <div>
          
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
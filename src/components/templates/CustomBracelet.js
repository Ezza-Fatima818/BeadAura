import { useState } from "react";
import { useDrop } from "react-dnd";
import "./CustomBracelet.css";

function DropPlaceholder({ pos, index, setBeads, beads }) {
  const [, drop] = useDrop(() => ({
    accept: "BEAD",

drop: (item) => {
  setBeads((prev) => ({
    ...prev,
    [index]: {
      src: item.src,
      hue: 0,
      size: "medium",
      brightness: 1,
      x: pos.x,   // 🔥 ADD THIS
      y: pos.y    // 🔥 ADD THIS
    }
  }));
}
  }));

  return (
    <div
      ref={drop}
      className="placeholder-bead"
      style={{
        left: pos.x,
        top: pos.y,
        pointerEvents: beads[index] ? "none" : "auto",
        zIndex: 1   // ✅ FIX
      }}
    />
  );
}

export default function CustomBracelet({
  beads,
  setBeads,
  positions,
  setPositions,
  selectedBeadIndex,
  setSelectedBeadIndex
}) {

  const [selectedTool] = useState("single");

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPositions((prev) => [...prev, { x, y }]);
  };

  return (
    <div className="custom-canvas" onClick={handleCanvasClick}>

      {/* Placeholders */}
      {positions.map((pos, index) => (
        <DropPlaceholder
          key={index}
          pos={pos}
          index={index}
          setBeads={setBeads}
          beads={beads}
        />
      ))}

      {/* Beads */}
      {positions.map((pos, index) => {
        const bead = beads[index];
        if (!bead) return null;

        return (
          <div
  key={index}
  onClick={(e) => {
    e.stopPropagation();
    setSelectedBeadIndex(index);
  }}
 style={{
  position: "absolute",
  left: pos.x,
  top: pos.y,
  transform: "translate(-50%, -50%)",

  width:
    bead.size === "large"
      ? 80
      : bead.size === "small"
      ? 40
      : 60,

  height:
    bead.size === "large"
      ? 80
      : bead.size === "small"
      ? 40
      : 60,

  border:
    selectedBeadIndex === index
      ? "2px solid gold"
      : "none",

  borderRadius: "50%",

  overflow: "hidden",     // ✅ ONLY ONCE
  isolation: "isolate",   // ✅ keeps blending inside

  cursor: "pointer",
  zIndex: 10
}}
>
  {/* Base image */}
  <img
  src={bead.src}
  alt="bead"
  style={{
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    filter: `
      brightness(${bead.brightness || 1})
      sepia(1)
      saturate(5)
      hue-rotate(${bead.hue || 0}deg)
    `
  }}
/>

  {/* Safe color layer */}

</div>
        );
      })}
    </div>
  );
}
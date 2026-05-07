import { useState } from "react";
import { useDrop } from "react-dnd";
import "./CustomBracelet.css";

// 🔥 Drop Placeholder
function DropPlaceholder({ index, pos, handleDrop, beads }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BEAD",

    drop: (item) => {
      console.log("🔥 DROPPED:", item);   // DEBUG
      handleDrop(index, item, pos);
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`placeholder-bead ${isOver ? "active" : ""}`}
      style={{
        left: pos.x,
        top: pos.y,
        pointerEvents: beads[index] ? "none" : "auto",  // 🔥 IMPORTANT
        zIndex: 1
      }}
    />
  );
}

// 🔥 Main Component
export default function CustomBracelet({
  beads,
  setBeads,
  positions,
  setPositions,
  selectedBeadIndex,
  setSelectedBeadIndex
}) {
  const [selectedTool] = useState("single");

  // ✅ Handle Drop (IMPORTANT)
  const handleDrop = (index, item, pos) => {
    setBeads((prev) => ({
      ...prev,
      [index]: {
        src: item.src,
        type: item.type,
        material: item.material,
        size: item.size,
        x: pos.x,
        y: pos.y,
        hue: 0,
        brightness: 1
      }
    }));
  };

  // ✅ Add new position on click
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
          handleDrop={handleDrop}
          beads={beads}
        />
      ))}

      {/* Beads / Components */}
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
              overflow: "hidden",
              isolation: "isolate",
              cursor: "pointer",
              zIndex: 10
            }}
          >
            {/* Image */}
            <img
              src={bead.src}
              alt="bead"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",

                // 🔥 IMPORTANT FIX (components no color change)
                filter:
                  bead.type === "component"
                    ? "none"
                    : `
                      brightness(${bead.brightness || 1})
                      sepia(1)
                      saturate(5)
                      hue-rotate(${bead.hue || 0}deg)
                    `
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
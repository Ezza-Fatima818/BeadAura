import { useDrop } from "react-dnd";

function DropPlaceholder({ index, pos, handleDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BEAD",

    drop: (item) => {
      handleDrop(index, item.src, item.color, item.size);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`placeholder-bead ${
        isOver ? "active-placeholder" : ""
      }`}
      style={{
        left: pos.x,
        top: pos.y,
      }}
    />
  );
}

export default function FlowerBracelet({
  beads,
  setBeads,
  selectedBeadIndex,
  setSelectedBeadIndex,
}) {
  const flowerPattern = [];

  const centerX = 300;
  const centerY = 280;
  const radius = 210;
  const totalPoints = 20;

  for (let i = 0; i < totalPoints; i++) {
    const angle = (i / totalPoints) * 2 * Math.PI;

    if (i % 4 === 0) {
      const flowerDistance = radius + 55;

      flowerPattern.push({
        type: "flower",
        x: centerX + flowerDistance * Math.cos(angle),
        y: centerY + flowerDistance * Math.sin(angle),
      });
    } else {
      flowerPattern.push({
        type: "bead",
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    }
  }

  const createFlowerPetals = (cx, cy) => {
    const petals = [{ x: cx, y: cy }];
    const r = 30;

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * 2 * Math.PI;

      petals.push({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
      });
    }

    return petals;
  };

  const allPlaceholders = [];

  flowerPattern.forEach((item) => {
    if (item.type === "flower") {
      createFlowerPetals(item.x, item.y).forEach((p) =>
        allPlaceholders.push(p)
      );
    } else {
      allPlaceholders.push(item);
    }
  });

  // ✅ FIXED
 const handleDrop = (index, src, color, size) => {
  setBeads((prev) => ({
    ...prev,
    [index]: {
      src,
      color,
      size,
      hue: 0,
      brightness: 1
    },
  }));
};

  return (
    <>
      {/* Placeholders */}
      {allPlaceholders.map((pos, index) => (
        <DropPlaceholder
          key={index}
          index={index}
          pos={pos}
          handleDrop={handleDrop}
        />
      ))}

      {/* Beads */}
      {Object.entries(beads || {}).map(([index, bead]) => {
        const i = Number(index);
        const position = allPlaceholders[i];

        if (!bead || !position) return null;

        return (
          <div
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBeadIndex(i);
            }}
            style={{
              position: "absolute",
              left: position.x,
              top: position.y,
              transform: "translate(-50%, -50%)",
              width:
                bead.size === "large"
                  ? 55
                  : bead.size === "small"
                  ? 25
                  : 35,
              height:
                bead.size === "large"
                  ? 55
                  : bead.size === "small"
                  ? 25
                  : 35,
              border:
                selectedBeadIndex === i
                  ? "2px solid gold"
                  : "none",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <img
              src={bead.src}
              alt="bead"
               style={{
               width: "100%",
               height: "100%",
              borderRadius: "50%",
               filter: `brightness(${bead.brightness || 1})`
               
              
  }}
              

              

              
               
              
            />

            {bead.color && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: bead.color,
                  mixBlendMode: "multiply",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
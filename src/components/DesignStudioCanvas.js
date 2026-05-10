import React, {
  useRef,
  useState,
  useEffect
} from "react";

import {
  useDrop
} from "react-dnd";

import "./DesignStudioCanvas.css";



export default function DesignStudioCanvas({
  tool,
  color,
  size,
  shapes,
  setShapes,
  deleteSelectedShape,
  selectedIds,
  setSelectedIds,
  placedImages,
setPlacedImages,
}) {

  const canvasRef = useRef(null);

  const containerRef = useRef(null);

  const [drawing, setDrawing] =
    useState(false);

  const [draggingId, setDraggingId] =
    useState(null);

  const [resizingId, setResizingId] =
    useState(null);

  /* =================================
     DROPPED BEADS
  ================================= */

  const [placedBeads, setPlacedBeads] =
    useState([]);

    const [placedChains, setPlacedChains] =
  useState([]);
const [selectedBeadId, setSelectedBeadId] =
  useState(null);

const [draggingBeadId, setDraggingBeadId] =
  useState(null);

const [resizingBeadId, setResizingBeadId] =
  useState(null);

const [selectedImageId, setSelectedImageId] =
  useState(null);

const [draggingImageId, setDraggingImageId] =
  useState(null);

const [resizingImageId, setResizingImageId] =
  useState(null);

const [rotatingImageId, setRotatingImageId] =
  useState(null);

const [selectedChainId, setSelectedChainId] =
  useState(null);

const [draggingChainId, setDraggingChainId] =
  useState(null);

const [resizingChainId, setResizingChainId] =
  useState(null);

const [rotatingChainId, setRotatingChainId] =
  useState(null);
const [draggingPoint, setDraggingPoint] =
  useState(null);


  /* =================================
     DROP TARGET
  ================================= */

 const [{ isOver }, drop] =
  useDrop(() => ({
    accept: ["BEAD", "CHAIN"],

    drop: (item, monitor) => {

      console.log(item);

      const offset =
        monitor.getClientOffset();

      const rect =
        containerRef.current.getBoundingClientRect();

      const x =
        offset.x - rect.left;

      const y =
        offset.y - rect.top;

      /* =====================
         CHAIN
      ===================== */

      if (
        item.type === "CHAIN"
      ) {

        setPlacedChains(
          (prev) => [
            ...prev,

            {
              id: Date.now(),

  points: [
    {
      x,
      y,
    },

    {
      x,
      y: y + 120,
    },

    {
      x,
      y: y + 240,
    },
  ],

  thickness: 12,

  rotation: 0,
            },
          ]
        );

        return;
      }

      /* =====================
         BEAD
      ===================== */

      setPlacedBeads((prev) => [
        ...prev,

        {
          id: Date.now(),

          x,
          y,

          src: item.src,

          width: 80,

          height: 80,
        },
      ]);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  /* =================================
     CANVAS INIT
  ================================= */

  useEffect(() => {
    

    const canvas =
    canvasRef.current;

  canvas.width = 800;

  canvas.height = 3000;

  }, []);

  /* =================================
     DRAWING
  ================================= */

  const startDrawing = (e) => {
    if (
      tool !== "pen" &&
      tool !== "eraser"
    )
      return;

    setDrawing(true);

    draw(e);
  };

  const endDrawing = () => {
    setDrawing(false);

    const ctx =
      canvasRef.current.getContext("2d");

    ctx.beginPath();
  };

  const draw = (e) => {
    if (!drawing) return;

    if (
      tool !== "pen" &&
      tool !== "eraser"
    )
      return;

    const canvas = canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    const rect =
      canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    ctx.lineWidth = size;

    ctx.lineCap = "round";

    if (tool === "eraser") {
      ctx.globalCompositeOperation =
        "destination-out";
    } else {
      ctx.globalCompositeOperation =
        "source-over";

      ctx.strokeStyle = color;
    }

    ctx.lineTo(x, y);

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(x, y);
  };

  /* =================================
     DRAGGING / RESIZING
  ================================= */

const createCurvePath = (
  points
) => {

  if (
    !points ||
    points.length < 2
  ) {
    return "";
  }

  let d = `
    M ${points[0].x}
    ${points[0].y}
  `;

  for (
    let i = 1;
    i < points.length;
    i++
  ) {

    const prev =
      points[i - 1];

    const curr =
      points[i];

    d += `
      L ${curr.x}
      ${curr.y}
    `;
  }

  return d;
};

const handleMouseMove = (e) => {
  /* PREVENT UNNECESSARY MOVES */

if (
  draggingId === null &&
  resizingId === null &&

  draggingBeadId === null &&
  resizingBeadId === null &&

  draggingImageId === null &&
  resizingImageId === null &&
  rotatingImageId === null &&

  draggingChainId === null &&
  resizingChainId === null &&
  rotatingChainId === null &&

  draggingPoint === null
) {
  return;
}

  const rect =
    containerRef.current.getBoundingClientRect();

  const x = e.clientX - rect.left;

  const y = e.clientY - rect.top;

  /* ================================
   CURVE POINT DRAG
================================= */

if (draggingPoint) {

  setPlacedChains((prev) =>
    prev.map((chain) => {

      if (
        chain.id !==
        draggingPoint.chainId
      ) {
        return chain;
      }

      const updatedPoints = [
        ...chain.points,
      ];

      updatedPoints[
        draggingPoint.pointIndex
      ] = {
        x,
        y,
      };

      return {
        ...chain,

        points:
          updatedPoints,
      };
    })
  );

  return;
}

  /* ================================
     SHAPE RESIZE
  ================================= */

  if (resizingId !== null) {
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === resizingId
          ? {
              ...shape,

              size: Math.max(
                20,
                x - shape.x
              ),
            }
          : shape
      )
    );

    return;
  }

  /* ================================
     SHAPE DRAG
  ================================= */

  if (draggingId !== null) {
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === draggingId
          ? {
              ...shape,

              x:
                x -
                shape.size / 2,

              y:
                y -
                shape.size / 2,
            }
          : shape
      )
    );

    return;
  }

  /* ================================
     BEAD RESIZE
  ================================= */

  if (resizingBeadId !== null) {
    setPlacedBeads((prev) =>
      prev.map((bead) =>
        bead.id ===
        resizingBeadId
          ? {
              ...bead,

              width: Math.max(
                30,
                x - bead.x
              ),

              height: Math.max(
                30,
                y - bead.y
              ),
            }
          : bead
      )
    );

    return;
  }

  /* ================================
     BEAD DRAG
  ================================= */

  if (draggingBeadId !== null) {
    setPlacedBeads((prev) =>
      prev.map((bead) =>
        bead.id ===
        draggingBeadId
          ? {
              ...bead,

              x,
              y,
            }
          : bead
      )
    );

    return;
  }






/* ================================
   CHAIN DRAG
================================= */

/* ================================
   CHAIN DRAG
================================= */

if (draggingChainId !== null) {

  setPlacedChains((prev) =>
    prev.map((chain) => {

      if (
        chain.id !==
        draggingChainId
      ) {
        return chain;
      }

      const firstPoint =
        chain.points[0];

      const offsetX =
        x - firstPoint.x;

      const offsetY =
        y - firstPoint.y;

      return {
        ...chain,

        points:
          chain.points.map(
            (point) => ({
              x:
                point.x +
                offsetX,

              y:
                point.y +
                offsetY,
            })
          ),
      };
    })
  );

  return;
}


  /* ================================
     IMAGE RESIZE
  ================================= */

  if (resizingImageId !== null) {
    setPlacedImages((prev) =>
      prev.map((img) =>
        img.id ===
        resizingImageId
          ? {
              ...img,

              width: Math.max(
                40,
                x - img.x
              ),

              height: Math.max(
                40,
                y - img.y
              ),
            }
          : img
      )
    );

    return;
  }

  /* ================================
     IMAGE ROTATE
  ================================= */

  if (rotatingImageId !== null
    
  ) {
    setPlacedImages((prev) =>
      prev.map((img) =>
        img.id ===
        rotatingImageId
          ? {
              ...img,

              rotation:
                Math.atan2(
                  y - img.y,
                  x - img.x
                ) *
                (180 / Math.PI),
            }
          : img
      )
    );

    return;
  }

  /* ================================
     IMAGE DRAG
  ================================= */

  if (draggingImageId !== null) {
    setPlacedImages((prev) =>
      prev.map((img) =>
        img.id ===
        draggingImageId
          ? {
              ...img,

              x,
              y,
            }
          : img
      )
    );
  }
};

  const handleMouseUp = () => {
  /* SHAPES */

  setDraggingId(null);
  setResizingId(null);

  /* BEADS */

  setDraggingBeadId(null);
  setResizingBeadId(null);

  /* IMAGES */

  setDraggingImageId(null);
  setResizingImageId(null);
  setRotatingImageId(null);

  setDraggingChainId(null);

setResizingChainId(null);
setRotatingChainId(null);
setDraggingPoint(null);
  /* DRAWING */

  endDrawing();
};

/* =================================
   UI
================================= */

const generateChainLinks = (
  points
) => {

  const links = [];

  for (
    let i = 0;
    i < points.length - 1;
    i++
  ) {

    const start =
      points[i];

    const end =
      points[i + 1];

    const dx =
      end.x - start.x;

    const dy =
      end.y - start.y;

    const distance =
      Math.sqrt(
        dx * dx + dy * dy
      );

    const steps =
      Math.floor(
        distance / 16
      );

    for (
      let j = 0;
      j <= steps;
      j++
    ) {

      const t = j / steps;

      links.push({
        x:
          start.x + dx * t,

        y:
          start.y + dy * t,

        angle:
          Math.atan2(
            dy,
            dx
          ) *
          (180 / Math.PI),
      });
    }
  }

  return links;
};
return (
  <div
    ref={(node) => {
      containerRef.current = node;

      drop(node);
    }}
    className="design-studio-canvas"
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseDown={() => {

  /* SHAPES */

  setSelectedIds([]);

  /* BEADS */

  setSelectedBeadId(null);

  /* IMAGES */

  setSelectedImageId(null);

  /* CHAINS */

  setSelectedChainId(null);
}}
  >
    {/* DRAWING LAYER */}

    <canvas
      ref={canvasRef}
      width={800}
      height={3000}
      className="drawing-canvas"
      style={{
        border: isOver
          ? "2px dashed #8e44ad"
          : "1px solid #ddd",
      }}
      onMouseDown={
        tool === "pen" ||
        tool === "eraser"
          ? startDrawing
          : null
      }
      onMouseMove={
        tool === "pen" ||
        tool === "eraser"
          ? draw
          : null
      }
      onMouseLeave={endDrawing}
    />

    {/* MAIN LAYER */}

    <div
      className="canvas-layer"
      style={{
        pointerEvents:
          tool === "select"
            ? "auto"
            : "none",
      }}
    >
      {/* SHAPES */}

      {shapes?.map((shape) => {
        return (
          <div
            key={shape.id}

             className={`canvas-item ${
               selectedIds.includes(
              shape.id
                )
              ? "selected-item"
             : ""
              }`}
           
            onMouseDown={(e) => {
              e.stopPropagation();

              if (
                tool !== "select"
              )
                return;

              /* RESET OTHER TOOLS */

              setDraggingBeadId(
                null
              );

              setResizingBeadId(
                null
              );

              setDraggingImageId(
                null
              );

              setResizingImageId(
                null
              );

              setRotatingImageId(
                null
              );

              /* MULTI SELECT */

              if (e.ctrlKey) {
                setSelectedIds(
                  (prev) =>
                    prev.includes(
                      shape.id
                    )
                      ? prev.filter(
                          (id) =>
                            id !==
                            shape.id
                        )
                      : [
                          ...prev,
                          shape.id,
                        ]
                );
              } else {
                setSelectedIds([
                  shape.id,
                ]);
              }

              /* DRAG */

              if (
                resizingId ===
                null
              ) {
                setDraggingId(
                  shape.id
                );
              }
            }}
            style={{
              left: shape.x,

              top: shape.y,

              width:
                shape.type ===
                "oval"
                  ? shape.size + 20
                  : shape.type ===
                    "coin"
                  ? shape.size + 20
                  : shape.type ===
                    "cylinder"
                  ? shape.size - 10
                  : shape.size,

              height:
                shape.type ===
                "oval"
                  ? shape.size - 10
                  : shape.type ===
                    "coin"
                  ? shape.size - 20
                  : shape.type ===
                    "cylinder"
                  ? shape.size + 20
                  : shape.type ===
                    "teardrop"
                  ? shape.size + 10
                  : shape.size,

              background:
                shape.type ===
                "donut"
                  ? "transparent"
                  : shape.color,

              border:
                shape.type ===
                "donut"
                  ? `8px solid ${shape.color}`
                  : undefined,

              borderRadius:
                shape.type ===
                "circle"
                  ? "50%"
                  : shape.type ===
                    "oval"
                  ? "50% / 30%"
                  : shape.type ===
                    "cube"
                  ? "5px"
                  : shape.type ===
                    "coin"
                  ? "50%"
                  : shape.type ===
                    "cylinder"
                  ? "14px"
                  : "0",

              clipPath:
                shape.type ===
                "octagon"
                  ? "polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)"
                  : shape.type ===
                    "bicone"
                  ? "polygon(50% 0%,100% 50%,50% 100%,0% 50%)"
                  : "none",

              transform:
                shape.type ===
                "teardrop"
                  ? "rotate(45deg)"
                  : "none",
            }}
          >
            {/* RESIZE */}

            {selectedIds.includes(
              shape.id
            ) && (
              <div
                className="resize-handle"
                onMouseDown={(
                  e
                ) => {
                  e.stopPropagation();

                  if (
                    tool !==
                    "select"
                  )
                    return;

                  if (
                    e.button !==
                    0
                  )
                    return;

                  setDraggingId(
                    null
                  );

                  setResizingId(
                    shape.id
                  );
                }}
              />
            )}
{/* DELETE */}

{selectedIds.includes(
  shape.id
) && (
  <div
    className="delete-btn"
    onClick={(e) => {
      e.stopPropagation();

      deleteSelectedShape();
    }}
  >
    ✕
  </div>
)}

</div>
);
})}

{/* =================================
   DROPPED BEADS
================================= */}

{placedBeads.map((bead) => (
  <div
    key={bead.id}
     className={`canvas-item ${
    selectedBeadId === bead.id
      ? "selected-item"
      : ""
  }`}
    
    onMouseDown={(e) => {
      e.stopPropagation();

      if (tool !== "select")
        return;

      if (e.button !== 0)
        return;

      setSelectedBeadId(bead.id);

      setDraggingBeadId(bead.id);
    }}
    style={{
      left: bead.x,

      top: bead.y,

      width: bead.width || 80,

      height: bead.height || 80,

      transform:
        "translate(-50%, -50%)",
    }}
  >
    <img
      src={bead.src}
      alt="Dropped Bead"
      draggable={false}
      className="design-bead"
    />

    {/* RESIZE */}

    {selectedBeadId === bead.id && (
      <div
        className="resize-handle"
        onMouseDown={(e) => {
          e.stopPropagation();

          setDraggingBeadId(null);

          setResizingBeadId(
            bead.id
          );
        }}
      />
    )}
       {/* DELETE */}

    {selectedBeadId === bead.id && (
      <div
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();

          setPlacedBeads((prev) =>
            prev.filter(
              (b) => b.id !== bead.id
            )
          );

          setSelectedBeadId(null);
        }}
      >
        ✕
      </div>
    )}

    {/* DUPLICATE */}

    {selectedBeadId === bead.id && (
      <div
        className="duplicate-btn"
        onClick={(e) => {
          e.stopPropagation();

          setPlacedBeads((prev) => [
            ...prev,
            {
              ...bead,

              id: Date.now(),

              x: bead.x + 30,
              y: bead.y + 30,

              width:
                bead.width || 80,

              height:
                bead.height || 80,
            },
          ]);
        }}
      >
        ⧉
      </div>
    )}
  </div>
))}

{/* =================================
   CHAINS
================================= */}

{placedChains.map((chain) => (
  <div
    key={chain.id}
    
    onMouseDown={(e) => {
      e.stopPropagation();

      if (tool !== "select")
        return;

      if (e.button !== 0)
        return;

       setSelectedChainId(chain.id);

  /* STOP OTHER ACTIONS */

  setDraggingBeadId(null);

  setDraggingImageId(null);

  setDraggingId(null);

  setResizingChainId(null);

  /* START DRAG */

  setDraggingChainId(chain.id);
    }}
    style={{
   position: "absolute",

  inset: 0,

  pointerEvents: "none",
}}

  className={`chain-item ${
  selectedChainId === chain.id
    ? "selected-item"
    : ""
}`}
  >
    <svg
  className="chain-svg"

  width="100%"

  height="100%"
>
  {generateChainLinks(
  chain.points
).map((link, index) => (

<ellipse
  key={index}

  cx={
    index % 2 === 0
      ? link.x
      : link.x + 2
  }

  cy={link.y}

  rx="7"

  ry="12"

  fill="none"

  stroke="#D4AF37"

  strokeWidth="3"

  transform={`
    rotate(
      ${
        index % 2 === 0
          ? 0
          : 90
      }
      ${
        index % 2 === 0
          ? link.x
          : link.x + 2
      }
      ${link.y}
    )
  `}
/>

))}
</svg>

{chain.points.map(
  (point, index) => (

    <div
      key={index}

      className="curve-point"

      style={{
        position: "absolute",

  left: point.x,

  top: point.y,
   pointerEvents: "auto",
      }}

      onMouseDown={(e) => {

        e.stopPropagation();

        setDraggingPoint({
          chainId: chain.id,

          pointIndex: index,
        });
      }}
    />
  )
)}





    {/* DELETE */}

    {selectedChainId === chain.id && (
      <div
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();

          setPlacedChains((prev) =>
            prev.filter(
              (c) => c.id !== chain.id
            )
          );

          setSelectedChainId(null);
        }}
      >
        ✕
      </div>
    )}

    {/* DUPLICATE */}

{selectedChainId === chain.id && (
  <div
    className="duplicate-btn"
    onClick={(e) => {

      e.stopPropagation();

      setPlacedChains((prev) => [
        ...prev,

        {
          ...chain,

          id: Date.now(),

          points:
            chain.points.map(
              (point) => ({
                x:
                  point.x + 30,

                y:
                  point.y + 30,
              })
            ),
        },
      ]);
    }}
  >
    ⧉
  </div>
)}

  

  </div>
))}



{/* =================================
   CUSTOM UPLOADED IMAGES
================================= */}

{placedImages?.map((img) => (
  <div
    key={img.id}
    className={`canvas-item ${
      selectedImageId === img.id
        ? "selected-item"
        : ""
    }`}
    onMouseDown={(e) => {
      e.stopPropagation();

      if (tool !== "select")
        return;

      if (e.button !== 0)
        return;

      setSelectedImageId(img.id);

      setDraggingImageId(img.id);
    }}
    style={{
      left: img.x,

      top: img.y,

      width: img.width || 120,

      height: img.height || 120,

      transform: `
        translate(-50%, -50%)
        rotate(${img.rotation || 0}deg)
      `,
    }}
  >
    <img
      src={img.src}
      alt="custom"
      draggable={false}
      className="design-image"
    />

    {/* RESIZE */}

    {selectedImageId === img.id && (
      <div
        className="resize-handle"
        onMouseDown={(e) => {
          e.stopPropagation();

          setDraggingImageId(
            null
          );

          setResizingImageId(
            img.id
          );
        }}
      />
    )}

    {/* ROTATE */}

    {selectedImageId === img.id && (
      <div
        className="rotate-handle"
        onMouseDown={(e) => {
          e.stopPropagation();

          setDraggingImageId(
            null
          );

          setRotatingImageId(
            img.id
          );
        }}
      />
    )}

    {/* DELETE */}

    {selectedImageId === img.id && (
      <div
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();

          setPlacedImages((prev) =>
            prev.filter(
              (i) => i.id !== img.id
            )
          );

          setSelectedImageId(null);
        }}
      >
        ✕
      </div>
    )}

    {/* DUPLICATE */}

    {selectedImageId === img.id && (
      <div
        className="duplicate-btn"
        onClick={(e) => {
          e.stopPropagation();

          setPlacedImages((prev) => [
            ...prev,
            {
              ...img,

              id: Date.now(),

              x: img.x + 30,

              y: img.y + 30,
            },
          ]);
        }}
      >
        ⧉
      </div>
    )}
  </div>
))}

</div>


</div>
  );
}
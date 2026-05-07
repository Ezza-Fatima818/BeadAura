import React, {
  useRef,
  useState,
  useEffect
} from "react";

import {
  useDrop
} from "react-dnd";

export default function DesignStudioCanvas({
  tool,
  color,
  size,
  shapes,
  setShapes,
  deleteSelectedShape,
  selectedIds,
  setSelectedIds
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

  /* =================================
     DROP TARGET
  ================================= */

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BEAD",

    drop: (item, monitor) => {
      const offset =
        monitor.getClientOffset();

      const rect =
        containerRef.current.getBoundingClientRect();

      const x = offset.x - rect.left;

      const y = offset.y - rect.top;

      setPlacedBeads((prev) => [
        ...prev,
        {
          id: Date.now(),
          x,
          y,
          src: item.src,
          size: item.size,
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
    const canvas = canvasRef.current;

    canvas.width = canvas.offsetWidth;

    canvas.height = canvas.offsetHeight;
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

  const handleMouseMove = (e) => {
    const rect =
      containerRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    /* RESIZE */

    if (resizingId !== null) {
      setShapes((prev) =>
        prev.map((s) =>
          s.id === resizingId
            ? {
                ...s,
                size: Math.max(
                  20,
                  x - s.x
                ),
              }
            : s
        )
      );

      return;
    }

    /* DRAG */

    if (draggingId !== null) {
      setShapes((prev) =>
        prev.map((s) =>
          s.id === draggingId
            ? {
                ...s,
                x: x - s.size / 2,
                y: y - s.size / 2,
              }
            : s
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingId(null);

    endDrawing();

    setResizingId(null);
  };

  /* =================================
     UI
  ================================= */

  return (
    <div
      ref={(node) => {
        containerRef.current = node;

        drop(node);
      }}
      style={{
  position: "relative",

  width: "100%",

  minHeight: "1400px",

  height: "100%",

  background: "#fff",

  borderRadius: "20px",
}}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >

      {/* DRAWING LAYER */}

      <canvas
        ref={canvasRef}
        width={800}
        height={1400}
        style={{
          position: "absolute",

          top: 0,
          left: 0,

          width: "100%",
          height: "1400px",

          background: "#fff",

          borderRadius: "20px",

          border: isOver
            ? "2px dashed #8e44ad"
            : "1px solid #ddd",

          zIndex: 1,
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

      {/* SHAPE + BEAD LAYER */}

      <div
        style={{
          position: "absolute",

          top: 0,
          left: 0,

          width: "100%",
          height: "100%",

          zIndex: 5,

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
              onMouseDown={(e) => {
                e.stopPropagation();

                if (tool !== "select")
                  return;

                /* MULTI SELECT */

                if (e.ctrlKey) {
                  setSelectedIds(
                    (prev) =>
                      prev.includes(shape.id)
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
                  resizingId === null
                ) {
                  setDraggingId(
                    shape.id
                  );
                }
              }}

              style={{
                position: "absolute",

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
                    : selectedIds.includes(
                        shape.id
                      )
                    ? "2px solid #7c3aed"
                    : `2px solid ${shape.color}`,

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

                cursor: "grab",
              }}
            >

              {/* RESIZE */}

              {selectedIds.includes(
                shape.id
              ) && (
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();

                    setResizingId(
                      shape.id
                    );
                  }}
                  style={{
                    position:
                      "absolute",

                    right: -6,
                    bottom: -6,

                    width: 12,
                    height: 12,

                    background:
                      "#7c3aed",

                    borderRadius:
                      "50%",

                    cursor:
                      "nwse-resize",

                    zIndex: 20,
                  }}
                />
              )}

              {/* DELETE */}

              {selectedIds.includes(
                shape.id
              ) && (
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();

                    deleteSelectedShape();
                  }}
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                  style={{
                    position:
                      "absolute",

                    top: -10,
                    right: -10,

                    width: 20,
                    height: 20,

                    background:
                      "#ef4444",

                    color: "#fff",

                    fontSize: "14px",

                    display: "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    borderRadius:
                      "50%",

                    cursor:
                      "pointer",

                    zIndex: 30,
                  }}
                >
                  ✕
                </div>
              )}

            </div>
          );
        })}

        {/* DROPPED BEADS */}

        {placedBeads.map((bead) => (
          <img
            key={bead.id}
            src={bead.src}
            alt="Dropped Bead"
            style={{
              position: "absolute",

              left: bead.x,
              top: bead.y,

              width: 50,
              height: 50,

              objectFit: "cover",

              borderRadius: "50%",

              transform:
                "translate(-50%, -50%)",

              zIndex: 15,

              cursor: "grab",
            }}
          />
        ))}

      </div>
    </div>
  );
}
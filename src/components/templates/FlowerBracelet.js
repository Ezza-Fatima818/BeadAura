import { useDrop } from "react-dnd";

import {
  useEffect,
  useState,
} from "react";

import useDragElement
from "../../hooks/useDragElement";

import useResizeElement
from "../../hooks/useResizeElement";

/* =================================
   DROP PLACEHOLDER
================================= */

function DropPlaceholder({
  placeholder,
  index,
  handleDrop,

  selectedPlaceholder,
  setSelectedPlaceholder,

  setDraggingId,

  setResizingPlaceholderId,

  resizingPlaceholderId,
}) {

  const [{ isOver }, drop] =
    useDrop(() => ({
      accept: "BEAD",

      drop: (item) => {

        handleDrop(
          index,
          item,
          placeholder
        );
      },

      collect: (monitor) => ({
        isOver:
          !!monitor.isOver(),
      }),
    }));

  return (
    <div
      ref={drop}

      onMouseDown={(e) => {

        e.stopPropagation();

        if (
          resizingPlaceholderId !==
          null
        )
          return;

        setDraggingId(
          placeholder.id
        );

        setSelectedPlaceholder(
          placeholder
        );
      }}

      className={`placeholder-bead ${
        isOver
          ? "active-placeholder"
          : ""
      }`}

      style={{
        position: "absolute",

        left: placeholder.x,

        top: placeholder.y,

        width: placeholder.size,

        height: placeholder.size,

        transform:
          "translate(-50%, -50%)",

        borderRadius: "50%",

        border:
          selectedPlaceholder?.id ===
          placeholder.id
            ? "2px solid gold"
            : "2px dashed #b388ff",

        cursor: "move",

        zIndex: 5,
      }}
    >

      {/* RESIZE HANDLE */}

      {selectedPlaceholder?.id ===
        placeholder.id && (

        <div
          onMouseDown={(e) => {

            e.stopPropagation();

            setDraggingId(null);

            setResizingPlaceholderId(
              placeholder.id
            );
          }}

          style={{
            position: "absolute",

            right: -8,

            bottom: -8,

            width: 18,

            height: 18,

            borderRadius: "50%",

            background: "#7c3aed",

            cursor: "nwse-resize",

            zIndex: 100,
          }}
        />
      )}

    </div>
  );
}

/* =================================
   MAIN COMPONENT
================================= */

export default function FlowerBracelet({

  beads,
  setBeads,

  selectedBeadIndex,
  setSelectedBeadIndex,

  selectedPlaceholder,
  setSelectedPlaceholder,

  placeholders,
  setPlaceholders,
}) {

  /* =================================
     STATES
  ================================= */

  const [draggingId,
    setDraggingId] =
    useState(null);

  const [
    resizingPlaceholderId,
    setResizingPlaceholderId
  ] = useState(null);

  /* =================================
     HOOKS
  ================================= */

  const { dragElement } =
    useDragElement(
      placeholders,
      setPlaceholders
    );

  const { resizeElement } =
    useResizeElement(
      placeholders,
      setPlaceholders
    );

  /* =================================
     GENERATE TEMPLATE
  ================================= */

  useEffect(() => {

    if (
      placeholders.length > 0
    )
      return;

    const generated = [];

    const centerX = 400;

    const centerY = 400;

    const totalPoints = 20;

    const baseRadius = 180;

    const createFlowerPetals =
      (
        cx,
        cy
      ) => {

        const petals = [
          {
            x: cx,
            y: cy,
          },
        ];

        const r = 30;

        for (
          let i = 0;
          i < 5;
          i++
        ) {

          const angle =
            (i / 5) *
            2 *
            Math.PI;

          petals.push({
            x:
              cx +
              r *
                Math.cos(
                  angle
                ),

            y:
              cy +
              r *
                Math.sin(
                  angle
                ),
          });
        }

        return petals;
      };

    for (
      let i = 0;
      i < totalPoints;
      i++
    ) {

      const angle =
        (i / totalPoints) *
        2 *
        Math.PI;

      const x =
        centerX +
        baseRadius *
          Math.cos(
            angle
          );

      const y =
        centerY +
        baseRadius *
          Math.sin(
            angle
          );

      if (
        i % 4 === 0
      ) {

        const flowerDistance =
          baseRadius + 55;

        const flowerX =
          centerX +
          flowerDistance *
            Math.cos(
              angle
            );

        const flowerY =
          centerY +
          flowerDistance *
            Math.sin(
              angle
            );

        createFlowerPetals(
          flowerX,
          flowerY
        ).forEach((p) => {

          generated.push({
            id:
              Date.now() +
              Math.random(),

            x: p.x,

            y: p.y,

            size: 40,
          });
        });

      } else {

        generated.push({
          id:
            Date.now() +
            Math.random(),

          x,

          y,

          size: 40,
        });
      }
    }

    setPlaceholders(
      generated
    );

 }, [
  placeholders.length,
  setPlaceholders,
]);

  /* =================================
     HANDLE DROP
  ================================= */

  const handleDrop = (
    index,
    item,
    pos
  ) => {

    setBeads((prev) => ({
      ...prev,

      [pos.id]: {

        src: item.src,

        type: item.type,

        material:
          item.material,

        x: pos.x,

        y: pos.y,

        hue: 0,

        brightness: 1,

        rotation: 0,
      },
    }));
  };

  /* =================================
     DRAG + RESIZE
  ================================= */

  useEffect(() => {

    const handleMouseMove =
      (e) => {

        const rect =
          document
            .querySelector(
              ".bracelet-area"
            )
            ?.getBoundingClientRect();

        if (!rect)
          return;

        const x =
          e.clientX -
          rect.left;

        const y =
          e.clientY -
          rect.top;

        /* DRAG */

        if (
          draggingId !== null
        ) {

          dragElement(
            draggingId,
            x,
            y
          );
        }

        /* PLACEHOLDER RESIZE */

        if (
          resizingPlaceholderId !==
          null
        ) {

          resizeElement(
            resizingPlaceholderId,

            Math.max(
              20,
              x / 5
            )
          );
        }
      };

    const handleMouseUp =
      () => {

        setDraggingId(null);

        setResizingPlaceholderId(
          null
        );
      };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };

  }, [
    draggingId,

  resizingPlaceholderId,

  dragElement,

  resizeElement,
  ]);

  /* =================================
     UI
  ================================= */

  return (
    <>

      {/* PLACEHOLDERS */}

      {placeholders.map(
        (
          placeholder,
          index
        ) => (

          <DropPlaceholder
            key={placeholder.id}

            index={index}

            placeholder={
              placeholder
            }

            handleDrop={
              handleDrop
            }

            selectedPlaceholder={
              selectedPlaceholder
            }

            setSelectedPlaceholder={
              setSelectedPlaceholder
            }

            setDraggingId={
              setDraggingId
            }

            setResizingPlaceholderId={
              setResizingPlaceholderId
            }

            resizingPlaceholderId={
              resizingPlaceholderId
            }
          />
        )
      )}

      {/* BEADS */}

      {Object.entries(
        beads || {}
      ).map(
        ([index, bead]) => {

          const position =
            placeholders.find(
              (p) =>
                p.id ===
                Number(index)
            );

          if (
            !bead ||
            !position
          )
            return null;

          return (
            <div
              key={index}

              onClick={(e) => {

                e.stopPropagation();

                setSelectedBeadIndex(
                  index
                );
              }}

              style={{
                position:
                  "absolute",

                left:
                  position.x,

                top:
                  position.y,

                width:
  position.size - 4,

height:
  position.size - 4,

                transform: `
                  translate(-50%, -50%)
                  rotate(${bead.rotation || 0}deg)
                `,

                border:
                  selectedBeadIndex ===
                  index
                    ? "2px solid gold"
                    : "none",

                borderRadius:
                  "50%",

                cursor:
                  "pointer",

                zIndex: 50,
              }}
            >

              <img
                src={bead.src}

                alt="bead"

                style={{
                  width: "100%",

                  height: "100%",

                  borderRadius:
                    "50%",

                  objectFit:
                    "fill",

                  filter:
                    bead.type ===
                    "component"
                      ? "none"
                      : `
                        brightness(${bead.brightness || 1})
                        sepia(1)
                        saturate(5)
                        hue-rotate(${bead.hue || 0}deg)
                      `,
                }}
              />

            </div>
          );
        }
      )}
    </>
  );
}
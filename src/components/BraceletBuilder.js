import React, {
  useState,
  useEffect
} from "react";

import LetterBead
from "./JewelryComponents/LetterBead";

export default function BraceletBuilder({

  slots,

  setSlots,

  selectedIndex,

  setSelectedIndex,

  selectedBuilderBead,
  template,

}){

  /* =========================
     BRACELET SETTINGS
  ========================= */

  

  const beadCount =

  template?.beadCount ||

  25;

  const centerX = 250;

  const centerY = 250;

  /* =========================
     BRACELET SLOTS
  ========================= */

  

    const maxBeadSize =

  Math.max(

    ...slots.map(
      (slot) =>
        slot?.size || 32
    ),

    32
  );

const radius =

  template?.radius ||

  170;

  

  /* =========================
     AUTO PLACE BEAD
  ========================= */

  
useEffect(() => {

  if (
    !selectedBuilderBead ||

    selectedIndex === null
  ) return;

  const updated = [...slots];

  updated[selectedIndex] = {

    ...selectedBuilderBead,

    size:

      updated[
        selectedIndex
      ]?.size || 36
  };

  setSlots(updated);

}, [

  selectedBuilderBead,

  selectedIndex
]);

  /* =========================
     DELETE BEAD
  ========================= */

  const deleteSelectedBead =
  () => {

    if (
      selectedIndex === null
    ) return;

    const updated = [...slots];

    updated[selectedIndex] =
      null;

    setSlots(updated);

    setSelectedIndex(null);
  };

  /* =========================
     RESIZE BEAD
  ========================= */

  const resizeSelectedBead =
  (size) => {

    if (
      selectedIndex === null
    ) return;

    const updated = [...slots];

    updated[selectedIndex] = {

      ...updated[
        selectedIndex
      ],

      size:
        Number(size)
    };

    setSlots(updated);
  };

  /* =========================
     UI
  ========================= */

  

  return (

    <div
      style={{
        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        width: "100%",

        height: "100%"
      }}
    >

      

      {/* =====================
         BRACELET
      ===================== */}

      <div
        style={{
          position: "relative",

          width: "500px",

          height: "500px",

          background: "#fafafa",

          borderRadius: "20px"
        }}
      >

        {slots.map(
          (bead, index) => {
            const slotStyle =

  template?.slotStyles?.[
    index
  ];
        

            const angle =

              (2 * Math.PI *
                index) /

              beadCount;

       const x =

  centerX +

  radius *

    Math.cos(angle) +

  (slotStyle?.offsetX || 0);

            const y =

  centerY +

  radius *

    Math.sin(angle) +

  (slotStyle?.offsetY || 0);

            return (

              <div
                key={index}

                onClick={() =>
                  setSelectedIndex(
                    index
                  )
                }

                style={{

                  position:
                    "absolute",

                  left: x,

                  top: y,

                  width:

  slotStyle?.size ||

  bead?.size ||

  38,

  height:

  slotStyle?.size ||

  bead?.size ||

  38,

                  borderRadius:
                    "50%",

                  background:
                    "#eee",

                  transform:
                    "translate(-50%, -50%)",

                  border:

                    selectedIndex ===
                    index

                      ? "3px solid #8e44ad"

                      : "2px solid #ccc",

                  display:
                    "flex",

                  justifyContent:
                    "center",

                  alignItems:
                    "center",

                  overflow:
                    "hidden",

                  cursor:
                    "pointer"
                }}
              >

                {bead ? (

                  bead.type ===
                  "letterBead" ? (

                    <LetterBead

                      letter={
                        bead.letter
                      }

                      beadColor={
                        bead.beadColor
                      }

                      textColor={
                        bead.textColor
                      }

                      size={
                        bead.size ||
                        36
                      }

                    />

                  ) : (

                    <img
                      src={bead.image}

                      alt="bead"

                      style={{
                        width:
                          bead.size ||
                          36,

                        height:
                          bead.size ||
                          36,

                        borderRadius:
                          "50%",

                        objectFit:
                          "cover"
                      }}
                    />

                  )

                ) : null}

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}
import React, {
  useEffect
} from "react";

import LetterBead
from "./JewelryComponents/LetterBead";

export default function
EarringBuilder({

  slots,

  setSlots,

  selectedIndex,

  setSelectedIndex,

  selectedBuilderBead

}) {

  /* =========================
     AUTO PLACE
  ========================= */

  useEffect(() => {

    if (
      !selectedBuilderBead ||

      selectedIndex === null
    ) return;

    const updated =
      [...slots];

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
     SETTINGS
  ========================= */

  const leftX = 190;

  const rightX = 410;

  const startY = 160;

  const gap = 75;

  const slotCount = 5;

  /* =========================
     UI
  ========================= */

  return (

    <div
      style={{
        position: "relative",

        width: "600px",

        height: "650px",

        margin: "0 auto",

        background: "#fafafa",

        borderRadius: "20px"
      }}
    >

      {/* =====================
         LEFT HOOK
      ===================== */}

      <img
        src="/earrings/hook.png"

        alt="hook"

        style={{
          position: "absolute",

          left: leftX - 45,

          top: 20,

          width: "240px",

          height: "240px",

          objectFit: "contain"
        }}
      />

      {/* =====================
         RIGHT HOOK
      ===================== */}

      <img
        src="/earrings/hook.png"

        alt="hook"

        style={{
          position: "absolute",

          left: rightX - 45,

          top: 5,

         width: "240px",
height: "240px",

          objectFit: "contain",

          transform:
            "scaleX(-1)"
        }}
      />

      {/* =====================
         MIRRORED SLOTS
      ===================== */}

      {Array.from({
        length: slotCount
      }).map((_, i) => {

        const bead =
          slots[i];

        return (

          <React.Fragment
            key={i}
          >

            {/* LEFT */}

            <div

              onClick={() =>
                setSelectedIndex(i)
              }

              style={{

                position:
                  "absolute",

                left: leftX,

                top:
                  startY +
                  i * gap,

                width:
                  bead?.size ||
                  40,

                height:
                  bead?.size ||
                  40,

                borderRadius:
                  "50%",

                background:
                  "#eee",

                border:

                  selectedIndex ===
                  i

                    ? "3px solid #8e44ad"

                    : "2px solid #ccc",

                transform:
                  "translateX(-50%)",

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

            {/* RIGHT MIRROR */}

            <div

              style={{

                position:
                  "absolute",

                left: rightX,

                top:
                  startY +
                  i * gap,

                width:
                  bead?.size ||
                  40,

                height:
                  bead?.size ||
                  40,

                borderRadius:
                  "50%",

                background:
                  "#eee",

                border:
                  "2px solid #ccc",

                transform:
                  "translateX(-50%)",

                display:
                  "flex",

                justifyContent:
                  "center",

                alignItems:
                  "center",

                overflow:
                  "hidden"
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

          </React.Fragment>
        );
      })}

    </div>
  );
}
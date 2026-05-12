import { useDrag } from "react-dnd";

import LetterBead
from "./JewelryComponents/LetterBead";

export default function Bead({

  src,

  type,

  letter,

  beadColor,

  textColor,

  selectedColor,

  selectedSize

}) {

  const [{ isDragging }, drag] =

    useDrag(() => ({

      type: "BEAD",

      item: {

        type,

        src,

        letter,

        beadColor,

        textColor,
      },

      collect: (monitor) => ({

        isDragging:
          monitor.isDragging(),

      }),
    }));

  /* =========================
     LETTER BEAD
  ========================= */

  if (type === "letterBead") {

    return (

      <div
        ref={drag}

        style={{
          margin: 10,

          cursor: "grab",

          opacity:
            isDragging
              ? 0.5
              : 1,
        }}
      >

        <LetterBead

          letter={letter}

          beadColor={beadColor}

          textColor={textColor}

          size={38}

        />

      </div>
    );
  }

  /* =========================
     NORMAL BEAD
  ========================= */

  return (

    <img
      ref={drag}

      src={src}

      alt="bead"

      width={50}

      height={50}

      style={{
        margin: 10,

        cursor: "grab",

        opacity:
          isDragging
            ? 0.5
            : 1,
      }}
    />
  );
}
export default function PropertiesPanel({

  selectedBead,
  selectedBeadIndex,
  setBeads,

  selectedIds,
  deleteSelectedShape,

  selectedPlaceholder,

  duplicateElement,

  deleteElement,

  resizeElement,

  rotateElement,

selectedBraceletBead,
selectedBuilderBead,

resizeBraceletBead,

deleteBraceletBead,

fillBracelet,
changeShapeColor,
changeBuilderBeadColor,

}) {

  /* =========================
     UPDATE SIZE
  ========================= */

  const updateSize = (size) => {

    if (
      selectedBeadIndex === null
    ) return;

    setBeads((prev) => ({

      ...prev,

      [selectedBeadIndex]: {

        ...prev[
          selectedBeadIndex
        ],

        size
      }
    }));
  };

  /* =========================
     UPDATE SHADE
  ========================= */

  const updateShade = (value) => {

    if (
      selectedBeadIndex === null
    ) return;

    setBeads((prev) => ({

      ...prev,

      [selectedBeadIndex]: {

        ...prev[
          selectedBeadIndex
        ],

        brightness: value
      }
    }));
  };

  /* =========================
     UPDATE COLOR
  ========================= */

  const updateColor = (hex) => {

    if (
      selectedBeadIndex === null
    ) return;

    const hue =
      getHueFromHex(hex);

    setBeads((prev) => ({

      ...prev,

      [selectedBeadIndex]: {

        ...prev[
          selectedBeadIndex
        ],

        hue
      }
    }));
  };

  /* =========================
     HEX TO HUE
  ========================= */

  function getHueFromHex(hex) {

    const r =
      parseInt(
        hex.substr(1, 2),
        16
      ) / 255;

    const g =
      parseInt(
        hex.substr(3, 2),
        16
      ) / 255;

    const b =
      parseInt(
        hex.substr(5, 2),
        16
      ) / 255;

    const max =
      Math.max(r, g, b);

    const min =
      Math.min(r, g, b);

    let h = 0;

    if (max === min)
      return 0;

    if (max === r) {

      h =
        (g - b) /
        (max - min);

    } else if (
      max === g
    ) {

      h =
        2 +
        (b - r) /
        (max - min);

    } else {

      h =
        4 +
        (r - g) /
        (max - min);
    }

    h = Math.round(h * 60);

    return h < 0
      ? h + 360
      : h;
  }

  /* =========================
     UI
  ========================= */

  

  return (

    <div className="properties-panel">

      {/* =====================
         BEAD CONTROLS
      ===================== */}

      {selectedBead && (

        <>

          <h3>
            Customize Bead
          </h3>

          {/* COLOR */}

          <label>
            Color
          </label>

          <input
            type="color"

            onChange={(e) =>

              updateColor(
                e.target.value
              )
            }
          />

          {/* SHADE */}

          <label>
            Shade
          </label>

          <input
            type="range"

            min="0.5"

            max="1.5"

            step="0.1"

            value={
              selectedBead
                ?.brightness || 1
            }

            onChange={(e) =>

              updateShade(
                e.target.value
              )
            }
          />

          {/* SIZE */}

          <label>
            Size
          </label>

          <input
            type="range"

            min="20"

            max="100"

            value={
              selectedBead
                ?.size || 50
            }

            onChange={(e) =>

              updateSize(
                Number(
                  e.target.value
                )
              )
            }
          />

        </>
      )}

      {/* =====================
         PLACEHOLDER CONTROLS
      ===================== */}

      {selectedPlaceholder && (

        <>

          <h3 style={{
            marginTop: "25px"
          }}>
            Placeholder Controls
          </h3>



          {/* SIZE */}

          <label>
            Size
          </label>

          <input
            type="range"

            min="20"

            max="120"

            value={
              selectedPlaceholder.size
            }

            onChange={(e) =>

              resizeElement(

                selectedPlaceholder.id,

                Number(
                  e.target.value
                )
              )
            }
          />

          {/* ROTATION */}

          <label>
            Rotation
          </label>

          <input
            type="range"

            min="0"

            max="360"

            value={
              selectedPlaceholder
                .rotation || 0
            }

            onChange={(e) =>

              rotateElement(

                selectedPlaceholder.id,

                Number(
                  e.target.value
                )
              )
            }
          />

          {/* DUPLICATE */}

          <button

            onClick={() =>

              duplicateElement(
                selectedPlaceholder
              )
            }

            style={{

              marginTop: "15px",

              background:
                "#22c55e",

              color: "white",

              border: "none",

              padding: "10px",

              borderRadius:
                "8px",

              cursor: "pointer",

              width: "100%"
            }}
          >

            ➕ Duplicate

          </button>

          {/* DELETE */}

          <button

            onClick={() =>

              deleteElement(
                selectedPlaceholder.id
              )
            }

            style={{

              marginTop: "10px",

              background:
                "#ef4444",

              color: "white",

              border: "none",

              padding: "10px",

              borderRadius:
                "8px",

              cursor: "pointer",

              width: "100%"
            }}
          >

            🗑 Delete

          </button>

        </>
      )}

      {/* =====================
   BRACELET CONTROLS
===================== */}

{/* =====================
   BRACELET CONTROLS
===================== */}
{selectedBuilderBead && (

  <>

    <h3 style={{
      marginTop: "25px"
    }}>
      Bracelet Bead
    </h3>

    {/* COLOR */}

    <label>
      Color
    </label>

    <input
      type="color"

      onChange={(e) =>

        changeBuilderBeadColor(
          e.target.value
        )
      }
    />

    

    {/* DELETE */}

    <button

      onClick={
        deleteBraceletBead
      }

      style={{

        marginTop: "10px",

        background:
          "#ef4444",

        color: "white",

        border: "none",

        padding: "10px",

        borderRadius:
          "8px",

        cursor: "pointer",

        width: "100%"
      }}
    >

      🗑 Delete Bead

    </button>

    {/* FILL */}

    <button

      onClick={
        fillBracelet
      }

      style={{

        marginTop: "10px",

        background:
          "#8e44ad",

        color: "white",

        border: "none",

        padding: "10px",

        borderRadius:
          "8px",

        cursor: "pointer",

        width: "100%"
      }}
    >

      ✨ Fill Bracelet

    </button>

  </>
)}

      {/* =====================
         SHAPE ACTIONS
      ===================== */}

      {selectedIds &&
       selectedIds.length > 0 && (

        <>

          <h4 style={{
            marginTop: "20px"
          }}>
            Shape Actions
          </h4>

          <p>
            {selectedIds.length}
            {" "}
            shape(s) selected
          </p>

          <button

            onClick={
              deleteSelectedShape
            }

            style={{

              background:
                "#ef4444",

              color: "#fff",

              border: "none",

              padding: "10px",

              borderRadius:
                "8px",

              cursor: "pointer",

              width: "100%"
            }}
          >

            🗑 Delete Selected

          </button>

        </>
      )}

      {selectedIds.length > 0 && (

  <div className="shape-controls">

    <h3>Shape Color</h3>

    <input
      type="color"

      onChange={(e) =>
        changeShapeColor(
          e.target.value
        )
      }
    />

  </div>

)}

    </div>
  );
}
export default function PatternBuilder({

  template,

  slots,

  setSlots,

  selectedIndex,

  setSelectedIndex,

  selectedBuilderBead,

}) {

  return (

    <div

      style={{

        position: "relative",

        width: "500px",

        height: "500px",

        background: "#fafafa",

        borderRadius: "20px",
      }}
    >

      {template.map(
        (slot, index) => (

          <div

            key={slot.id}

            onClick={() =>
              setSelectedIndex(
                index
              )
            }

            style={{

              position: "absolute",

              left: slot.x,

              top: slot.y,

              width: slot.size,

              height: slot.size,

              borderRadius: "50%",

              background: "#eee",

              border:
                "2px solid #ccc",

              transform:
                "translate(-50%, -50%)",

              overflow: "hidden",

              display: "flex",

              justifyContent:
                "center",

              alignItems:
                "center",
            }}
          >

            {slots[index] && (

              <img

                src={
                  slots[index]
                    .image
                }

                alt="bead"

                style={{

                  width:
                    slot.size,

                  height:
                    slot.size,

                  borderRadius:
                    "50%",
                }}
              />
            )}

          </div>
        )
      )}

    </div>
  );
}
import { useDrag } from "react-dnd";
import JumpRing from "./JumpRing";

export default function ComponentItem({ item }) {

  const [{ isDragging }, drag] = useDrag(() => ({

    type: "BEAD",

    item: {
      src: item.image,
      type: item.type,
      material: item.material,
      size: item.size,
      color: item.color
    },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),

  }));

  return (

    <div
      ref={drag}

      style={{
        opacity: isDragging ? 0.5 : 1,

        cursor: "grab",

        width: "70px",
        minHeight: "85px",

        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",

        overflow: "visible",

        padding: "6px"
      }}
    >

      {item.type === "jumpRing" ? (

        <div
          style={{
            width: "45px",
            height: "45px",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            overflow: "visible"
          }}
        >

          <JumpRing
            size={40}
            color={item.color}
          />

        </div>

      ) : (

        <div>No Component</div>

      )}

      <span
        style={{
          fontSize: "11px",
          textAlign: "center",
          marginTop: "4px",
          lineHeight: "14px"
        }}
      >
        {item.name}
      </span>

    </div>

  );
}
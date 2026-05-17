import { useDrag } from "react-dnd";

export default function ChainItem({ item }) {

  const [{ isDragging }, drag] = useDrag(() => ({

    type:

      item.type === "string"

        ? "STRING"

        : "CHAIN",

    item: {

      type:

        item.type === "string"

          ? "STRING"

          : "CHAIN",

      chainType: item.type,

      svg: item.svg,

      color: item.color
    },

    collect: (monitor) => ({

      isDragging:
        !!monitor.isDragging(),

    }),

  }));

  return (

    <div
  ref={drag}

  style={{
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "80px",
    minHeight: "80px",

    justifyContent: "center",
  }}
>

      {
  item.type === "string" ? (

    <svg
      width="60"
      height="40"
      viewBox="0 0 60 40"

      style={{
        pointerEvents: "none"
      }}
    >
      <path
        d="M 5 20 Q 30 5 55 20"
        stroke={item.color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>

  ) : (

    <img
  src={item.svg}
  alt={item.name}

  style={{
    width: "40px",
    height: "70px",
    objectFit: "contain",
    pointerEvents: "none"
  }}
/>

  )
}

      <span className="beadName">
        {item.name}
      </span>

    </div>
  );
}
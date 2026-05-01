import { useDrag } from "react-dnd";

export default function Bead({
  src,
  selectedColor,
  selectedSize
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BEAD",

    item: () => {
      console.log("Dragging started");

      return {
        src,
        color: selectedColor,
        size: selectedSize
      };
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

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
        opacity: isDragging ? 0.5 : 1,
      }}
    />
  );
}
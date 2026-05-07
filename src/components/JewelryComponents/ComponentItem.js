import { useDrag } from "react-dnd";

export default function ComponentItem({ item }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BEAD",   // SAME as beads
    item: {
      src: item.src,
      type: item.type,
      material: item.material,
      size: item.size
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={item.src}
      alt={item.name}
      style={{
        width: 50,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        margin: "10px"
      }}
    />
  );
}

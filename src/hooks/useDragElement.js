export default function
useDragElement(
  elements,
  setElements
) {

  const dragElement = (
    id,
    x,
    y
  ) => {

    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              x,
              y,
            }
          : el
      )
    );
  };

  return {
    dragElement,
  };
}
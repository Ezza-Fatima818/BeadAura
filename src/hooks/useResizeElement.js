export default function
useResizeElement(
  elements,
  setElements
) {

  const resizeElement = (
    id,
    size
  ) => {

    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              size,
            }
          : el
      )
    );
  };

  return {
    resizeElement,
  };
}
export default function
useRotateElement(
  elements,
  setElements
) {

  const rotateElement = (
    id,
    rotation
  ) => {

    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              rotation,
            }
          : el
      )
    );
  };

  return {
    rotateElement,
  };
}
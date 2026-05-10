export default function
useDuplicateElement(
  elements,
  setElements
) {

  const duplicateElement = (
    element
  ) => {

    const duplicated = {

      ...element,

      id:
        Date.now() +
        Math.random(),

      x: element.x + 40,

      y: element.y + 40,
    };

    setElements((prev) => [
      ...prev,
      duplicated,
    ]);
  };

  return {
    duplicateElement,
  };
}
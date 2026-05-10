export default function
useDeleteElement(
  elements,
  setElements
) {

  const deleteElement = (
    id
  ) => {

    setElements((prev) =>
      prev.filter(
        (el) => el.id !== id
      )
    );
  };

  return {
    deleteElement,
  };
}
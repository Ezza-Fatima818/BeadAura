import React, { useState } from "react";

import DesignPage from "./DesignPage";



function DesignerPage() {
  const [selectedString, setSelectedString] =
    useState(null);

  // ✅ FIX HERE
  const [beads, setBeads] = useState({});

  const [selectedBeadIndex, setSelectedBeadIndex] =
    useState(null);

  // ✅ safer version
  const selectedBead =
    selectedBeadIndex !== null
      ? beads[selectedBeadIndex]
      : null;
  return (

  <DesignPage
    selectedString={selectedString}

    setSelectedString={
      setSelectedString
    }

    beads={beads}

    setBeads={setBeads}

    selectedBeadIndex={
      selectedBeadIndex
    }

    setSelectedBeadIndex={
      setSelectedBeadIndex
    }
  />
);
}

export default DesignerPage;
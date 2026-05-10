import "./TopBar.css";

export default function TopBar({
  setMode,
  setSelectedCategory,
  navigate,
}) {

  return (

    <div className="top-bar">

      <div className="logo">
        BeadAura
      </div>

      <div className="categories">

        {/* BRACELETS */}

        <span
          onClick={() => {

            setMode("template");

            setSelectedCategory(
              "bracelet"
            );
          }}
        >
          Bracelets
        </span>

        {/* NECKLACES */}

        <span
          onClick={() => {

            setMode("template");

            setSelectedCategory(
              "necklace"
            );
          }}
        >
          Necklaces
        </span>

        {/* EARRINGS */}

        <span
          onClick={() => {

            setMode("template");

            setSelectedCategory(
              "earrings"
            );
          }}
        >
          Earrings
        </span>

        {/* DESIGN STUDIO */}

        <span
          className="design-studio-btn"

          onClick={() => {

            setMode("studio");

            setSelectedCategory(
              null
            );
          }}
        >
          ✨ Design Studio
        </span>

      </div>

      {/* SAVED */}

      <button
        className="saved-btn"

        onClick={() =>
          navigate("/saved-designs")
        }
      >
        Saved Designs
      </button>

    </div>
  );
}
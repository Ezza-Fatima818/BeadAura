import "./TopBar.css";

export default function TopBar({ setMode, navigate }) {
  return (
    <div className="top-bar">

      <div className="logo">BeadAura</div>

      <div className="categories">

        <span onClick={() => setMode("bracelet")}>
          Bracelets
        </span>

        <span onClick={() => setMode("necklace")}>
          Necklaces
        </span>

        <span onClick={() => setMode("earrings")}>
          Earrings
        </span>

        {/* ✅ FIXED */}
        <span 
          className="design-studio-btn"

          onClick={() => {
            console.log("Studio clicked");
            setMode("studio");
          }}
        >
          ✨ Design Studio
        </span>

      </div>

      {/* This can still use navigate */}
      <button
        className="saved-btn"
        onClick={() => navigate("/saved-designs")}
      >
        Saved Designs
      </button>

    </div>
  );
}
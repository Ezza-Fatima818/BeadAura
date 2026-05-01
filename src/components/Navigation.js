import "./Navigation.css";

export default function Navigation() {
  return (
    <div className="designer-navbar">
      <div className="logo">BeadAura</div>

      <div className="nav-links">
        <span>Home</span>
        <span>Bracelets</span>
        <span>Necklaces</span>
        <span>Templates</span>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="search-box"
      />

      <div className="profile-section">
        <span>My Designs</span>
      </div>
    </div>
  );
}
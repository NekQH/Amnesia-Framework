import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <LayoutDashboard className="nav-logo-icon" />
          <span>Amnesia</span>
        </Link>
        
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/equipe" className="nav-link" onClick={closeMenu}>Equipe</Link>
          <Link to="/contadores" className="nav-link" onClick={closeMenu}>Contadores</Link>
          <Link to="/cadastro" className="nav-link" onClick={closeMenu}>Cadastro</Link>
          <Link to="/filmes" className="nav-link" onClick={closeMenu}>Filmes</Link>
          <Link to="/documentacao" className="nav-link" onClick={closeMenu}>Doc RA3</Link>
        </div>
      </div>
    </nav>
  );
}

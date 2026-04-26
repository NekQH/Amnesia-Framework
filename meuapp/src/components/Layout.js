import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <LayoutDashboard className="nav-logo-icon" />
            <span>Amnesia</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/equipe" className="nav-link">Equipe</Link>
            <Link to="/contadores" className="nav-link">Contadores</Link>
            <Link to="/cadastro" className="nav-link">Cadastro</Link>
            <Link to="/filmes" className="nav-link">Filmes</Link>
          </div>
        </div>
      </nav>

      <main className="main-content container">
        <Outlet />
      </main>
    </div>
  );
}

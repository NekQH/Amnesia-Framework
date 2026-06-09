import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} Amnesia Framework. Todos os direitos reservados.</p>
        <p className="footer-subtext">
          Trabalho Discente Efetivo - BSI PUCPR | <Link to="/documentacao" style={{ color: 'var(--accent-color)', textDecoration: 'none', marginLeft: '0.5rem', fontWeight: 500 }}>Documentação</Link>
        </p>
      </div>
    </footer>
  );
}

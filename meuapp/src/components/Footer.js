import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} Amnesia Framework. Todos os direitos reservados.</p>
        <p className="footer-subtext">Trabalho Discente Efetivo - BSI PUCPR</p>
      </div>
    </footer>
  );
}

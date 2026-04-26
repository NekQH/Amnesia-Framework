import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import Button from "../components/ui/Button";
import "./Home.css";

export default function Home() {
  return (
    <div className="hero-section flex-center">
      <div className="hero-content">
        <div className="hero-badge">Projeto Brabo | Framework</div>
        <h1 className="hero-title">
          Bem-vindo(a) ao <span className="text-gradient">Amnesia</span>
        </h1>
        <p className="hero-subtitle">
          Um sistema moderno, rápido e com a melhor experiência de usuário.
          Gerencie contadores, conheça a equipe e realize cadastros de forma eficiente.
        </p>
        <div className="hero-actions">
          <Link to="/cadastro">
            <Button variant="primary">
              <Rocket size={18} />
              Começar Agora
            </Button>
          </Link>
          <Link to="/equipe">
            <Button variant="secondary">Conheça a Equipe</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

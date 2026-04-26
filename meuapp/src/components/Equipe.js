import Sobre from "./Sobre";
import Sociais from "./Sociais";
import Card from "./ui/Card";
import { UserCircle2 } from "lucide-react";
import "./Equipe.css";

function Equipe(props) {
  return (
    <Card className="equipe-card">
      <div className="equipe-avatar">
        <UserCircle2 size={64} strokeWidth={1} />
      </div>
      <Sobre 
        usuario={props.nome}
        funcao={props.cargo}
        anos={props.idade}
      />
      <div className="equipe-divider"></div>
      <Sociais 
        linked={props.linkedin}
        gith={props.github}
      />
    </Card>
  );
}

export default Equipe;

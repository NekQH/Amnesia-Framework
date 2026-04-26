import Equipe from "../components/Equipe";

export default function EquipePage() {
  return (
    <div>
      <h1 className="page-title">Nossa Equipe</h1>
      <p style={{ color: 'var(--text-muted)' }}>Conheça os profissionais por trás do Amnesia.</p>

      <div className="grid-cards">
        <Equipe nome="Felipe" cargo="Desenvolvedor" idade={20} github="https://github.com/NekQH" linkedin="https://www.linkedin.com/in/felipeurbanekg/" />
        <Equipe nome="Enzo" cargo="Desenvolvedor" idade={20} github="https://github.com" linkedin="https://linkedin.com" />
        <Equipe nome="Davi" cargo="Desenvolvedor" idade={19} github="https://github.com" linkedin="https://linkedin.com" />
      </div>
    </div>
  );
}
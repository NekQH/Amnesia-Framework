import ContadorFuncaoComEstado from "../components/contador_funcao_com_estado";
import ContadorClasseComEstado from "../components/contador_classe_com_estado";

export default function ContadoresPage({ valor, setValor }) {
  return (
    <div>
      <h1 className="page-title">Contadores</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Exemplo prático de gerenciamento de estado usando Componentes de Função e Classe. O estado é elevado (lifted state) para sincronizar ambos.
      </p>

      <div className="grid-cards">
        <ContadorFuncaoComEstado valor={valor} setValor={setValor} />
        <ContadorClasseComEstado valor={valor} setValor={setValor} />
      </div>
    </div>
  );
}

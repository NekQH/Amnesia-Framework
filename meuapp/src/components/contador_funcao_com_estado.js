import Card from "./ui/Card";
import Button from "./ui/Button";
import { PlusCircle, Activity } from "lucide-react";

function ContadorFuncaoComEstado({ valor, setValor }) {
  function incrementar() {
    setValor(valor + 1);
  }

  return (
    <Card className="contador-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Activity color="var(--accent-color)" />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Contador (Função)</h2>
      </div>
      
      <div style={{ padding: '2rem 0', textAlign: 'center' }}>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Valor atual</p>
        <p style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0, color: 'var(--text-main)' }}>{valor}</p>
      </div>

      <Button onClick={incrementar} style={{ width: '100%' }}>
        <PlusCircle size={18} />
        Incrementar
      </Button>
    </Card>
  );
}

export default ContadorFuncaoComEstado;

import React, { Component } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { PlusCircle, Cpu } from "lucide-react";

class ContadorClasse extends Component {
  incrementar = () => {
    this.props.setValor(this.props.valor + 1);
  };

  render() {
    return (
      <Card className="contador-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Cpu color="#10b981" />
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Contador (Classe)</h2>
        </div>
        
        <div style={{ padding: '2rem 0', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Valor atual</p>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0, color: 'var(--text-main)' }}>{this.props.valor}</p>
        </div>

        <Button onClick={this.incrementar} style={{ width: '100%', backgroundColor: '#10b981', color: '#fff' }}>
          <PlusCircle size={18} />
          Incrementar
        </Button>
      </Card>
    );
  }
}

export default ContadorClasse;

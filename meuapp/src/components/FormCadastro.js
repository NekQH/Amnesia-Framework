import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../services/cadastroService";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { User, Mail, Calendar, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import "./FormCadastro.css";

function FormCadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    genero: "",
    aceiteTermos: false,
  });

  const [carregando, setCarregando] = useState(false);

  // Estados dos Modais
  const [modalSucesso, setModalSucesso] = useState(false);
  const [modalErro, setModalErro] = useState({ isOpen: false, message: "" });
  const [modalConfirmacao, setModalConfirmacao] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setCarregando(true);
    try {
      await cadastrarUsuario(formData);
      setModalSucesso(true);
      // Aguarda 2 segundos e redireciona para filmes
      setTimeout(() => {
        navigate('/filmes');
      }, 2000);
    } catch (err) {
      setModalErro({ isOpen: true, message: err.message });
    } finally {
      setCarregando(false);
    }
  }

  function handleReset() {
    setFormData({
      nome: "",
      email: "",
      dataNascimento: "",
      genero: "",
      aceiteTermos: false,
    });
    setModalSucesso(false);
    setModalConfirmacao(false);
  }

  function requestReset() {
    setModalConfirmacao(true);
  }

  return (
    <div className="form-page-container">
      <div className="form-header">
        <h1 className="page-title">Crie sua Conta</h1>
        <p>Preencha os dados abaixo para ter acesso a todos os recursos.</p>
      </div>

      <div className="form-layout">
        <Card className="form-card">
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome Completo"
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              icon={User}
              required
            />

            <Input
              label="E-mail"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              icon={Mail}
              required
            />

            <div className="form-row">
              <div style={{ flex: 1 }}>
                <Input
                  label="Data de Nascimento"
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  icon={Calendar}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                {/* Usando o layout do Input para o Select */}
                <div className="input-wrapper">
                  <label className="input-label" htmlFor="genero">Gênero</label>
                  <select
                    className="input-field"
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione...</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                    <option value="nao-informar">Prefiro não informar</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="aceiteTermos"
                name="aceiteTermos"
                checked={formData.aceiteTermos}
                onChange={handleChange}
                className="custom-checkbox"
              />
              <label htmlFor="aceiteTermos" className="checkbox-label">
                Li e aceito os <a href="#termos" style={{ color: 'var(--accent-color)' }}>Termos de Uso</a> e a Política de Privacidade.
              </label>
            </div>

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={requestReset} disabled={carregando}>
                Limpar
              </Button>
              <Button type="submit" variant="primary" isLoading={carregando} style={{ flex: 1 }}>
                Criar Conta
              </Button>
            </div>
          </form>
        </Card>

        {/* Visualização em tempo real do estado */}
        <div className="state-viewer">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success-color)' }}></span>
            Estado do Componente
          </h3>
          <pre className="json-preview">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>

      {/* Modal de Sucesso */}
      <Modal 
        isOpen={modalSucesso} 
        onClose={() => setModalSucesso(false)}
      >
        <div className="modal-feedback-content">
          <CheckCircle2 size={64} color="var(--success-color)" />
          <h2>Cadastro Realizado!</h2>
          <p>Olá, <strong>{formData.nome}</strong>! Conta criada com sucesso.</p>
          <p style={{ marginTop: '0.5rem', color: 'var(--accent-color)', fontSize: '0.9rem' }}>
            Redirecionando você para os filmes...
          </p>
        </div>
      </Modal>

      {/* Modal de Erro */}
      <Modal 
        isOpen={modalErro.isOpen} 
        onClose={() => setModalErro({ isOpen: false, message: "" })}
      >
        <div className="modal-feedback-content">
          <AlertCircle size={64} color="var(--danger-color)" />
          <h2>Ops! Algo deu errado</h2>
          <p style={{ color: 'var(--danger-color)' }}>{modalErro.message}</p>
          <Button variant="danger" onClick={() => setModalErro({ isOpen: false, message: "" })} style={{ width: '100%', marginTop: '1rem' }}>
            Tentar Novamente
          </Button>
        </div>
      </Modal>

      {/* Modal de Confirmação */}
      <Modal 
        isOpen={modalConfirmacao} 
        onClose={() => setModalConfirmacao(false)}
      >
        <div className="modal-feedback-content">
          <HelpCircle size={64} color="var(--warning-color)" />
          <h2>Tem certeza?</h2>
          <p>Todos os dados preenchidos serão perdidos. Deseja realmente limpar o formulário?</p>
          <div style={{ display: 'flex', gap: '1rem', width: '100%', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={() => setModalConfirmacao(false)} style={{ flex: 1 }}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleReset} style={{ flex: 1 }}>
              Sim, limpar
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default FormCadastro;
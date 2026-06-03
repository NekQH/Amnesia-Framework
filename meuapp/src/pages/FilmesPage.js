import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { obterFilmes } from '../services/filmesService';
import './FilmesPage.css';

export default function FilmesPage() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  
  const [comentario, setComentario] = useState('');
  const [avaliacao, setAvaliacao] = useState(null);
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    // Buscar nome do usuário no localStorage
    const nomePersistido = localStorage.getItem("usuarioLogado");
    if (nomePersistido) {
      setUsuario(nomePersistido);
    }

    let ativo = true;
    async function carregarFilmes() {
      try {
        setLoading(true);
        const dados = await obterFilmes();
        if (ativo) {
          setFilmes(dados);
        }
      } catch (err) {
        if (ativo) {
          setErro("Ocorreu um erro ao carregar o catálogo de filmes da API.");
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }
    carregarFilmes();

    return () => {
      ativo = false;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setUsuario('');
  };

  const abrirFilme = (filme) => {
    setFilmeSelecionado(filme);
    setComentario('');
    setAvaliacao(null);
  };

  const fecharFilme = () => {
    setFilmeSelecionado(null);
  };

  const handleEnviarAvaliacao = (e) => {
    e.preventDefault();
    if (!avaliacao) {
      alert("Por favor, marque se achou o filme Bom ou Ruim!");
      return;
    }

    const novoComentario = {
      id: Date.now(),
      texto: comentario,
      tipo: avaliacao,
      data: new Date().toLocaleDateString()
    };

    setFilmes(prevFilmes => 
      prevFilmes.map(f => {
        if (f.id === filmeSelecionado.id) {
          return { ...f, comments: [novoComentario, ...f.comments] };
        }
        return f;
      })
    );

    setFilmeSelecionado(prev => ({
      ...prev,
      comments: [novoComentario, ...prev.comments]
    }));

    setComentario('');
    setAvaliacao(null);
  };

  return (
    <div>
      <div className="filmes-header">
        <div className="header-top-row">
          <h1 className="page-title">Catálogo de Filmes</h1>
          {usuario && (
            <div className="usuario-saudacao">
              <span>Olá, <strong>{usuario}</strong>! 🍿</span>
              <button onClick={handleLogout} className="btn-logout">Sair</button>
            </div>
          )}
        </div>
        <p style={{ color: 'var(--text-muted)' }}>Explore nosso acervo exclusivo de tecnologia, avalie e deixe sua opinião.</p>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="premium-spinner"></div>
          <p>Buscando títulos da API externa do TVMaze...</p>
        </div>
      ) : erro ? (
        <div className="error-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--danger-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <h3>Erro ao carregar catálogo</h3>
          <p>{erro}</p>
        </div>
      ) : (
        <div className="filmes-grid">
          {filmes.map(filme => (
            <div key={filme.id} className="filme-card" onClick={() => abrirFilme(filme)}>
              <div className="filme-image-wrapper">
                <img src={filme.image} alt={filme.title} className="filme-image" />
                <div className="filme-overlay">
                  <span className="filme-genre">{filme.genre}</span>
                </div>
              </div>
              <div className="filme-info">
                <h3 className="filme-title">{filme.title} ({filme.year})</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!filmeSelecionado} onClose={fecharFilme}>
        {filmeSelecionado && (
          <div className="modal-filme-content">
            <img src={filmeSelecionado.image} alt={filmeSelecionado.title} className="modal-filme-banner" />
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {filmeSelecionado.title} <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 'normal' }}>({filmeSelecionado.year})</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {filmeSelecionado.synopsis}
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0' }} />

              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Avaliar este título</h3>
              
              <form onSubmit={handleEnviarAvaliacao} className="avaliacao-form">
                <div className="avaliacao-botoes">
                  <button 
                    type="button" 
                    className={`btn-avaliar ${avaliacao === 'bom' ? 'active-bom' : ''}`}
                    onClick={() => setAvaliacao('bom')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    Bom
                  </button>
                  <button 
                    type="button" 
                    className={`btn-avaliar ${avaliacao === 'ruim' ? 'active-ruim' : ''}`}
                    onClick={() => setAvaliacao('ruim')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                    Ruim
                  </button>
                </div>
                
                <Input 
                  placeholder="Escreva seu comentário..."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" style={{ width: '100%' }}>
                  Enviar Avaliação
                </Button>
              </form>

              {filmeSelecionado.comments.length > 0 && (
                <div className="comentarios-lista">
                  <h4 style={{ margin: '1.5rem 0 1rem', fontSize: '1rem' }}>Comentários da Comunidade</h4>
                  {filmeSelecionado.comments.map(c => (
                    <Card key={c.id} className="comentario-card">
                      <div className="comentario-header">
                        {c.tipo === 'bom' ? (
                          <span style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                            Gostou
                          </span>
                        ) : (
                          <span style={{ color: 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                            Não gostou
                          </span>
                        )}
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{c.data}</span>
                      </div>
                      <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>"{c.texto}"</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

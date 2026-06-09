import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { obterFilmes, adicionarFilme, atualizarFilme, removerFilme } from '../services/filmesService';
import { Trash2, Edit, Plus, AlertCircle } from 'lucide-react';
import './FilmesPage.css';

export default function FilmesPage() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  
  // Visualização de filme
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [comentario, setComentario] = useState('');
  const [avaliacao, setAvaliacao] = useState(null);
  
  // Autenticação e Usuário
  const [usuario, setUsuario] = useState('');

  // Formulário (Create/Update)
  const [modalFormAberto, setModalFormAberto] = useState(false);
  const [formData, setFormData] = useState({ title: '', year: '', genre: '', synopsis: '', image: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const nomePersistido = localStorage.getItem("usuarioLogado");
    if (nomePersistido) {
      setUsuario(nomePersistido);
    }

    carregarFilmes();
  }, []);

  async function carregarFilmes() {
    try {
      setLoading(true);
      const dados = await obterFilmes();
      setFilmes(dados);
    } catch (err) {
      setErro("Ocorreu um erro ao carregar o catálogo de filmes da API.");
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setUsuario('');
    window.location.href = '/cadastro'; 
  };

  // Funções de CRUD UI
  const abrirFormNovo = () => {
    setFormData({ title: '', year: '', genre: '', synopsis: '', image: '' });
    setEditandoId(null);
    setModalFormAberto(true);
  };

  const abrirFormEditar = (e, filme) => {
    e.stopPropagation();
    setFormData({ 
      title: filme.title, 
      year: filme.year, 
      genre: filme.genre, 
      synopsis: filme.synopsis, 
      image: filme.image 
    });
    setEditandoId(filme.id);
    setModalFormAberto(true);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Tem certeza que deseja excluir este filme?")) return;
    
    try {
      await removerFilme(id);
      setFilmes(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      alert("Erro ao excluir filme.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalvarFilme = async (e) => {
    e.preventDefault();
    setSalvando(true);
    try {
      if (editandoId) {
        const atualizado = await atualizarFilme(editandoId, formData);
        setFilmes(prev => prev.map(f => f.id === editandoId ? { ...f, ...atualizado } : f));
      } else {
        const novo = await adicionarFilme({ ...formData, comments: [] });
        setFilmes([novo, ...filmes]);
      }
      setModalFormAberto(false);
    } catch (err) {
      alert("Erro ao salvar filme.");
    } finally {
      setSalvando(false);
    }
  };

  // Funções de Avaliação
  const abrirFilme = (filme) => {
    setFilmeSelecionado(filme);
    setComentario('');
    setAvaliacao(null);
  };

  const handleEnviarAvaliacao = async (e) => {
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

    const comentariosAtuais = filmeSelecionado.comments || [];
    const commentsAtualizados = [novoComentario, ...comentariosAtuais];

    try {
      // Atualizar no banco de dados
      await atualizarFilme(filmeSelecionado.id, { comments: commentsAtualizados });

      setFilmes(prevFilmes => 
        prevFilmes.map(f => {
          if (f.id === filmeSelecionado.id) {
            return { ...f, comments: commentsAtualizados };
          }
          return f;
        })
      );

      setFilmeSelecionado(prev => ({
        ...prev,
        comments: commentsAtualizados
      }));

      setComentario('');
      setAvaliacao(null);
    } catch (err) {
      alert("Erro ao enviar avaliação.");
    }
  };

  return (
    <div>
      <div className="filmes-header">
        <div className="header-top-row">
          <h1 className="page-title">Catálogo de Filmes</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button variant="primary" onClick={abrirFormNovo} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> Novo Filme
            </Button>
            {usuario && (
              <div className="usuario-saudacao">
                <span>Olá, <strong>{usuario}</strong>! 🍿</span>
                <button onClick={handleLogout} className="btn-logout">Sair</button>
              </div>
            )}
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>Explore nosso acervo exclusivo, avalie e deixe sua opinião ou adicione novos títulos.</p>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="premium-spinner"></div>
          <p>Buscando títulos do banco de dados...</p>
        </div>
      ) : erro ? (
        <div className="error-container">
          <AlertCircle size={48} color="var(--danger-color)" />
          <h3>Erro ao carregar catálogo</h3>
          <p>{erro}</p>
        </div>
      ) : (
        <div className="filmes-grid">
          {filmes.map(filme => (
            <div key={filme.id} className="filme-card" onClick={() => abrirFilme(filme)}>
              <div className="filme-image-wrapper">
                <img src={filme.image} alt={filme.title} className="filme-image" />
                <div className="filme-overlay" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '0.5rem' }}>
                  <span className="filme-genre">{filme.genre}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', marginRight: '0.5rem' }}>
                    <button 
                      className="btn-icon-action" 
                      onClick={(e) => abrirFormEditar(e, filme)}
                      style={{ background: 'rgba(0,0,0,0.5)', border: 'none', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}
                      title="Editar Filme"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="btn-icon-action" 
                      onClick={(e) => handleDelete(e, filme.id)}
                      style={{ background: 'rgba(239, 68, 68, 0.8)', border: 'none', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}
                      title="Excluir Filme"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="filme-info">
                <h3 className="filme-title">{filme.title} ({filme.year})</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DE CRIAÇÃO/EDIÇÃO */}
      <Modal isOpen={modalFormAberto} onClose={() => setModalFormAberto(false)}>
        <div style={{ padding: '1.5rem' }}>
          <h2>{editandoId ? "Editar Filme" : "Adicionar Novo Filme"}</h2>
          <form onSubmit={handleSalvarFilme} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <Input label="Título" name="title" value={formData.title} onChange={handleFormChange} required />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <Input label="Ano de Lançamento" type="number" name="year" value={formData.year} onChange={handleFormChange} required />
              </div>
              <div style={{ flex: 1 }}>
                <Input label="Gênero" name="genre" value={formData.genre} onChange={handleFormChange} required placeholder="Ex: Ação, Drama..." />
              </div>
            </div>
            <Input label="URL da Imagem (Capa)" type="url" name="image" value={formData.image} onChange={handleFormChange} required placeholder="https://..." />
            
            <div className="input-wrapper">
              <label className="input-label">Sinopse</label>
              <textarea 
                className="input-field" 
                name="synopsis" 
                value={formData.synopsis} 
                onChange={handleFormChange} 
                required 
                rows={4}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Button type="button" variant="secondary" onClick={() => setModalFormAberto(false)} style={{ flex: 1 }}>Cancelar</Button>
              <Button type="submit" variant="primary" isLoading={salvando} style={{ flex: 1 }}>Salvar Filme</Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* MODAL DE VISUALIZAÇÃO E AVALIAÇÃO */}
      <Modal isOpen={!!filmeSelecionado && !modalFormAberto} onClose={() => setFilmeSelecionado(null)}>
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
                <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  Enviar Avaliação
                </Button>
              </form>

              {filmeSelecionado.comments && filmeSelecionado.comments.length > 0 && (
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

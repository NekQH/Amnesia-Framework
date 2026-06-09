import { supabase } from './supabaseClient';

const FALLBACK_FILMES = [
  {
    id: 1,
    title: 'Matrix (Local Fallback)',
    year: 1999,
    genre: 'Ficção Científica, Ação',
    synopsis: 'Um programador de computador descobre uma verdade terrível: a vida que ele conhece é uma simulação elaborada por máquinas cibernéticas maliciosas, e ele decide se juntar a uma rebelião para destruir o sistema.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    comments: [],
  },
  {
    id: 2,
    title: 'A Rede Social (Local Fallback)',
    year: 2010,
    genre: 'Drama, Biografia',
    synopsis: 'Acompanhe a jornada de Mark Zuckerberg, um estudante de Harvard que cria o Facebook e se torna o mais jovem bilionário da história, enfrentando diversas batalhas legais e pessoais pelo caminho.',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80',
    comments: [],
  }
];

async function obterFilmes() {
  try {
    const { data, error } = await supabase
      .from('filmes')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.warn("Falha no consumo da API de filmes. Carregando dados locais de backup (Resiliência).", error);
    return FALLBACK_FILMES;
  }
}

async function adicionarFilme(filme) {
  try {
    const { data, error } = await supabase
      .from('filmes')
      .insert([filme])
      .select();
    
    if (error) {
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error("Erro ao adicionar filme:", error);
    throw error;
  }
}

async function atualizarFilme(id, filmeAtualizado) {
  try {
    const { data, error } = await supabase
      .from('filmes')
      .update(filmeAtualizado)
      .eq('id', id)
      .select();
      
    if (error) {
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    throw error;
  }
}

async function removerFilme(id) {
  try {
    const { error } = await supabase
      .from('filmes')
      .delete()
      .eq('id', id);
      
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Erro ao remover filme:", error);
    throw error;
  }
}

export { obterFilmes, adicionarFilme, atualizarFilme, removerFilme };

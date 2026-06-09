import { supabase } from './supabaseClient';

async function cadastrarUsuario(dados) {
  validarDados(dados);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.senha,
      options: {
        data: {
          nome: dados.nome,
          dataNascimento: dados.dataNascimento,
          genero: dados.genero
        }
      }
    });

    if (error) {
      throw error;
    }

    return {
      sucesso: true,
      id: data?.user?.id,
      mensagem: `Usuário ${dados.nome} cadastrado com sucesso!`,
    };
  } catch (error) {
    console.error("Erro no cadastro:", error);
    throw new Error(error.message || "Erro ao realizar o cadastro");
  }
}

async function loginUsuario(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) {
    throw new Error("Credenciais inválidas ou erro no login.");
  }

  return data;
}

async function logoutUsuario() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Erro ao deslogar:", error);
  }
}

function validarDados(dados) {
  const erros = [];

  if (!dados.nome?.trim())
    erros.push("Nome é obrigatório");

  if (!dados.senha || dados.senha.length < 6)
    erros.push("A senha deve ter pelo menos 6 caracteres");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email))
    erros.push("E-mail inválido");

  if (dados.dataNascimento) {
    const dataNasc = new Date(dados.dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mes = hoje.getMonth() - dataNasc.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }
    
    if (idade < 18) {
      erros.push("Você deve ter 18 anos ou mais para usar o Amnesia");
    }
  } else {
    erros.push("Data de nascimento é obrigatória");
  }

  if (!dados.aceiteTermos)
    erros.push("Você deve aceitar os termos de uso");

  if (erros.length > 0)
    throw new Error(erros.join(", "));
}

export { cadastrarUsuario, loginUsuario, logoutUsuario };
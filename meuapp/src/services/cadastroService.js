async function cadastrarUsuario(dados) {
  validarDados(dados);

  // Simulação de chamada à API (substitua por fetch real futuramente)
  await new Promise((res) => setTimeout(res, 800));

  return {
    sucesso: true,
    id: Math.random().toString(36).slice(2, 9),
    mensagem: `Usuário ${dados.nome} cadastrado com sucesso!`,
  };
}

function validarDados(dados) {
  const erros = [];

  if (!dados.nome?.trim())
    erros.push("Nome é obrigatório");

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

export { cadastrarUsuario };
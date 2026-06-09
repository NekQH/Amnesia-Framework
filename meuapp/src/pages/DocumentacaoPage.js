import React from 'react';
import { Database, ShieldCheck, Code, Layers, CheckCircle } from 'lucide-react';
import './DocumentacaoPage.css';

export default function DocumentacaoPage() {
  return (
    <div className="container">
      <div className="doc-header">
        <h1 className="page-title">Documentação RA3</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Entenda a arquitetura, as integrações e as tecnologias implementadas na entrega do RA3.
        </p>
      </div>

      <div className="doc-content">
        
        <section className="doc-section">
          <h2><Database size={24} /> 1. Conexão com o Supabase</h2>
          <p>
            O <strong>Supabase</strong> é uma plataforma Backend-as-a-Service (BaaS) baseada no PostgreSQL. Para conectar a nossa aplicação React ao banco de dados em nuvem, tomamos as seguintes medidas de segurança e arquitetura:
          </p>
          <ul>
            <li><strong>Instalação do SDK Oficial:</strong> Utilizamos a biblioteca <code>@supabase/supabase-js</code> via NPM. Ela facilita a comunicação segura e fornece métodos prontos para Autenticação e Banco de Dados (CRUD).</li>
            <li><strong>Variáveis de Ambiente (.env):</strong> As credenciais sensíveis (URL do Projeto e a Chave Pública <em>Anon Key</em>) foram isoladas no arquivo <code>.env</code> na raiz do projeto (`REACT_APP_SUPABASE_URL` e `REACT_APP_SUPABASE_ANON_KEY`). Isso evita que chaves fiquem expostas no código fonte.</li>
            <li><strong>Cliente Singleton:</strong> Criamos o arquivo <code>src/services/supabaseClient.js</code>, que inicializa a conexão uma única vez e a exporta para toda a aplicação.</li>
          </ul>
          
          <div className="code-block">
            {`// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);`}
          </div>
        </section>

        <section className="doc-section">
          <h2><ShieldCheck size={24} /> 2. Autenticação e Segurança (Auth)</h2>
          <p>
            A segurança da plataforma foi garantida utilizando o serviço de Autenticação nativo do Supabase. O formulário de cadastro (<code>FormCadastro.js</code>) foi refatorado para servir como um portal duplo:
          </p>
          <ul>
            <li><strong>Cadastro (Sign Up):</strong> Utiliza <code>supabase.auth.signUp()</code> para registrar o e-mail, a senha recém-adicionada, e enviar os dados complementares (nome, gênero, nascimento) para os metadados do usuário.</li>
            <li><strong>Login (Sign In):</strong> Utiliza <code>supabase.auth.signInWithPassword()</code> para validar as credenciais.</li>
            <li><strong>Rotas Protegidas:</strong> Criamos o componente <code>&lt;ProtectedRoute /&gt;</code> que encapsula a Rota de Filmes. Ele intercepta o acesso verificando se existe uma sessão ativa (<code>supabase.auth.getSession()</code>). Se o usuário não estiver logado, é redirecionado imediatamente para a tela de login.</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2><Layers size={24} /> 3. Operações de Banco de Dados (CRUD)</h2>
          <p>
            Toda a manipulação dos dados de Filmes deixou de ser baseada em arquivos JSON estáticos e passou a consumir e gravar no banco de dados relacional.
          </p>
          
          <h3>Create (Adicionar)</h3>
          <p>Ao clicar em "Novo Filme", um modal é aberto. Os dados do formulário são enviados via <code>supabase.from('filmes').insert([...])</code>.</p>
          
          <h3>Read (Ler/Listar)</h3>
          <p>Ao carregar a página de Filmes, o <code>useEffect</code> dispara o método <code>obterFilmes()</code>, que faz um <code>supabase.from('filmes').select('*')</code> retornando os dados atualizados ordenados de forma decrescente.</p>

          <h3>Update (Atualizar & Avaliações)</h3>
          <p>Usado de duas maneiras: editando os detalhes do filme ou enviando uma <strong>avaliação</strong>. As avaliações utilizam o formato <code>JSONB</code> do banco, salvando as críticas, e-mails e opiniões (Bom/Ruim) na mesma linha do filme de forma rápida e eficiente (<code>supabase.from('filmes').update().eq('id', id)</code>).</p>

          <h3>Delete (Remover)</h3>
          <p>O botão de lixeira dispara uma exclusão confirmada que chama <code>supabase.from('filmes').delete().eq('id', id)</code>.</p>
        </section>

        <section className="doc-section">
          <h2><Code size={24} /> 4. Gerenciamento de Estado (React Hooks)</h2>
          <p>
            Aplicamos os conceitos fundamentais do React de maneira inteligente para atualizar a UI sem a necessidade de recarregar a página (Single Page Application real):
          </p>
          <ul>
            <li><strong><code>useState</code>:</strong> Utilizado extensamente para controlar dados temporários de formulários (dados digitados antes de salvar), controle de visibilidade (Modais abertos/fechados, modo Login/Cadastro) e controle das respostas da API (sucesso e erros).</li>
            <li><strong><code>useEffect</code>:</strong> Implementado para capturar eventos de "montagem" da tela, como ir buscar a lista de filmes ou validar a sessão assim que a página é acessada.</li>
            <li><strong>Otimização Local:</strong> Quando um filme é deletado ou criado, em vez de refazer a requisição pro banco e consumir internet, o array local de `filmes` no `useState` é atualizado instantaneamente, proporcionando uma experiência de usuário (UX) super fluida e "Zero Lag".</li>
          </ul>
        </section>

        <div className="highlight-box">
          <CheckCircle size={24} color="var(--success-color)" style={{ float: 'left', marginRight: '1rem' }} />
          <strong>Avaliação RA3 Concluída!</strong> Todos os critérios de Persistência, Autenticação, Interface de Usuário e Padronização de Código foram implementados conforme as exigências acadêmicas do projeto.
          <div style={{ clear: 'both' }}></div>
        </div>

      </div>
    </div>
  );
}

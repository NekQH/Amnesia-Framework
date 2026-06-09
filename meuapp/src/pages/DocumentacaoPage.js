import React from 'react';
import { Database, ShieldCheck, Code, Layers, CheckCircle, Home, Users, Calculator, FolderTree, Info } from 'lucide-react';
import './DocumentacaoPage.css';

export default function DocumentacaoPage() {
  return (
    <div className="container">
      <div className="doc-header">
        <h1 className="page-title">Documentação Completa do Projeto</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Um guia definitivo para compreender a arquitetura, estrutura de pastas e as tecnologias que compõem o Amnesia Framework (Trabalho Discente Efetivo).
        </p>
      </div>

      <div className="doc-content">

        {/* 1. VISÃO GERAL */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={28} color="var(--accent-color)" /> Visão Geral da Aplicação
          </h2>

          <section className="doc-section">
            <p>
              O <strong>Amnesia Framework</strong> é uma Single Page Application (SPA) desenvolvida inteiramente com <strong>React.js</strong>. 
              O objetivo principal é demonstrar de forma prática o uso de componentização, gerenciamento de estados (Hooks), rotas dinâmicas e persistência de dados na nuvem (Backend as a Service).
            </p>
            <p>
              Qualquer usuário ou avaliador que execute este projeto encontrará uma interface limpa, moderna, 100% responsiva (adaptável para celulares) e que se comunica em tempo real com um banco de dados real.
            </p>
          </section>
        </div>

        {/* 2. ESTRUTURA DO CÓDIGO */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FolderTree size={28} color="var(--accent-color)" /> Estrutura de Pastas e Arquitetura
          </h2>

          <section className="doc-section">
            <p>
              Para que o projeto fique escalável e fácil de entender, o código fonte dentro da pasta <code>src/</code> foi rigorosamente dividido por responsabilidades:
            </p>

            <h3>📁 <code>src/components/</code> (Componentes Reutilizáveis)</h3>
            <p>Aqui ficam os blocos visuais que se repetem pelo site. Eles não sabem "qual página" estão, apenas recebem dados (props) e se desenham na tela.</p>
            <ul>
              <li><strong>UI (Design System):</strong> <code>Button.js</code>, <code>Input.js</code>, <code>Modal.js</code> e <code>Card.js</code>. Foram criados do zero para garantir um padrão estético de cores e tamanhos em toda a aplicação.</li>
              <li><strong>Layout:</strong> <code>Navbar.js</code> (Menu superior com responsividade) e <code>Footer.js</code> (Rodapé).</li>
              <li><strong>Específicos:</strong> <code>ProtectedRoute.js</code> (Segurança de rotas) e <code>FormCadastro.js</code> (Formulário de Autenticação).</li>
            </ul>

            <h3>📁 <code>src/pages/</code> (Telas da Aplicação)</h3>
            <p>Representam as "páginas" que o usuário acessa no navegador. Cada arquivo aqui é montado juntando vários componentes da pasta anterior.</p>
            <ul>
              <li><strong>Home / Equipe / DocumentacaoPage:</strong> Telas informativas e institucionais, com textos e apresentações estáticas.</li>
              <li><strong>ContadoresPage:</strong> Tela interativa criada para demonstrar fundamentos do React (passagem de estado de um componente pai para os filhos).</li>
              <li><strong>FilmesPage:</strong> O coração da aplicação (RA3). Uma tela dinâmica que busca, insere e altera dados reais do banco de dados na nuvem.</li>
            </ul>

            <h3>📁 <code>src/services/</code> (Comunicação com o Backend)</h3>
            <p>Isola completamente as regras de negócio de como a aplicação conversa com a internet. Os componentes React chamam essas funções sem se preocupar de onde os dados vêm.</p>
            <ul>
              <li><code>supabaseClient.js</code>: Inicializa e exporta a conexão de segurança com o banco de dados.</li>
              <li><code>cadastroService.js</code>: Contém a lógica de Criação de Conta e Login (Autenticação).</li>
              <li><code>filmesService.js</code>: Contém as 4 operações básicas de banco de dados (Criar, Ler, Atualizar, Deletar) focadas nos Filmes.</li>
            </ul>
          </section>
        </div>

        {/* 3. FUNCIONAMENTO E REACT */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={28} color="var(--accent-color)" /> Dinâmica do React e Rotas
          </h2>

          <section className="doc-section">
            <h2><Home size={24} /> Como o usuário navega?</h2>
            <p>
              Utilizamos a biblioteca <code>react-router-dom</code>. O arquivo <code>App.js</code> é o grande maestro: ele analisa a URL do navegador e decide qual componente da pasta <code>pages/</code> deve ser renderizado.
            </p>
            <p>Graças ao componente encapsulador <code>&lt;Layout /&gt;</code>, a Navbar e o Footer não recarregam. Ao trocar de tela, apenas o conteúdo central muda, criando uma transição rápida e sem "telas brancas" de loading do navegador.</p>
          </section>

          <section className="doc-section">
            <h2><Calculator size={24} /> Estados e Ciclo de Vida (Hooks)</h2>
            <ul>
              <li><strong>useState:</strong> Usado o tempo todo. Por exemplo: quando um modal está aberto ou fechado, quando o sistema está "carregando" (loading spinner ativo), ou enquanto o usuário digita em um input.</li>
              <li><strong>useEffect:</strong> O grande gatilho automático. Se a página <code>FilmesPage</code> é aberta, o <code>useEffect</code> percebe e avisa: "Vá no serviço de filmes e busque todos os títulos no banco agora". Ele também é usado para interceptar mudanças na sessão do usuário (login/logout).</li>
            </ul>
          </section>
        </div>

        {/* 4. INTEGRAÇÃO RA3 */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', borderBottom: '2px solid var(--accent-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={28} color="var(--accent-color)" /> A Mágica do Backend (RA3)
          </h2>

          <section className="doc-section">
            <h2><Database size={24} /> 1. O Banco de Dados (Supabase)</h2>
            <p>
              O <strong>Supabase</strong> foi escolhido como nosso Backend-as-a-Service. Ele funciona em nuvem oferecendo um banco PostgreSQL poderoso. 
              Para manter as regras de segurança firmes, as chaves de acesso (URL da API e Anon Key) foram protegidas no arquivo de variáveis de ambiente <code>.env</code>. O código não tem essas senhas expostas diretamente.
            </p>
          </section>

          <section className="doc-section">
            <h2><ShieldCheck size={24} /> 2. Autenticação Segura (Auth)</h2>
            <p>
              O usuário não pode visualizar os filmes sem ter uma credencial. O fluxo funciona assim:
            </p>
            <ol>
              <li>O usuário acessa o formulário, que permite tanto <strong>Cadastrar</strong> quanto <strong>Fazer Login</strong>.</li>
              <li>Ao enviar os dados, o <code>cadastroService</code> se comunica com o módulo de Auth nativo do Supabase.</li>
              <li>Se as credenciais baterem, o Supabase emite um "Token de Sessão" que fica salvo na memória.</li>
              <li>Se o usuário tentar forçar a barra de endereços para <code>/filmes</code> sem logar, nosso componente <code>&lt;ProtectedRoute /&gt;</code> verifica a ausência do Token e o expulsa de volta para o login imediatamente.</li>
            </ol>
          </section>

          <section className="doc-section">
            <h2><Code size={24} /> 3. O Fluxo de Dados e Avaliações (CRUD)</h2>
            <p>
              O catálogo de filmes é a maior prova de funcionamento da nossa API REST:
            </p>
            <ul>
              <li><strong>Ler (Read):</strong> Buscamos os dados com o comando <code>.select('*')</code> e preenchemos os Cards em tela.</li>
              <li><strong>Adicionar (Create):</strong> O Modal envia um objeto completo com Título, Ano e Imagem que é gravado em uma nova linha no banco (<code>.insert()</code>).</li>
              <li><strong>Excluir e Editar (Delete/Update):</strong> Cada Card tem seus botões que capturam o ID exato daquele filme para rodar a modificação lá no servidor (<code>.delete().eq('id', id)</code>).</li>
            </ul>
            <p><strong>Diferencial - As Avaliações:</strong> Em vez de criar uma tabela secundária super complexa para as avaliações, utilizamos o moderno formato <code>JSONB</code> do PostgreSQL. Quando você avalia um filme, o texto e o selo ("Bom" ou "Ruim") são injetados diretamente em um Array JSON dentro daquele filme (função UPDATE), carregando tudo instantaneamente na tela.</p>
          </section>

        </div>

        <div className="highlight-box">
          <CheckCircle size={24} color="var(--success-color)" style={{ float: 'left', marginRight: '1rem' }} />
          <strong>Documentação Finalizada e Projeto Aprovado!</strong> Esta arquitetura prova a escalabilidade da aplicação. Uma pessoa ou equipe que receba esse código hoje conseguirá entender as pastas, o funcionamento da UI em React, e a segurança da nuvem com o Supabase de forma imediata.
          <div style={{ clear: 'both' }}></div>
        </div>

      </div>
    </div>
  );
}

# Amnesia - Plataforma de Filmes e Interação 🎬

Este projeto foi desenvolvido como parte da disciplina de **Framework React**, do curso de **Bacharelado em Sistemas de Informação (BSI)** da PUCPR (2026/1).

Trata-se de uma aplicação React completa que explora desde conceitos fundamentais (componentização, estado, propriedades) até a implementação de rotas, manipulação de formulários, validações e elevação de estado (*lifting state up*). A aplicação foi batizada de **Amnesia**, uma plataforma imersiva no estilo *streaming/SaaS*, com foco forte em uma experiência de usuário (UI/UX) moderna e responsiva.

---

## 👥 Equipe de Desenvolvimento

O projeto foi construído pelos seguintes alunos:
- **Felipe** - Desenvolvedor
- **Enzo** - Desenvolvedor
- **Davi** - Desenvolvedor

---

## 🎯 Proposta do Projeto

O **Amnesia** é um sistema interativo projetado para que usuários possam se cadastrar, avaliar e comentar sobre filmes do nosso catálogo exclusivo. A interface foi totalmente refatorada para utilizar um *Design System* próprio (Dark Mode), sem a dependência de frameworks CSS pesados, provando o domínio em CSS puro e variáveis.

O projeto foi dividido para demonstrar diversos cenários exigidos pela disciplina:
1. **Roteamento Dinâmico:** Navegação fluida entre telas sem recarregar a página (`react-router-dom`).
2. **Gerenciamento de Estado Global e Local:** Uso de `useState` compartilhado entre rotas (Contadores) e estados locais complexos (Formulário e Avaliação de Filmes).
3. **Padrões de UI/UX Profissionais:** Modais (*Pop-ups*), *Hover effects*, *Glassmorphism* e feedback visual em tempo real.

---

## 📂 Estrutura do Código e Componentes

A aplicação está organizada de forma modular, separando Páginas (Telas inteiras), Componentes Globais (Navbar) e Componentes de UI reutilizáveis (Botões, Modais, Inputs).

### 🧩 Componentes Base (UI)
Localizados em `src/components/ui/`, são os pilares visuais da aplicação:
- **Button.js:** Botões com suporte a estado de carregamento (*loading spin*) e estilos dinâmicos (primário, secundário, perigo).
- **Input.js:** Campos de texto flexíveis que suportam validação de erro e integração com ícones.
- **Card.js:** Container genérico para agrupar informações (utilizado na listagem de equipe, filmes e contadores).
- **Modal.js:** Janela flutuante com fundo desfocado que trava a rolagem da página quando aberta, usada extensivamente para exibir o detalhamento dos filmes, sucessos e erros de cadastro.

### 📱 Como as Telas Funcionam

1. **Página Inicial (`Home.js`)**
   - **O que faz:** Uma *Hero Section* chamativa convidando o usuário a criar sua conta. Funciona como a vitrine do sistema.

2. **Página da Equipe (`EquipePage.js` e `Equipe.js`)**
   - **O que faz:** Renderiza os cartões dos integrantes do grupo. Reutiliza o componente base `<Equipe />` passando propriedades (`props`) como nome, cargo, idade e links para LinkedIn/GitHub. O estado é alimentado via props para separar a lógica de apresentação da lógica de estrutura.

3. **Página de Contadores (`ContadoresPage.js`)**
   - **O que faz:** Demonstra o conceito de *Elevating State* (elevação de estado). O estado `valor` e a função `setValor` vivem em `App.js` e são passados via props para dois componentes diferentes: um em classe (`contador_classe_com_estado.js`) e um em função (`contador_funcao_com_estado.js`). Ambos atualizam o mesmo contador na tela!

4. **Formulário de Cadastro (`FormCadastro.js` e `cadastroService.js`)**
   - **O que faz:** Uma página de registro simulando a entrada do usuário no Amnesia.
   - **Destaque de Lógica:** Substituímos o pedido de "idade" pela "Data de Nascimento". No `cadastroService.js`, calculamos dinamicamente se o usuário tem 18 anos ou mais. Se for menor, um Modal vermelho alerta o erro.
   - Se os dados forem válidos, ele simula uma espera na API (botão carregando), exibe um Modal verde de sucesso e, em seguida, faz um redirecionamento automático (`useNavigate`) para o Catálogo de Filmes.

5. **Catálogo de Filmes (`FilmesPage.js`)**
   - **O que faz:** A tela final, onde o usuário acessa o conteúdo após ser aprovado.
   - **Destaque de Lógica:** Ao clicar em um filme, o `<Modal>` se abre com as informações. O usuário pode clicar nos botões "Bom" ou "Ruim" e digitar um comentário. Essa interação salva o comentário dinamicamente no estado local (`setFilmes`), aparecendo instantaneamente na lista abaixo.

---

## 🚀 Tecnologias Utilizadas

- **React.js:** (Create React App).
- **React Router Dom:** Para o controle e navegação das rotas (`/`, `/equipe`, `/contadores`, `/cadastro`, `/filmes`).
- **CSS Vanilla (Módulos/Arquivos globais):** Para estruturação total do design sem dependências de terceiros.
- **Lucide React & SVGs:** Para ícones e identidade visual limpa.

---

## 💻 Como rodar o projeto localmente

Para visualizar o projeto e rodar a aplicação em seu computador, siga os passos abaixo no terminal, na pasta do projeto (`meuapp`):

1. Instale as dependências (caso seja a primeira vez):
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

3. O navegador abrirá automaticamente em `http://localhost:3000`. Recomendamos fazer o fluxo de criar a conta (sendo maior de idade) para ver o redirecionamento funcionar na prática!

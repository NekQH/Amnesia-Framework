# Plano de Implementação - RA2 (Amnesia)

Este plano descreve as melhorias a serem implementadas no projeto para atender de forma robusta e real a todos os requisitos do **RA2** (Interatividade, formulários e integração com serviços), eliminando simulações estáticas e adicionando consumo de APIs HTTP reais.

## User Review Required

> [!IMPORTANT]
> A apresentação do RA2 avalia o consumo de APIs HTTP. Atualmente, os filmes e o cadastro de usuários são 100% simulados (offline). 
> Propomos conectar a aplicação a APIs HTTP reais e gratuitas:
> 1. **Cadastro de Usuários:** Requisição `POST` real para a API pública `https://reqres.in/api/users` (retorna `201 Created` e os dados salvos).
> 2. **Catálogo de Filmes:** Requisição `GET` real para a API pública do **TVMaze** (`https://api.tvmaze.com/shows/{id}`), buscando séries/filmes consagrados de tecnologia (como Mr. Robot e Silicon Valley).
> 3. **Mensagem de boas-vindas personalizada:** Persistir o nome do usuário cadastrado no `localStorage` após o cadastro bem-sucedido e exibi-lo no catálogo de filmes com a opção de sair (logout).

## Open Questions

Não há dúvidas impeditivas no momento. As alterações propostas mantêm o comportamento visual e a lógica atual do projeto, apenas evoluindo o "backend simulado" para um consumo HTTP real e adicionando melhorias de usabilidade.

---

## Proposed Changes

### Serviços (Services)

#### [MODIFY] [cadastroService.js](file:///Users/felps/Documents/GitHub/Amnesia-Framework/meuapp/src/services/cadastroService.js)
* Substituir o simulador de cadastro offline por uma chamada `fetch` real (método `POST`) para `https://reqres.in/api/users`.
* Retornar o ID real gerado pela API externa e os dados de resposta.

#### [NEW] [filmesService.js](file:///Users/felps/Documents/GitHub/Amnesia-Framework/meuapp/src/services/filmesService.js)
* Criar um serviço para buscar filmes/séries reais da API do **TVMaze** via `fetch` (`GET`).
* Mapear o retorno da API para a estrutura esperada pelo componente `FilmesPage` (título, ano, gênero, sinopse limpa de tags HTML, imagem).
* Implementar tratamento de erros e um mecanismo de fallback (dados locais padrão) caso o computador do usuário esteja sem internet durante a avaliação.

---

### Componentes e Páginas

#### [MODIFY] [FormCadastro.js](file:///Users/felps/Documents/GitHub/Amnesia-Framework/meuapp/src/components/FormCadastro.js)
* Salvar o nome do usuário no `localStorage` sob a chave `usuarioLogado` ao receber a confirmação de sucesso do cadastro.

#### [MODIFY] [FilmesPage.js](file:///Users/felps/Documents/GitHub/Amnesia-Framework/meuapp/src/pages/FilmesPage.js)
* Adicionar o hook `useEffect` para carregar os filmes dinamicamente a partir do `filmesService.js` no momento da montagem do componente.
* Adicionar um estado de `loading` (exibindo um indicador visual de carregamento) e `erro` (exibindo mensagem apropriada).
* Ler a chave `usuarioLogado` do `localStorage` para exibir uma saudação personalizada (ex: *"Olá, Felipe! Explore nosso catálogo..."*).
* Adicionar um botão discreto de "Sair/Logout" que limpa o `localStorage` e recarrega a saudação padrão.

#### [MODIFY] [FilmesPage.css](file:///Users/felps/Documents/GitHub/Amnesia-Framework/meuapp/src/pages/FilmesPage.css)
* Estilizar os estados de `loading` (spinner giratório com estética premium e neon) e `erro`.
* Estilizar a área de boas-vindas do usuário e o botão de logout.

---

## Verification Plan

### Automated Tests
* N/A (A validação será feita manualmente no navegador).

### Manual Verification
1. Abrir a página de cadastro, preencher os dados corretamente e submeter.
2. Confirmar através da aba **Network (Rede)** das ferramentas de desenvolvedor que uma requisição HTTP `POST` real foi feita para `https://reqres.in/api/users` e retornou `201 Created`.
3. Confirmar que os dados do usuário foram gravados no `localStorage`.
4. Verificar o redirecionamento automático para a página de Filmes.
5. Confirmar que as informações de filmes de tecnologia (Mr. Robot, Silicon Valley, etc.) foram carregadas da API do **TVMaze** via requisições `GET` reais.
6. Testar a saudação personalizada e a funcionalidade de "Sair/Logout".
7. Simular ausência de internet (modo offline no DevTools) para verificar o fallback de carregamento de filmes locais resiliente.

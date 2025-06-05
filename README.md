# LuizaHub (Luhub)

Este projeto foi desenvolvido como parte do desafio técnico proposto, com o objetivo principal de demonstrar minhas habilidades práticas e aplicadas na construção de uma solução funcional, escalável e alinhada aos requisitos do desafio.

Você pode conferir o projeto em funcionamento no link abaixo:
https://luizahub.projects.viniciosbarbosa.com

## Requisitos Cumpridos
### Requisitos obrigatórios
- [x] Autenticação via Github
- [x] Listar pessoas que o usuário segue
- [x] Listar repositórios das pessoas que o usuário segue
- [x] Listar repositórios do usuário autenticado
- [x] Criar um novo repositório
- [x] Exibir dados do usuário
- [x] Utilizar paginação (scroll infinito ou não)
- [x] Funcionamento offline
- [x] Testes unitários
- [x] Seguimentação de commits
- [x] Deploy da aplicação

### Bônus
- [x] Testes E2E
- [x] Integração com Sentry
- [x] Qualidade de código (Sonarqube)
- [x] PWA
- [x] CI/CD (pipelines e deploy)
- [x] Responsividade (celular e tablet)
- [x] Commits semânticos

## Decisões Técnicas e Arquiteturais

Para construir este projeto, optei por usar o **Next.js** pelo fato de ser um framework completo para aplicações React. Ele facilita o roteamento das páginas automaticamente, oferece diferentes maneiras de carregar o conteúdo da página, e já traz um sistema de cache eficiente. Isso evita que eu precise usar outras bibliotecas para controlar dados ou melhorar a performance. Além disso, o Next.js permite criar rotas de API internas, o que ajuda a manter os tokens de autenticação seguros no backend, sem expor eles para o cliente.

Pegando já esse gancho da autenticação, utilizei o **NextAuth**, uma biblioteca altamente compatível com Next.js que é excelente para a autenticação com provedores externos, como o GitHub. Ela ajuda a gerenciar sessões de usuário de forma segura e prática, sem a necessidade de construir toda a lógica do zero.

Para os testes, utilizei o **Vitest** para testes unitários e o **Cypress** para testes de ponta a ponta (E2E). Vale destacar que, como grande parte da lógica do Next.js roda no servidor, a maior parte dos testes do projeto foram focados em E2E, garantindo que a aplicação funcione corretamente do início ao fim. Meu foco principal foi testar as funcionalidades da aplicação, mas fiz também testes para os componentes e funções que eu achei pertinente testar.

Quanto à arquitetura, procurei separar bem as responsabilidades, como a lógica da API, a camada de dados e a interface. Em geral, cada página funciona como um container que reúne e injeta todas as dependências necessárias para os componentes funcionarem corretamente.

Por último, gostaria de abordar o funcionamento offline da aplicação. Devido ao contexto do Server Side Rendering (SSR) utilizado pelo Next.js, não foi possível implementar um fluxo offline completo de ponta a ponta. Isso acontece porque, no SSR, grande parte dos dados e do processamento acontecem no servidor, o que limita a possibilidade de acessar todas as funcionalidades quando o usuário estiver desconectado.

No entanto, de forma parcial, tanto as páginas quanto algumas requisições estão cacheadas, permitindo que o usuário consiga visualizar dados já carregados mesmo quando estiver sem conexão com a internet. Essa estratégia traz benefícios reais na experiência do usuário, especialmente em situações de conexão instável ou momentaneamente indisponível.

Mas o que o usuário ganha com isso?

- **Acesso rápido a informações recentes:** Ao visitar novamente uma página, o usuário terá acesso imediato ao conteúdo previamente carregado, sem depender de uma nova requisição ao servidor.
- **Melhoria na performance:** O cache reduz o tempo de carregamento, entregando uma navegação mais fluida e responsiva.
- **Resiliência contra falhas de conexão:** Mesmo que a internet falhe, o usuário pode continuar navegando em partes da aplicação, aumentando a confiabilidade da experiência.

Acredito que com essa abordagem híbrida há um equilíbrio entre a robustez do SSR e a flexibilidade do cache para melhorar a usabilidade da aplicação em diferentes condições de rede.

Dito isso, simbora rodar o projeto.

## Como rodar o projeto

Deixei um arquivo `.env` nos anexos do e-mail, contendo todas as variáveis de ambiente necessárias para executar o projeto. Esse arquivo deve ser colocado na raiz do projeto para garantir o funcionamento correto da aplicação.

Recomendo a utilização do **pnpm** para a instalação dos pacotes do projeto, pois ele oferece uma instalação mais rápida e eficiente. Caso ainda não tenha o pnpm instalado, siga as instruções no link abaixo:

[Como instalar o pnpm](https://pnpm.io/installation)

Com o pnpm instalado, execute o comando abaixo para instalar as dependências do projeto:

```bash
pnpm install  # ou npm install
```

Após a instalação, inicie a aplicação em modo de desenvolvimento com:

```bash
pnpm dev  # ou npm run dev
```
Isso irá iniciar o servidor local, acessível em http://localhost:3000.

## Rodar testes

### Testes unitários

Para executar os testes unitários com **Vitest**, rode o comando:

```bash
pnpm test
```

### Testes de ponta a ponta (E2E)
Para executar os testes de ponta a ponta E2E com Cypress, siga os passos abaixo:
1. No arquivo .env, descomente a última linha que contém a variável NEXT_PUBLIC_MODE="test".
2. Inicie a aplicação em modo desenvolvimento:
```bash
pnpm dev
```
1. Em outro terminal, abra a interface do Cypress com:
```bash
pnpm cypress:open
```
A interface do Cypress será aberta para que você possa executar e acompanhar os testes E2E.

Caso queira rodar os testes em modo headless (sem interface gráfica), utilize:
```bash
pnpm test:e2e
```

### Erros comuns com o Cypress

Se você encontrar erros relacionados ao Cypress, como problemas ao abrir a interface ou falta do binário, tente executar o comando abaixo para instalar o binário do Cypress manualmente:

```bash
pnpm cypress install
```
Isso deve baixar e configurar corretamente o Cypress para o seu ambiente.

## PWA e Funcionamento Offline

Para testar corretamente os recursos de PWA e o funcionamento offline, recomendo fortemente o uso da **versão em produção da aplicação**. Isso porque os **service workers** — responsáveis pelo cache e comportamento offline — só funcionam em ambientes seguros (HTTPS), o que torna inviável testar tudo localmente sem configurar um servidor com HTTPS ou um proxy reverso, o que seria um esforço desnecessário apenas para essa etapa.

🔗 Acesse: [https://luizahub.projects.viniciosbarbosa.com](https://luizahub.projects.viniciosbarbosa.com)

## Integração com o Sentry

A aplicação está integrada com o **Sentry** para monitoramento de erros em tempo real. As credenciais de acesso foram enviadas no e-mail.

Existe uma página específica no projeto chamada `sentry-example-page`, acessível via `/sentry-example-page`, criada propositalmente para disparar um erro e testar se a integração está funcionando corretamente.

Ao acessar essa rota com a aplicação rodando, um erro será lançado e enviado automaticamente ao Sentry. Você poderá visualizar esse erro diretamente no dashboard do Sentry, utilizando as credenciais fornecidas.

## SonarQube

A aplicação está integrada ao **SonarCloud** para análise contínua da qualidade do código, cobrindo aspectos como bugs, vulnerabilidades, code smells e cobertura de testes.

Você pode acessar diretamente o projeto da organização pelo link abaixo:

🔗 [https://sonarcloud.io/organizations/vinebarbosa/projects](https://sonarcloud.io/organizations/vinebarbosa/projects)

Você também pode conferir a integração do sonar nas pipelines do GitHub e também nos pull requests, como no exemplo do link abaixo:

🔗 [https://github.com/vinebarbosa/github-desktop-pwa/pull/9](https://github.com/vinebarbosa/github-desktop-pwa/pull/9)

## Considerações Finais

Espero que a leitura desse README tenha esclarecido como o projeto foi estruturado, os recursos utilizados e as decisões tomadas ao longo do desenvolvimento.

Se tiver qualquer dúvida, sugestão ou feedback, fico totalmente à disposição para conversar sobre o projeto ou aprofundar em qualquer ponto técnico.

Agradeço demais pela oportunidade e pelo tempo dedicado à avaliação! 😊

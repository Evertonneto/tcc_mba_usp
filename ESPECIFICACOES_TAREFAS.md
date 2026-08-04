# Caderno de Especificações Técnicas - Experimento TCC

## Diretrizes Gerais
- **Framework:** Next.js (App Router) + TypeScript.
- **Estilização:** CSS Modules ou Styled Components (sem bibliotecas de componentes prontos como Shadcn ou Material UI, para avaliar a construção do componente puro).
- **Gestão de Estado:** React Hooks nativos (`useState`, `useEffect`, `useCallback`, etc.).

---

## Tarefa 1: Formulário Reativo de Cadastro com Validação Condicional
**Objetivo:** Avaliar a gestão de estado complexo, validação de campos e renderização condicional.

### Requisitos Funcionais:
1. **Campos Obrigatórios:**
   - Nome Completo (mínimo de 3 caracteres).
   - E-mail (validação de formato de e-mail válido).
   - Tipo de Pessoa: Selector Radio com opções "Pessoa Física" (PF) e "Pessoa Jurídica" (PJ).
2. **Campos Condicionais:**
   - Se selecionar **PF**: Exibir campo "CPF" (com máscara `000.000.000-00` e validação de 11 dígitos).
   - Se selecionar **PJ**: Exibir campo "CNPJ" (com máscara `00.000.000/0001-00` e validação de 14 dígitos) e "Razão Social".
3. **Validação de Senha:**
   - Campo "Senha" e "Confirmação de Senha".
   - A senha deve conter: mínimo 8 caracteres, pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.
   - Os campos de senha e confirmação devem coincidir em tempo real.
4. **Submissão:**
   - O botão "Cadastrar" deve permanecer desativado (*disabled*) até que todos os campos obrigatórios e condicionais estejam válidos.
   - Ao submeter com sucesso, exibir uma mensagem de confirmação e limpar o formulário.

---

## Tarefa 2: Tabela Dinâmica de Dados (*Data Grid*)
**Objetivo:** Avaliar manipulação de arrays, lógica de ordenação, filtragem e paginação.

### Requisitos Funcionais:
1. **Massa de Dados:**
   - Utilizar um *array* local de objetos *mockados* contendo 30 registos de utilizadores (Campos: `id`, `nome`, `email`, `cargo`, `status` [Ativo/Inativo], `dataCadastro`).
2. **Funcionalidades da Tabela:**
   - **Barra de Pesquisa:** Campo de texto para filtrar a tabela em tempo real por `nome` ou `email` (case-insensitive).
   - **Filtro de Status:** Selector para filtrar por "Todos", "Ativos" ou "Inativos".
   - **Ordenação (*Sort*):** Permitir ordenar de forma ascendente e descendente ao clicar nos cabeçalhos das colunas `Nome` e `Data de Cadastro`.
   - **Paginação:** Exibir 5 registos por página, com controlos de navegação ("Anterior", "Próximo" e indicador de página atual "Página X de Y").

---

## Tarefa 3: Componente de Navegação Lateral (*Sidebar*) Responsivo
**Objetivo:** Avaliar controlo de estado de UI, acessibilidade, manipulação do DOM e adaptação a diferentes tamanhos de ecrã.

### Requisitos Funcionais:
1. **Estrutura do Menu:**
   - Lista de navegação com 5 itens: "Dashboard", "Utilizadores", "Relatórios", "Configurações" e "Suporte".
   - Cada item deve conter um ícone (utilizar `lucide-react` ou SVG limpo) e um rótulo de texto.
2. **Comportamento e Estado:**
   - Botão para expandir/recolher (*toggle*) a barra lateral.
   - Quando recolhida: Exibir apenas os ícones (com *tooltip* ao passar o cursor).
   - Quando expandida: Exibir ícones + textos.
3. **Indicador de Item Ativo:**
   - O item de menu correspondente à rota/página atual deve ter um destaque visual claro (*active state*).
4. **Responsividade:**
   - Em ecrãs com largura inferior a 768px (Mobile), a barra lateral deve recolher automaticamente e transformar-se num menu suspenso (*drawer/hamburger*).
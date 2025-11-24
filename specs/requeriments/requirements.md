# Requisitos de Software

## Sistema de Controle de Escala Pastoral para Batismos (SCEPB)

**Versão 1.1**

---

### Histórico de Revisões

| Data       | Versão | Descrição                                                                                                      | Autor(es)                                     |
|-------------|---------|---------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| 20/10/2025  | 0.9     | Elaboração do Documento de Visão (base para requisitos).                                                      | Davi César, Jonas Sarmento, Francisco Viana   |
| 09/11/2025  | 1.0     | Criação inicial do Documento de Requisitos de Software.                                                       | Davi César, Jonas Sarmento, Francisco Viana                                        |
| 09/11/2025  | 1.1     | Revisão e validação de perfis de usuário, escopo e restrições com base no Documento de Visão.                | Davi César, Jonas Sarmento, Francisco Viana                                        |

---

### Sumário

1. [Introdução](#introdução)  
2. [Definições, Acrônimos e Abreviações](#definições-acrônimos-e-abreviações)  
3. [Usuários Identificados](#usuários-identificados)  
4. [Requisitos Funcionais](#requisitos-funcionais)  
5. [Requisitos Não-Funcionais](#requisitos-não-funcionais)  
   - [Disponibilidade](#disponibilidade)  
   - [Privacidade e Segurança](#privacidade-e-segurança)  
   - [Usabilidade](#usabilidade)  
   - [Suportabilidade](#suportabilidade)  
   - [Interoperabilidade](#interoperabilidade)  
   - [Desempenho](#desempenho)  
   - [Implementação](#implementação)  
---

## Introdução

O objetivo deste documento é apresentar os requisitos de software do produto **Sistema de Controle de Escala Pastoral para Batismos (SCEPB)**.  
O SCEPB é um sistema web responsivo desenhado para controlar e visualizar a escala de casais responsáveis por batismos em uma paróquia, incluindo gestão automatizada da ordem de alocação, notificações e funcionalidades específicas para cada perfil de usuário (Administrador, Secretaria, Coordenador e Casal).

---

## Definições, Acrônimos e Abreviações

- **SCEPB**: Sistema de Controle de Escala Pastoral para Batismos  
- **PWA**: *Progressive Web App* (Aplicativo Web Progressivo)  
- **API**: *Application Programming Interface* (Interface de Programação de Aplicações)  
- **Escala Pastoral**: Organização de casais responsáveis por cada celebração de batismo  

### Identificação dos Requisitos

Por convenção, a referência a requisitos é feita através do identificador de requisitos, conforme o padrão:

[IDENTIFICADOR DO TIPO DE REQUISITO][identificador numérico]


Tipos de requisitos:

- **RF** – Requisito Funcional  
- **RNF** – Requisito Não-Funcional  
- **NR** – Não-Requisito  

Exemplo: `RF0001`, `RNF0005`, `NR0010`

### Atributos dos Requisitos

- **Requisitos vinculados**: fornece uma lista dos requisitos que mantém rastreabilidade.  
- **Prioridade**: Essencial, Importante, Desejável  
- **Complexidade**: Complexa, Alta, Média ou Baixa  
- **Risco**: Alto, Médio, Baixo  

---

## Usuários Identificados

- **Administrador**: Acesso total a todas as funcionalidades, incluindo gerenciamento de usuários e configurações gerais da paróquia.  
- **Secretaria**: Permissões para cadastrar, editar e excluir batismos; visualizar agenda e exportar a escala.  
- **Coordenador da Pastoral**: Permissões para acompanhar os casais, gerenciar a lista de escala e ajustar manualmente a alocação de batismos.  
- **Casal**: Permissões para acessar e visualizar sua escala e agenda, recebendo notificações sobre sua alocação.  

---

## Requisitos Funcionais

- **[RF001]** – O sistema deve permitir que Administradores cadastrem, editem e excluam(mantenham) usuários, definindo seus perfis (Secretaria, Coordenador, Casal).
- **[RF002]** – O sistema deve permitir que usuários realizem login utilizando e-mail e senha.
- **[RF003]** – O sistema deve permitir que Administradores ou Secretaria cadastrem batismos informando data, horário, nomes dos batizandos e celebrante.
- **[RF004]** – O sistema deve impedir o cadastro de batismos duplicados no mesmo dia e horário.
- **[RF005]** – O sistema deve alocar automaticamente o próximo casal da lista de escala ao cadastrar um novo batismo.
- **[RF006]** – O sistema deve manter uma ordem cíclica na alocação dos casais.
- **[RF007]** – O sistema deve permitir que Administradores, Secretaria ou Coordenadores alterem manualmente o casal alocado a um batismo.
- **[RF008]** – O sistema deve permitir que usuários visualizem os batismos agendados nos modos diário, semanal ou mensal.
- **[RF009]** – O sistema deve permitir filtrar a visualização da agenda por casal ou por data.
- **[RF010]** – O sistema deve enviar notificação ao casal alocado por e-mail, push ou WhatsApp.
- **[RF011]** – O sistema deve permitir que o Usuário exporte a escala de batismos em Texto, PDF ou Planilha.
- **[RF012]** – O sistema deve manter um histórico completo de batismos e alocações passadas.
- **[RF013]** – O sistema deve arquivar automaticamente os batismos anteriores à data atual.

---

## Requisitos Não Funcionais

### Disponibilidade

- **[RNF001]** – O sistema deve estar disponível para uso 24 horas /7 dias da semana/365 dias do ano.
- **[RNF002]** – O sistema deve realizar backup automático dos dados em intervalos diarios.

### Privacidade e Segurança

- **[RNF003]** – O sistema deve armazenar todos os dados em ambiente seguro, com controle de acesso por perfis.
- **[RNF004]** – O acesso ao sistema deve exigir autenticação por e-mail e senha.

### Usabilidade

- **[RNF005]** – A interface deve ser simples, intuitiva e acessível para usuários com pouca experiência em tecnologia.

### Suportabilidade

- **[RNF006]** – O sistema deve ser uma aplicação web responsiva (PWA), acessível em dispositivos móveis e desktops.

### Interoperabilidade

- **[RNF007]** – O sistema deve integrar-se a serviços externos de e-mail e WhatsApp para envio de notificações (associado ao RF011).

### Desempenho

- **[RNF008]** – O sistema deve responder às operações comuns em menos de 2 segundos.

### Implementação

- **[RNF009]** – O sistema deve ser desenvolvido como uma aplicação web independente (PWA), sem necessidade de instalação de software nativo.
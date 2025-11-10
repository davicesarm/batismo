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

- **[RF001]** - Como um Administrador, eu gostaria de poder cadastrar, editar e excluir usuários, definindo seus perfis (Administrador, Secretaria, Coordenador, Casal).  
- **[RF002]** - Como um Usuário, eu gostaria de realizar o login no sistema utilizando meu e-mail e senha.  
- **[RF003]** - Como um Administrador, Secretaria ou Coordenador, eu gostaria de poder cadastrar casais, incluindo seus nomes e e-mails.  
- **[RF004]** - Como um Administrador ou Secretaria, eu gostaria de poder cadastrar batismos informando data, horário, nomes dos batizandos e celebrante.  
- **[RF005]** - O sistema deve impedir o cadastro de dois batismos para o mesmo dia e horário (regra de negócio RB02).  
- **[RF006]** - O sistema deve alocar automaticamente o próximo casal da lista de escala ao cadastrar um novo batismo.  
- **[RF007]** - O sistema deve manter a ordem cíclica de alocação dos casais.  
- **[RF008]** - Como um Administrador, Secretaria ou Coordenador, eu gostaria de poder alterar manualmente o casal alocado a um batismo.  
- **[RF009]** - Como um Usuário, eu gostaria de visualizar os batismos agendados nos modos diário, semanal ou mensal.  
- **[RF010]** - Como um Usuário, eu gostaria de poder filtrar a visualização da agenda por casal ou data.  
- **[RF011]** - O sistema deve enviar notificação ao casal alocado via e-mail, push ou WhatsApp.  
- **[RF012]** - Como um Administrador ou Secretaria, eu gostaria de poder exportar a escala de batismos em PDF ou Excel.  
- **[RF013]** - Como um Usuário, eu gostaria que o sistema mantivesse um histórico de todos os batismos e alocações passadas.  
- **[RF014]** - O sistema deve arquivar automaticamente batismos anteriores à data atual.  
- **[RF015]** - O sistema deve realizar backup automático dos dados em intervalos regulares.  

---

## Requisitos Não-Funcionais

### Disponibilidade

- **[RNF001]** - O sistema deve estar disponível 24/7/365.  
- **[RNF002]** - O sistema deve realizar backup automático dos dados em intervalos regulares. *(Vinculado a RF015)*  

### Privacidade e Segurança

- **[RNF003]** - O sistema deve armazenar dados em ambiente seguro, com autenticação por perfil.  
- **[RNF004]** - O acesso deve ser feito mediante autenticação (login por e-mail e senha).  

### Usabilidade

- **[RNF005]** - A interface deve ser simples, intuitiva e acessível para usuários com pouca experiência em tecnologia.  

### Suportabilidade

- **[RNF006]** - O sistema deve ser uma aplicação web responsiva (PWA), acessível em dispositivos móveis e desktops.  

### Interoperabilidade

- **[RNF007]** - O sistema deve integrar-se a serviços externos de e-mail e WhatsApp para envio de notificações. *(Vinculado a RF011)*  

### Desempenho

- **[RNF008]** - O tempo de resposta para operações comuns deve ser inferior a 2 segundos.  

### Implementação

- **[RNF009]** - O sistema deve ser desenvolvido como uma aplicação web independente (PWA), sem instalação de software nativo.  

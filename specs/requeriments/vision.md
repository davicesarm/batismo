# Documento de Visão

**Versão:** 1.0  
**Data:** 17/10/2025  
**Descrição:** Versão inicial do documento de visão  
**Autores:** Davi César, Jonas Sarmento, Francisco Viana

---

## 1. Introdução

### 1.1. Propósito
Este documento tem como objetivo definir a visão do **Sistema de Controle de Escala Pastoral para Batismos**.  
Serve como referência para a equipe de desenvolvimento e para as partes interessadas, descrevendo o problema a ser solucionado, o público-alvo, o escopo do projeto e os principais recursos do sistema.

### 1.2. Escopo
O projeto consiste no desenvolvimento de uma **aplicação web responsiva** para automatizar o controle e a visualização da escala de casais responsáveis pelos batismos em uma paróquia.  

O escopo inclui:

- **Gerenciamento de Usuários:** Autenticação e controle de acesso baseado em perfis (Administrador, Secretaria, Casal).  
- **Gestão de Cadastros:** Cadastro de casais da pastoral e celebrações de batismo.  
- **Alocação de Escalas:** Atribuição automática e cíclica dos casais aos batismos, com opção de alteração manual.  
- **Visualização de Agenda:** Exibição da escala em formato de calendário (diário, semanal e mensal) com filtros.  
- **Sistema de Notificações:** Envio de alertas automáticos por e-mail, push e WhatsApp.  
- **Relatórios e Histórico:** Exportação da escala em PDF/Excel e histórico de celebrações passadas.  

O sistema **não contemplará** o controle de outros sacramentos ou eventos paroquiais.

### 1.3. Definições, Acrônimos e Abreviações
- **Sistema:** Sistema de Controle de Escala Pastoral para Batismos.  
- **Aplicação Web Responsiva:** Sistema acessível via navegador e adaptável a diferentes dispositivos.  
- **Casal:** Membros voluntários da pastoral responsáveis pelos batismos.

---

## 2. Posicionamento

### 2.1. Oportunidade de Negócio
A gestão manual das escalas pastorais é demorada, sujeita a falhas humanas e dificulta a comunicação.  
A automação desse processo otimiza o tempo da secretaria, aumenta a transparência e melhora a eficiência organizacional da paróquia.

### 2.2. Declaração do Problema

| Aspecto | Descrição |
|----------|------------|
| **Problema** | Gestão manual e descentralizada das escalas de batismo |
| **Afeta** | Secretaria paroquial e casais da pastoral |
| **Impacto** | Erros de alocação, sobrecarga manual e falta de visão clara da agenda |
| **Solução** | Sistema web centralizado que automatiza a alocação, evita conflitos e envia notificações automáticas |

### 2.3. Declaração de Posição do Produto

**Para:** Secretaria paroquial e casais da pastoral do batismo  
**Que necessitam de:** Um método eficiente e organizado para gerenciar e consultar as escalas  
**O produto é:** Uma aplicação web responsiva que automatiza agendamentos e alocações  
**Diferente de:** Planilhas, agendas e grupos de WhatsApp  
**Nosso produto oferece:** Um processo automatizado, confiável e transparente, reduzindo o trabalho manual e prevenindo erros.

---

## 3. Descrição das Partes Interessadas e dos Usuários

### 3.1. Resumo das Partes Interessadas

| Parte Interessada | Descrição |
|--------------------|-----------|
| **Administrador da Paróquia** | Supervisiona secretaria e pastorais, buscando eficiência e organização. |
| **Secretaria Paroquial** | Usuário principal: cadastra batismos e gerencia casais. |
| **Coordenador da Pastoral** | Organiza os casais e suas alocações. |
| **Casais da Pastoral** | Voluntários que precisam visualizar suas escalas e receber notificações. |

### 3.2. Perfis de Usuário

| Perfil | Descrição | Responsabilidades | Habilidades Técnicas |
|--------|------------|------------------|----------------------|
| **Administrador** | Controle total do sistema | Gerenciar usuários e configurações gerais | Intermediária |
| **Secretaria** | Responsável pelos batismos | Cadastrar, editar e excluir batismos | Básica |
| **Coordenador** | Responsável pelos casais | Alocar casais e alterar ordem | Básica |
| **Casal** | Usuário final | Consultar agenda e receber notificações | Mínima |

### 3.3. Necessidades Principais

| Necessidade | Prioridade | Parte Interessada | Justificativa |
|--------------|-------------|------------------|----------------|
| Automatizar a alocação dos casais | Alta | Secretaria | Reduz trabalho manual e erros |
| Acesso fácil à agenda de batismos | Alta | Casal, Secretaria | Garante clareza e evita faltas |
| Impedir agendamentos conflitantes | Alta | Secretaria | Evita problemas logísticos |
| Receber notificações automáticas | Alta | Casal | Melhora comunicação e lembretes |
| Gerenciar usuários e perfis | Média | Administrador | Segurança e organização |
| Exportar relatórios | Média | Secretaria, Administrador | Prestação de contas e planejamento |

### 3.4. Alternativas e Competição
- **Planilhas:** Organização limitada e sem automação.  
- **Agendas/Murais:** Acesso restrito e de difícil atualização.  
- **Grupos de WhatsApp:** Comunicação desorganizada e descentralizada.  

O sistema se destaca por **integrar automação, notificações e controle centralizado** em uma única plataforma.

---

## 4. Visão Geral do Produto

### 4.1. Perspectiva do Produto
O sistema será uma aplicação web independente, desenvolvida para atender exclusivamente à pastoral do batismo.  
Acessível por navegador e responsiva a qualquer dispositivo conectado à internet.

### 4.2. Premissas e Dependências
**Premissas:**
- Usuários possuem acesso à internet.  
- Casais possuem e-mail e/ou WhatsApp válido.  
- Secretaria mantém dados atualizados.  

**Dependências:**
- Serviços de terceiros para envio de notificações (e-mail, API de WhatsApp).  
- Infraestrutura de hospedagem web.  

---

## 5. Recursos do Produto
- Cadastro, edição e exclusão de usuários (admin, secretaria, casal).  
- Login com e-mail e senha.  
- Cadastro de casais da pastoral.  
- Cadastro de batismos (data, horário, batizandos, celebrante).  
- Impedir agendamento duplicado.  
- Alocação automática e cíclica dos casais.  
- Alteração manual de casais.  
- Visualização de calendário (diário, semanal, mensal).  
- Filtros por casal ou data.  
- Notificações por e-mail, push e WhatsApp.  
- Exportação (PDF/Excel).  
- Histórico de batismos e alocações.  
- Arquivamento automático.  
- Backup automático.

---

## 6. Restrições
- Aplicação web responsiva.  
- Tempo de resposta inferior a 2 segundos.  
- Compatível com Chrome, Firefox e Safari.  
- Armazenamento seguro de dados.  
- Interface simples e intuitiva.  
- Duração de um batismo: **1 hora** (para bloqueio de agenda).

---

## 7. Apêndice 1 – Atributos de Recurso

| Recurso | Benefício | Esforço | Risco | Estabilidade |
|----------|------------|----------|---------|--------------|
| Alocação automática e cíclica | Alto | Médio | Baixo | Alta |
| Notificações automáticas | Alto | Médio | Médio | Média |
| Visualização de calendário | Alto | Médio | Baixo | Alta |
| Validação de conflitos | Alto | Baixo | Baixo | Alta |
| Exportação (PDF/Excel) | Médio | Médio | Baixo | Alta |
| Gestão de usuários | Médio | Baixo | Baixo | Alta |

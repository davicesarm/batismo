# Caso de Uso: Consultar Histórico de Batismos e Alocações

**1. Identificação**
* **Nome:** Consultar Histórico
* **Código:** UC-HIST-01
* **Ator Principal:** Secretaria, Coordenador, Administrador

**2. Descrição**
Permite a consulta de todos os batismos já realizados e quem foram os casais responsáveis, servindo para prestação de contas e auditoria.

**3. Fluxo Principal**
1. O ator acessa a funcionalidade "Histórico".
2. O sistema apresenta filtros de busca: Intervalo de Datas, Nome do Casal ou Celebrante.
3. O ator aplica os filtros e solicita a busca.
4. O sistema recupera os registros do banco de dados (incluindo os batismos arquivados automaticamente).
5. O sistema apresenta a lista detalhada com data, batizandos e casal que realizou o serviço.

**4. Regras de Negócio**
* **RN01:** Registros de histórico são de apenas leitura; não podem ser editados após a data de realização para garantir a integridade dos dados.
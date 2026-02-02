# Caso de Uso: Visualizar Agenda

**1. Identificação**
* **Nome:** Visualizar Agenda
* **Código:** UC-AGE-01
* **Ator Principal:** Usuario

**2. Descrição**
Visualização organizada dos batismos por período (diário, semanal ou mensal), respeitando permissões de acesso.

**3. Fluxo Principal**
1. O ator solicita a visualização da agenda.
2. O sistema solicita a definição do período (ex: mensal).
3. O sistema recupera e apresenta os batismos e casais alocados (se o ator aplicar filtros após visualizar, seguir FA.01).

**4. Fluxos Alternativos**
* FA.01 Filtragem (Extensão): Após visualizar, o ator pode filtrar por casal específico ou data.

**5. Regras de Negócio**
* **RN01:** O perfil "Casal" visualiza apenas informações operacionais de sua escala.
* **RN02:** A interface não permite edição direta nesta tela (somente leitura).

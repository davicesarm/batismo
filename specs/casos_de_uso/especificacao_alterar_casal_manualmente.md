# Caso de Uso: Alterar Casal Manualmente

**1. Identificação**
* **Nome:** Alterar Casal Manualmente
* **Código:** UC-ALOC-01
* **Ator Principal:** Administrador, Secretaria, Coordenador

**2. Descrição**
Permite a alteração manual do casal designado, usada em casos de indisponibilidade ou ajustes operacionais.

**3. Pré-condições**
* Usuário autenticado com perfil gestor.
* Existência de batismo com casal já previamente alocado.

**4. Fluxo Principal**
1. O ator acessa a lista de batismos cadastrados.
2. O ator seleciona o batismo desejado e visualiza o casal atual.
3. O ator opta por Alterar Casal e seleciona um novo casal disponível (se cancelar, seguir FA.02).
4. O sistema valida a disponibilidade do novo casal (se indisponível, seguir FA.01).
5. O sistema atualiza a alocação e registra no histórico.
6. O sistema notifica o novo casal via WhatsApp/E-mail.

**5. Fluxos Alternativos**
* **FA.01 Casal Indisponível:** Se o casal escolhido tiver outro compromisso, o sistema informa e solicita nova escolha.
* **FA.02 Cancelamento:** O ator pode desistir da alteração a qualquer momento sem salvar.

**6. Regras de Negócio**
* **RN01:** Toda alteração manual deve ser logada para auditoria.
* **RN02:** Alterações manuais não resetam a ordem cíclica da escala automática.

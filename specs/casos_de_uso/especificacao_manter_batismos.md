# Caso de Uso: Manter Batismos

**1. Identificação**

* **Nome:** Manter Batismos 
* **Código:** UC-BAT-01 
* **Ator Principal:** Administrador, Secretaria
* **Atores Secundários:** Coordenador 
* **Sistema:** SCEPB - Sistema de Controle de Escala Pastoral para Batismos 

**2. Descrição**
Este caso de uso permite ao ator realizar a gestão completa (cadastrar, atualizar, consultar e excluir) dos batismos no sistema. Durante o cadastro ou alteração, o sistema valida duplicidade de horários e pode disparar a alocação automática de casais seguindo a ordem cíclica.

**3. Pré-condições**

* O usuário deve estar autenticado no sistema.
* O usuário deve possuir perfil de Administrador, Secretaria ou Coordenador - (apenas para alteraçao manual do casal).

**4. Pós-condições**

* Batismo cadastrado, atualizado ou excluído corretamente no sistema.
* Caso aplicável, casal alocado automaticamente conforme a ordem cíclica.
* Informações persistidas e histórico de alterações registrado.

**5. Fluxo Principal**

1. O ator acessa a funcionalidade de "Manter Batismos".
2. O sistema apresenta as opções de **cadastrar, alterar, consultar ou excluir** batismos.
3. O ator seleciona a opção desejada (se selecionar "Excluir", seguir FA.03; se desejar alterar apenas o casal, seguir FA.04).
4. O sistema solicita os dados do batismo (data, horário, local, observações).
5. O ator informa os dados solicitados (se inválidos ou incompletos, seguir FA.01).
6. O sistema valida a duplicidade de batismo para a data e horário informados (se houver conflito, seguir FA.02).
7. O sistema registra ou atualiza o batismo no banco de dados.
8. O sistema confirma a operação ao ator.


**6. Fluxos Alternativos**

* **FA.01 Dados Inválidos ou Incompletos:** Se no passo 5 os dados forem inválidos, o sistema exibe erro e solicita correção .

* **FA.02 Batismo Duplicado:** Se no passo 6 for detectado conflito de horário/local, o sistema informa a duplicidade e permite ajuste ou cancelamento.

* **FA.03 Excluir Batismo:** 1. No passo 3, o ator seleciona a opção "Excluir".
2. O sistema solicita a confirmação da exclusão.
3. O ator confirma.
4. O sistema verifica se há um casal alocado. Se sim, o sistema remove o vínculo e notifica o casal sobre o cancelamento da escala.
5. O sistema remove o registro e confirma o sucesso.

* **FA.04 Alteração Manual de Casal (Integração com UC-ALOC-01):**
1. Durante a alteração (passo 3), se o ator desejar modificar apenas o casal alocado (sem alterar os dados do batismo), o sistema direciona para o **UC-ALOC-01 (Alterar Casal Manualmente)**.

2. O sistema exibe o casal atual e permite a seleção de um novo par disponível, registrando a troca no histórico de auditoria.

**7. Regras de Negócio**

* **RN01:** Não deve existir mais de um batismo para a mesma data, horário e local.

* **RN02:** A alocação automática depende da configuração prévia da escala e segue sempre a ordem cíclica.

* **RN03:** Toda exclusão de batismo com casal alocado deve gerar uma notificação automática de cancelamento para os envolvidos.

* **RN04:** Batismos passados são arquivados automaticamente e não permitem exclusão manual, apenas consulta (Histórico).

* **RN05:** Somente o administrador e a secretaria podem Criar/Excluir batismos.

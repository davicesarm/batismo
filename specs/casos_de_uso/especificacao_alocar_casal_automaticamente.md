# Caso de Uso: Alocar Casal Automaticamente

**1. Identificação**
* **Nome:** Alocar Casal Automaticamente
* **Código:** UC-ALOC-AUTO
* **Ator Principal:** Sistema
* **Atores Secundários:** Casal (Notificado)

**2. Descrição**
Este caso de uso é o núcleo inteligente do SCEPB. Ele seleciona o casal ideal para um batismo recém-criado seguindo a regra de ordem cíclica, garantindo um rodízio justo e sem sobrecarga.

**3. Pré-condições**
* Um novo batismo foi registrado com sucesso (UC-BAT-01).
* A configuração de "Alocação Automática" deve estar ativa no perfil da paróquia.

**4. Fluxo Principal**
1. O sistema recupera a lista de todos os casais com status "Ativo" (se não existirem casais ativos, seguir FA.02).
2. O sistema identifica o índice do último casal alocado na escala cíclica.
3. O sistema calcula o próximo índice (Índice Atual + 1). Se o fim da lista for atingido, retorna ao índice 0 (Início do ciclo).
4. O sistema valida se o casal selecionado está disponível na data/horário do batismo (se houver impedimento, seguir FA.01).
5. O sistema vincula o casal ao registro do batismo.
6. O sistema atualiza o atributo `ultimoBatismo` no perfil do casal.
7. O sistema executa o caso de uso `Enviar Notificação` (UC-NOTIF).

**5. Fluxos Alternativos**
* **FA.01 Casal com Impedimento:** Caso o casal selecionado pelo ciclo já esteja em outro compromisso na mesma data, o sistema pula para o próximo casal da lista e repete o passo 4.
* **FA.02 Sem Casais Ativos:** Caso não existam casais ativos, o sistema marca o batismo com o status "Pendente de Alocação" e notifica a Secretaria.

**6. Regras de Negócio**
* **RN01 (Ordem Cíclica):** A ordem de alocação deve respeitar estritamente a sequência de cadastro ou a última data de serviço, evitando que um casal seja escalado duas vezes seguidas enquanto outros não serviram.
* **RN02 (Persistência):** O ponteiro da escala cíclica deve ser persistido para que o próximo batismo cadastrado continue a contagem corretamente.

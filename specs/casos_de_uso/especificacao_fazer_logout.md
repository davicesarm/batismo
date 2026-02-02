# Caso de Uso: Fazer Logout

**1. Identificação**
* **Nome:** Fazer Logout
* **Código:** UC-LOG-02
* **Ator Principal:** Usuário

**2. Descrição**
Procedimento de encerramento da sessão para garantir que o acesso seja finalizado de forma segura.

**3. Fluxo Principal**
1. O usuário aciona a opção "Sair" no sistema.
2. O sistema encerra a sessão ativa (se a sessão já estiver expirada/inativa, seguir FA.01).
3. O sistema redireciona o usuário para a tela de login.

**4. Fluxos Alternativos**
* **FA.01 Sessão Expirada/Inativa:** O sistema encerra a sessão automaticamente e redireciona para a tela de login com aviso de expiração.

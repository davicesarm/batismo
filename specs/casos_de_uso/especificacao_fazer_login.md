# Caso de Uso: Fazer Login

**1. Identificação**
* **Nome:** Fazer Login
* **Código:** UC-LOG-01
* **Ator Principal:** Usuário

**2. Descrição**
Procedimento de autenticação para garantir que apenas pessoas autorizadas acessem os dados da paróquia.

**3. Fluxo Principal**
1. O usuário acessa a URL do sistema.
2. O sistema apresenta a tela de login solicitando E-mail e Senha.
3. O usuário insere suas credenciais.
4. O sistema valida as credenciais no banco de dados.
5. O sistema identifica o perfil do usuário (Admin, Sec, Coord ou Casal) e redireciona para o Dashboard correspondente.

**4. Fluxos Alternativos**
* **4.1 Credenciais Inválidas:** O sistema informa "Usuário ou senha incorretos" e limpa os campos.
* **4.2 Esqueci minha Senha:** 
* 4.2.1 O usuário solicita recuperação
* 4.2.2 o sistema envia um link de redefinição para o e-mail cadastrado.
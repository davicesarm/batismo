# Caso de Uso: Manter Usuários

**1. Identificação**
* **Nome:** Manter Usuários
* **Código:** UC-USU-01
* **Ator Principal:** Administrador

**2. Descrição**
Permite ao Administrador gerenciar as contas de acesso ao sistema, definindo quem é Secretaria, Coordenador ou Casal.

**3. Fluxo Principal**
1. O Administrador acessa a gestão de usuários.
2. O sistema exibe a lista de usuários cadastrados com seus respectivos perfis (se optar por desativar um casal, seguir FA.01).
3. O Administrador opta por "Adicionar Usuário".
4. O sistema solicita: Nome, E-mail, Senha Provisória e Perfil de Acesso.
5. Se o perfil for "Casal", o sistema solicita campos extras: Nome do Cônjuge 1, Nome do Cônjuge 2 e Telefone de Contato.
6. O sistema valida se o e-mail já existe.
7. O sistema salva o registro.

**4. Fluxos Alternativos**
* **FA.01 Desativação de Casal:** O Administrador pode alterar o status de um casal para "Inativo" (ex: licença ou saída da pastoral). Usuários inativos não entram na Alocação Automática.

**5. Regras de Negócio**
* **RN01:** Somente o Administrador pode visualizar e editar dados de outros Administradores ou Secretarias.
* **RN02:** O sistema deve impedir a exclusão do último Administrador ativo.

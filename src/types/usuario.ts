export type UsuarioType = {
  id: number;
  email: string;
  cargo: string;
  nome: string;
  marido: string;
  mulher: string;
  inativo: boolean;
};

export type Casal = {
  idCasal: number;
  marido: string;
  mulher: string;
  ordem: number;
};

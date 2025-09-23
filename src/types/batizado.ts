export type BatizadoType = {
  id: string;
  data: string;
  celebrante: string;
  casal: {
    marido: string;
    mulher: string;
  };
  catecumenos: Array<{ nome: string }>;
};

export type CadastrarBatizadoType = {
  data: string;
  celebrante: string | null;
  catecumenos: Array<string>;
};

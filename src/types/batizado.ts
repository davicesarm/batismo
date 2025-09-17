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

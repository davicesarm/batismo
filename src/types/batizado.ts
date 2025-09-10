export type BatizadoType = {
  id: string;
  data: string;
  celebrante: string;
  casal: {
    marido: string;
    mulher: string;
  };
  batizandos: Array<{ nome: string }>;
};

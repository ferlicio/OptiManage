export interface ReceitaWSResponse {
  atividade_principal?: AtividadeEntity[] | null;
  data_situacao: string;
  complemento: string;
  tipo: string;
  nome: string;
  uf: string;
  telefone: string;
  email: string;
  qsa?: QsaEntity[] | null;
  situacao: string;
  bairro: string;
  logradouro: string;
  numero: string;
  cep: string;
  municipio: string;
  porte: string;
  abertura: string;
  natureza_juridica: string;
  fantasia: string;
  cnpj: string;
  ultima_atualizacao: string;
  status: string;
  efr: string;
  motivo_situacao: string;
  situacao_especial: string;
  data_situacao_especial: string;
  atividades_secundarias?: AtividadeEntity[] | null;
  capital_social: string;
  extra: Extra;
  billing: Billing;
}
export interface AtividadeEntity {
  text: string;
  code: string;
}
export interface QsaEntity {
  qual: string;
  nome: string;
}
export interface Extra {}
export interface Billing {
  free: boolean;
  database: boolean;
}

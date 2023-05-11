/* export interface ClientePF {
    id?: number;
    cpf: string;
    nome: string;
    telefone: string;
    email?: string;
    profissao?: string;
    dt_nascimento?: string;
  }

export interface ClientePJ {
    id?: number;
    tipo: string;
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    telefone: string;
    site?: string;
    fundacao?: string;
    atividade?: string;
} */

export interface Cliente {
  id?:number, 
  tipo:string, 
  nome: string, 
  cpfj: string, 
  email: string, 
  telefone: string, 
  areaAtuacao: string,
}

export enum eColunaXPropCliente {
  // 'Nome da coluna' = 'nome da propriedade'
  'id' = 'id', 
  'Tipo' = 'tipo',
  'Nome' = 'nome', 
  'CPF/CNPJ/ID Estrangeiro' = 'cpfj', 
  'Email' = 'email', 
  'Telefone' = 'telefone', 
  'Area de atuação' = 'areaAtuacao', 
  'Contato' = 'contato', 
}
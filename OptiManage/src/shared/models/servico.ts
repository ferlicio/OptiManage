export interface Servico {
    id?: number;
    nome: string;
    descricao: string;
    valor: string;
}

export enum eColunaXPropServico {
    // 'Nome da coluna' = 'nome da propriedade'
    'id' = 'id', 
    'Nome' = 'nome', 
    'Descrição' = 'descricao',
    'Valor' = 'valor',
  }
export interface Fornecedor {
    id?: number;
    tipo: string;
    nome: string;
    cnpj: string;
    email: string;
    website: string;
    telefone: string;
    idAtuacao: number;
    idContato?: number; 
    endereco?: {
        rua: string;
        numero: number;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    }
}

export enum eColunaXPropFornecedor {
    'id' = 'id',
    'Nome' = 'nome',
    'CNPJ' = 'cnpj',
    'Tipo' = 'tipo',
    'Email' = 'email',
    'Telefone' = 'telefone',
    'Website' = 'website',
    'Area de atuação' = 'idAtuacao',
}
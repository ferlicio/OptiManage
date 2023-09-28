export interface Fornecedor {
    id?: number;
    tipo: string;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    email: string;
    website: string;
    telefone: string;
    idAreaAtuacao: number;
    idContatos?: number; 
    endereco?: {
        rua: string;
        numero: number;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    }
}
export interface FornecedorToCreate {
    id?: number;
    tipo: string;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    email: string;
    website: string;
    telefone: string;
    idAreaAtuacao: number;
    Contato?: [{
        nome: string;
        email: string;
        telefone: string;
        cargo: string;
    }]; 
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
    'Nome' = 'nomeFantasia',
    'CNPJ' = 'cnpj',
    'Tipo' = 'tipo',
    'Email' = 'email',
    'Telefone' = 'telefone',
    'Website' = 'website',
    'Area de atuação' = 'idAreaAtuacao',
}
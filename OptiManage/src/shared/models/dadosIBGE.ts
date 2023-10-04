export interface estado {
    id: number;
    sigla: string;
    nome: string;
}

export interface municipio {
    id: number;
    nome: string;
    microrregiao: {};
}
export interface CNAE {
    id: number;
    descricao: string;
    observacoes: string;
}

export interface grupoDoCNAE {
    id: number;
    descricao: string;
    observacoes: string;
}
export interface classeDoGrupo {
    id: number;
    descricao: string;
    observacoes: string;
}
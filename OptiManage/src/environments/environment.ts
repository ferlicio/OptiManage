const appName = 'OptiManage';

export const environment = {
  firebase: {
    projectId: 'optimanage-ait',
    appId: '1:931705914588:web:44b96d1eece1158ddf6019',
    storageBucket: 'optimanage-ait.appspot.com',
    apiKey: 'AIzaSyB4fedCHfFkPHkU_-RSN91rzTRRofCnzaQ',
    authDomain: 'optimanage-ait.firebaseapp.com',
    messagingSenderId: '931705914588',
    measurementId: 'G-NH33BC6WCX',
  },
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyB4fedCHfFkPHkU_-RSN91rzTRRofCnzaQ",
        authDomain: "optimanage-ait.firebaseapp.com",
        projectId: "optimanage-ait",
        storageBucket: "optimanage-ait.appspot.com",
        messagingSenderId: "931705914588",
        appId: "1:931705914588:web:44b96d1eece1158ddf6019",
        measurementId: "G-NH33BC6WCX"
    },
    appName: appName,
    pagesTitle: {
        '/': appName +" | "+ 'Página Inicial',

        '/clientes': appName +" | "+ 'Clientes',
        '/clientes/novo': appName +" | "+ 'Novo cliente',
        '/clientes/editar': appName +" | "+ 'Editar cliente',

        '/fornecedores': appName +" | "+ 'Fornecedores',
        '/fornecedores/novo': appName +" | "+ 'Novo Fornecedor',
        '/fornecedores/editar': appName +" | "+ 'Editar Fornecedor',

        '/servicos': appName +" | "+ 'Serviços',
        '/servicos/novo': appName +" | "+ 'Novo Serviço',
        '/servicos/editar': appName +" | "+ 'Editar Serviço',

        '/imposto': appName +" | "+ 'Imposto',
        '/DRE': appName +" | "+ 'DRE',
    } as {[key: string]: string},
    optimanageApi: {
        baseUrl: 'http://localhost:3000',
        endpoints: {
            clientes: '/clientes',
            fornecedores: '/fornecedores',
            servicos: '/servicos',
        }
    },
    otherApis: {
        viacep: {
            baseUrl: 'http://viacep.com.br/ws',
        },
        speedio: {
            baseUrl: 'https://api-publica.speedio.com.br/buscarcnpj',
        },
        IBGE: {
            baseUrl: 'https://servicodados.ibge.gov.br/api/v1/localidades',
        }
    }

}

export const baseEnvironment = environment;

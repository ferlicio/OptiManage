import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteApiService } from 'src/app/core/services/api/cliente/cliente.api.service';
import { FormField, FormFields } from 'src/app/widget/ait-form/ait-form.component';
import { CNAE, classeDoGrupo, estado, grupoDoCNAE } from 'src/shared/models/dadosIBGE';
import { ibgeService } from 'src/shared/services/ibge.service';
import { ValidacoesService } from 'src/shared/services/validacoes.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss'],
})
export class FormClienteComponent implements OnInit{

  constructor(
    private fb: FormBuilder, private router:Router, 
    private _snackBar: MatSnackBar, private clienteApiService: ClienteApiService,
    private route: ActivatedRoute, private ibgeService: ibgeService,
    private validacoesService:ValidacoesService
  ) { }

  fieldsClientePrincipal: FormFields = [
    [
      { name: 'Categorias de Atividade', type: 'select', formControlName: 'categoriaAtividade', fieldWidth: '100%'},
      { name: 'Grupo de Atividade', type: 'select', formControlName: 'grupoDeAtividade', fieldWidth: '100%'},
      { name: 'Sub-Categoria', type: 'select', formControlName: 'subCategoria', fieldWidth: '100%'},
    ],[
      { name: 'Tipo de Pessoa', type: 'select', formControlName: 'tipoPessoa', fieldFlexGrow:1, options: [['Física','F'],['Jurídica','J']]},
      { name: 'Data de Cadastro', type: 'date', formControlName: 'dataCadastro', fieldFlexGrow:1 },
    ],[
    ],
  ]
  fieldsClientePrincipalFisica: FormField[] = [
    { name: 'Nome', type: 'select', formControlName: 'nome', fieldWidth: '100%'},
    { name: 'CPF', type: 'text', formControlName: 'cpf', fieldWidth: '100%',validators: {maskPattern: '000.000.000-00'}},
  ]
  fieldsClientePrincipalJuridica: FormField[] = [
    { name: 'CNPJ', type: 'text', formControlName: 'cnpj', fieldWidth: '100%',validators: {maskPattern: '00.000.000/0000-00'}},
    { name: 'Razão Social', type: 'text', formControlName: 'razaoSocial', fieldFlexGrow: 1, fieldMinWidth: '40%'},
    { name: 'Nome Fantasia', type: 'text', formControlName: 'nomeFantasia', fieldFlexGrow: 1, fieldMinWidth: '40%'},
    { name: 'Inscrição Estadual', type: 'text', formControlName: 'inscricaoEstadual', fieldFlexGrow: 1},
    { name: 'Inscrição Municipal', type: 'text', formControlName: 'inscricaoMunicipal', fieldFlexGrow: 1},
  ]

  fieldsClienteEndereco: FormFields = [
    [
      { name: 'CEP', type: 'text', formControlName: 'cep', fieldWidth: '49%',validators: {maskPattern: '00000-000'}},
    ],[
      { name: 'Estado', type: 'select', formControlName: 'estado', fieldFlexGrow: 1, options:[]},
      { name: 'Cidade', type: 'select', formControlName: 'cidade', fieldFlexGrow: 1, options:[]},
    ],[
      { name: 'Logradouro', type: 'text', formControlName: 'logradouro', fieldWidth: '100%'},
      { name: 'Bairro', type: 'text', formControlName: 'bairro', fieldFlexGrow: 10},
      { name: 'Número', type: 'number', formControlName: 'numero', fieldFlexGrow: 1},
      { name: 'Complemento', type: 'text', formControlName: 'complemento', fieldFlexGrow: 2},
    ]
  ]
  fieldsClienteContato: FormFields = [
    [
      { name: 'Telefone 1', type: 'text', formControlName: 'telefone1', fieldFlexGrow: 1,validators: {maskPattern: '(00) 0000-0000||(00) 00000-0000'}},
      { name: 'Telefone 2', type: 'text', formControlName: 'telefone2', fieldFlexGrow: 1,validators: {maskPattern: '(00) 0000-0000||(00) 00000-0000'}},
    ],
    [
      { name: 'Site', type: 'text', formControlName: 'site', fieldFlexGrow: 3},
      { name: 'E-mail', type: 'text', formControlName: 'email', fieldFlexGrow: 4},
    ]
  ]

  formClienteFisica = this.fb.group({
    nome: [''],
    cpf: ['']
  });
  formClienteJuridica = this.fb.group({
    cnpj: [''],
    razaoSocial: [''],
    nomeFantasia: [''],
    inscricaoEstadual: [''],
    inscricaoMunicipal: ['']
  });

  formCliente = this.fb.group({
    categoriaAtividade: [null,Validators.required],
    grupoDeAtividade: [{value: null, disabled: true},Validators.required],
    subCategoria: [{value: null, disabled: true},Validators.required],
    dataCadastro: [{value:new Date(), disabled: true}],
    tipoPessoa: ['',Validators.required],
    ...this.formClienteFisica.controls,
    ...this.formClienteJuridica.controls,
    //endereço
    cep: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    logradouro: ['',[Validators.required]],
    numero: ['',[Validators.required]],
    complemento: [''],
    bairro: ['',[Validators.required]],
    cidade: ['',[Validators.required]],
    estado: ['',[Validators.required]],
    //contato
    site: [''],
    email: ['',],
    telefone1: ['', [Validators.required]],
    telefone2: [''],
  })

  queryParams: any;
  isEditing: boolean = false;

  ngOnInit(): void {
    this.setValueChanges()
    this.getOptions()
    this.route.url.subscribe(url => {
      if (url[0].path == 'editar') {
        this.formCliente.disable()
        this.route.queryParams.subscribe(params => {
          this.queryParams = params;
        })
      }
    })
  }

  getOptions() {
    //estados
    this.ibgeService.getEstados().subscribe((estados:estado[]) => {
      estados.forEach((estado:estado) => {
        if (this.fieldsClienteEndereco[1]?.[0]) {
          if (!this.fieldsClienteEndereco[1][0].options) {
            this.fieldsClienteEndereco[1][0].options = [];
          }
          this.fieldsClienteEndereco[1][0].options.push([estado.nome,estado.sigla])
        }
      })
    })
    //categorias
    this.ibgeService.getCNAE().subscribe((CNAEs:CNAE[]) => {
      console.log(CNAEs);
      CNAEs.forEach((CNAE:CNAE) => {
        if (this.fieldsClientePrincipal[0]?.[0]) {
          if (!this.fieldsClientePrincipal[0][0].options) {
            this.fieldsClientePrincipal[0][0].options = [];
          }
          this.fieldsClientePrincipal[0][0].options.push([CNAE.descricao,CNAE.id])
          this.fieldsClientePrincipal[0][0].options.sort((a,b) => {
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;
            return 0
          })
        }
      })
    })
  }

  setValueChanges() {
    this.formCliente.controls['categoriaAtividade'].valueChanges.subscribe(CNAE => {
      if (CNAE) this.ibgeService.getGruposPorDivisao(CNAE).subscribe((grupos:grupoDoCNAE[]) => {
        this.formCliente.controls['grupoDeAtividade'].setValue(null);
        this.formCliente.controls['subCategoria'].setValue(null);
        this.formCliente.controls['subCategoria'].disable();
        console.log(grupos);
        if (this.fieldsClientePrincipal[0]?.[1]){
          let todosGrupos:any[] = [];
          if (grupos.length > 1) {
            this.formCliente.controls['grupoDeAtividade'].enable()
            grupos.forEach((grupo:grupoDoCNAE) => {
              todosGrupos.push([grupo.descricao,grupo.id])
            })
          } else {
            this.formCliente.controls['grupoDeAtividade'].disable()
            this.formCliente.controls['subCategoria'].disable()
          }
          this.fieldsClientePrincipal[0][1].options = todosGrupos;
        }
      })               
    })

    this.formCliente.controls['grupoDeAtividade'].valueChanges.subscribe(grupoDoCNAE => {
      if (grupoDoCNAE) this.ibgeService.getClassesPorGrupo(grupoDoCNAE).subscribe((classes:classeDoGrupo[]) => {
        this.formCliente.controls['subCategoria'].setValue(null);
        console.log(classes);
        if (this.fieldsClientePrincipal[0]?.[2]){
          let todasClasses:any[] = [];
          if (classes.length > 1) {
            this.formCliente.controls['subCategoria'].enable()
            classes.forEach((classe:classeDoGrupo) => {
              todasClasses.push([classe.descricao,classe.id])
            })
          } else {
            this.formCliente.controls['subCategoria'].disable()
          }
          this.fieldsClientePrincipal[0][2].options = todasClasses;
        }
      })
    })

    this.formCliente.controls['tipoPessoa'].valueChanges.subscribe(tipoPessoa => {
      if (tipoPessoa == 'F') {
        this.formClienteJuridica.disable();
        this.formClienteFisica.enable();
        this.fieldsClientePrincipal[2] = this.fieldsClientePrincipalFisica;
      } else if (tipoPessoa == 'J') {
        this.formClienteFisica.disable();
        this.formClienteJuridica.enable();
        this.fieldsClientePrincipal[2] = this.fieldsClientePrincipalJuridica;
      }
    })

    this.formCliente.controls['cnpj'].valueChanges.subscribe((cnpj) => {
      if(cnpj){
        if(cnpj.length == 14 && this.validacoesService.validarCNPJ(cnpj)) {
          this.clienteApiService.getCNPJ(cnpj).subscribe((cnpjData) => {
            this.formCliente.patchValue({
              razaoSocial: cnpjData['RAZAO SOCIAL'],
              nomeFantasia: cnpjData['NOME FANTASIA'],
              email: cnpjData['EMAIL'],
              telefone1: cnpjData['TELEFONE'],
            })
            if (this.formCliente.controls['cep'].value == '') {
              this.formCliente.patchValue({
                cep: cnpjData['CEP'],
                numero: cnpjData['NUMERO'].toString(),
              })
            }
          })
        }
        if (!this.validacoesService.validarCNPJ(cnpj)) {
          this.formCliente.controls['cnpj'].setErrors({invalidCNPJ: true})
        }
      }
    })

    this.formCliente.controls['cep'].valueChanges.subscribe((cep) => {
      if(cep!=null && cep.length == 8) {
        this.clienteApiService.getAddressViaCep(cep).subscribe((address) => {
          this.formCliente.patchValue({
            logradouro: address.logradouro,
            bairro: address.bairro,
            estado: address.uf,
            cidade: address.localidade,
          })
        })
      }
    })

    this.formCliente.controls['estado'].valueChanges.subscribe((estado) => {
      if (estado) this.ibgeService.getMunicipiosPorUF(estado).subscribe((cidades) => {
        if (this.fieldsClienteEndereco[1]?.[1]){
          let todasCidades:any[] = [];
          cidades.forEach((cidade:any) => {
            todasCidades.push([cidade.nome,cidade.nome])
          })
          this.fieldsClienteEndereco[1][1].options = todasCidades;
        }
      })
    })
  }
  salvarCliente() {
    console.log(this.formCliente.value);
    this._snackBar.open("Cliente "+ (this.isEditing?"editado":"salvo") +" com sucesso", "fechar", {duration: 5000, panelClass: ['snackbar-success'], horizontalPosition: 'end'});
    this.router.navigate(['/clientes']);
  }
  editarCliente() {
    this.isEditing = true;
    this.formCliente.enable();
    this.formCliente.controls['cnpj'].disable();
    this.formCliente.controls['cpf'].disable();
    this.formCliente.controls['razaoSocial'].disable();
    this.formCliente.controls['dataCadastro'].disable();
    this.formCliente.controls['categoriaAtividade'].disable();
    this.formCliente.controls['grupoDeAtividade'].disable();
    this.formCliente.controls['subCategoria'].disable();
    this.formCliente.controls['tipoPessoa'].disable();
  }
}

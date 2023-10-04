import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFields } from 'src/app/widget/ait-form/ait-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FornecedorApiService } from 'src/app/core/services/api/fornecedor/fornecedor.api.service';
import { ibgeService } from 'src/shared/services/ibge.service';
import { estado } from 'src/shared/models/dadosIBGE';
import { ValidacoesService } from 'src/shared/services/validacoes.service';

@Component({
  selector: 'app-form-fornecedor',
  templateUrl: './form-fornecedor.component.html',
  styleUrls: ['./form-fornecedor.component.scss']
})
export class FormFornecedorComponent implements OnInit {

  fieldsFornecedorPrincipal: FormFields = [
    [
      { name: 'CNPJ', type: 'text', formControlName: 'cnpj', fieldWidth: '100%',validators: {maskPattern: '00.000.000/0000-00'}},
      { name: 'Razão Social', type: 'text', formControlName: 'razaoSocial', fieldFlexGrow: 1},
      { name: 'Nome Fantasia', type: 'text', formControlName: 'nomeFantasia', fieldFlexGrow: 1},
    ],[
      { name: 'Site', type: 'text', formControlName: 'site', fieldFlexGrow: 3},
      { name: 'Área de Atuação', type: 'text', formControlName: 'areaAtuação', fieldFlexGrow: 1},
    ],
  ]
  fieldsFornecedorEndereco: FormFields = [
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
  fieldsFornecedorContato: FormFields = [
    [
      { name: 'Telefone 1', type: 'text', formControlName: 'telefone1', fieldFlexGrow: 1,validators: {maskPattern: '(00) 0000-0000||(00) 00000-0000'}},
      { name: 'Telefone 2', type: 'text', formControlName: 'telefone2', fieldFlexGrow: 1,validators: {maskPattern: '(00) 0000-0000||(00) 00000-0000'}},
    ],
    [
      { name: 'E-mail', type: 'text', formControlName: 'email', fieldFlexGrow: 4},
      { name: 'Prazo de Entrega', type: 'text', formControlName: 'prazoEntrega', fieldFlexGrow: 1},
    ]
  ]

  formFornecedor: FormGroup = this.fb.group({
    //principal
    razaoSocial: ['',[Validators.required]],
    nomeFantasia: ['',[Validators.required]],
    cnpj: ['',[Validators.required]],
    areaAtuação: ['',[Validators.required]],
    email: ['',[Validators.required]],
    site: [''],
    //endereço
    cep: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    logradouro: ['',[Validators.required]],
    numero: ['',[Validators.required]],
    complemento: [''],
    bairro: ['',[Validators.required]],
    cidade: ['',[Validators.required]],
    estado: ['',[Validators.required]],
    //contato
    telefone1: ['',[Validators.required]],
    telefone2: ['',[Validators.required]],
    //condições
    prazoEntrega: ['',[Validators.required]],
    termosECondicoes: [''],
  })

  queryParams: any;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private router:Router, 
    private _snackBar: MatSnackBar, private fornecedorApiService:FornecedorApiService, 
    private route: ActivatedRoute, private ibgeService:ibgeService,
    private changeDetector: ChangeDetectorRef, private validacoesService:ValidacoesService) { }

  ngOnInit(): void {
    this.setValueChanges()
    this.getEstados()
    this.route.url.subscribe(url => {
      if (url[0].path == 'editar') {
        this.formFornecedor.disable()
        this.route.queryParams.subscribe(params => {
          this.queryParams = params;
        })
      }
    })
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  getEstados() {
    this.ibgeService.getEstados().subscribe((estados:estado[]) => {
      estados.forEach((estado:estado) => {
        if (this.fieldsFornecedorEndereco[1]?.[0]) {
          if (!this.fieldsFornecedorEndereco[1][0].options) {
            this.fieldsFornecedorEndereco[1][0].options = [];
          }
          this.fieldsFornecedorEndereco[1][0].options.push([estado.nome,estado.sigla])
        }
      })
      })
  }

  setValueChanges() {
    this.formFornecedor.controls['cnpj'].valueChanges.subscribe((cnpj) => {
      if(cnpj.length == 14 && this.validacoesService.validarCNPJ(cnpj)) {
        this.fornecedorApiService.getCNPJ(cnpj).subscribe((cnpjData) => {
          this.formFornecedor.patchValue({
            razaoSocial: cnpjData['RAZAO SOCIAL'],
            nomeFantasia: cnpjData['NOME FANTASIA'],
            email: cnpjData['EMAIL'],
            telefone1: cnpjData['TELEFONE'],
          })
          if (this.formFornecedor.controls['cep'].value == '') {
            this.formFornecedor.patchValue({
              cep: cnpjData['CEP'],
              numero: cnpjData['NUMERO'],
            })
          }
        })
      }
      if (!this.validacoesService.validarCNPJ(cnpj)) {
        this.formFornecedor.controls['cnpj'].setErrors({invalidCNPJ: true})
      }
    })

    this.formFornecedor.controls['cep'].valueChanges.subscribe((cep) => {
      if(cep.length == 8) {
        this.fornecedorApiService.getAddressViaCep(cep).subscribe((address) => {
          this.formFornecedor.patchValue({
            logradouro: address.logradouro,
            bairro: address.bairro,
            estado: address.uf,
            cidade: address.localidade,
          })
        })
      }
    })

    this.formFornecedor.controls['estado'].valueChanges.subscribe((estado) => {
      if (estado) this.ibgeService.getMunicipiosPorUF(estado).subscribe((cidades) => {
        if (this.fieldsFornecedorEndereco[1]?.[1]){
          let todasCidades:any[] = [];
          cidades.forEach((cidade:any) => {
            todasCidades.push([cidade.nome,cidade.nome])
          })
          this.fieldsFornecedorEndereco[1][1].options = todasCidades;
        }
      })
    })
  }

  salvarFornecedor() {
    console.log(this.formFornecedor.value);
    this._snackBar.open("Fornecedor "+ (this.isEditing?"editado":"salvo") +" com sucesso", "fechar", {duration: 5000, panelClass: ['snackbar-success'], horizontalPosition: 'end'});
    this.router.navigate(['/fornecedores']);
  }
  editarFornecedor() {
    this.isEditing = true;
    this.formFornecedor.enable();
    this.formFornecedor.controls['cnpj'].disable();
    this.formFornecedor.controls['razaoSocial'].disable();
  }
  

}

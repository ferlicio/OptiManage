import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFields } from 'src/app/widget/ait-form/ait-form.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { FornecedorApiService } from 'src/app/core/services/api/fornecedor/fornecedor.api.service';
import { ibgeService } from 'src/shared/services/ibge.service';
import { estado, municipio } from 'src/shared/models/dadosIBGE';

@Component({
  selector: 'app-form-fornecedor',
  templateUrl: './form-fornecedor.component.html',
  styleUrls: ['./form-fornecedor.component.scss']
})
export class FormFornecedorComponent implements OnInit {

  fieldsCadastroFornecedorPrincipal: FormFields = [
    [
      { name: 'CNPJ', type: 'text', formControlName: 'cnpj', fieldWidth: '100%',validators: {maskPattern: '00.000.000/0000-00'}},
      { name: 'Razão Social', type: 'text', formControlName: 'razaoSocial', fieldFlexGrow: 1},
      { name: 'Nome Fantasia', type: 'text', formControlName: 'nomeFantasia', fieldFlexGrow: 1},
    ],[
      { name: 'Site', type: 'text', formControlName: 'site', fieldFlexGrow: 3},
      { name: 'Área de Atuação', type: 'text', formControlName: 'areaAtuação', fieldFlexGrow: 1},
    ],
  ]
  fieldsCadastroFornecedorEndereco: FormFields = [
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
  fieldsCadastroFornecedorContato: FormFields = [
    [
      { name: 'Telefone 1', type: 'text', formControlName: 'telefone1', fieldFlexGrow: 1,validators: {maskPattern: '(00) 00000-0000'}},
      { name: 'Telefone 2', type: 'text', formControlName: 'telefone2', fieldFlexGrow: 1,validators: {maskPattern: '(00) 00000-0000'}},
    ],
    [
      { name: 'E-mail', type: 'text', formControlName: 'email', fieldFlexGrow: 4},
      { name: 'Prazo de Entrega', type: 'text', formControlName: 'prazoEntrega', fieldFlexGrow: 1},
    ]
  ]

  formCadastroFornecedor: FormGroup = this.fb.group({
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
    prazoEntrega: ['',[Validators.required]],
    termosECondicoes: [''],
  })

  queryParams: any;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private router:Router, 
    private _snackBar: MatSnackBar, private fornecedorApiService:FornecedorApiService, 
    private route: ActivatedRoute, private ibgeService:ibgeService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setValueChanges()
    this.getEstados()
    this.route.url.subscribe(url => {
      if (url[0].path == 'editar') {
        this.formCadastroFornecedor.disable()
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
        if (this.fieldsCadastroFornecedorEndereco[1]?.[0]) {
          if (!this.fieldsCadastroFornecedorEndereco[1][0].options) {
            this.fieldsCadastroFornecedorEndereco[1][0].options = [];
          }
          this.fieldsCadastroFornecedorEndereco[1][0].options.push([estado.nome,estado.sigla])
        }
      })
      })
  }

  setValueChanges() {
    this.formCadastroFornecedor.controls['cnpj'].valueChanges.subscribe((cnpj) => {
      if(cnpj.length == 14 && this.validarCNPJ(cnpj)) {
        this.fornecedorApiService.getCNPJ(cnpj).subscribe((cnpjData) => {
          this.formCadastroFornecedor.patchValue({
            razaoSocial: cnpjData['RAZAO SOCIAL'],
            nomeFantasia: cnpjData['NOME FANTASIA'],
            email: cnpjData['EMAIL'],
            telefone1: cnpjData['TELEFONE'],
          })
          if (this.formCadastroFornecedor.controls['cep'].value == '') {
            this.formCadastroFornecedor.patchValue({
              cep: cnpjData['CEP'],
              numero: cnpjData['NUMERO'],
            })
          }
        })
      }
      if (!this.validarCNPJ(cnpj)) {
        this.formCadastroFornecedor.controls['cnpj'].setErrors({invalidCNPJ: true})
      }
    })

    this.formCadastroFornecedor.controls['cep'].valueChanges.subscribe((cep) => {
      if(cep.length == 8) {
        this.fornecedorApiService.getAddressViaCep(cep).subscribe((address) => {
          this.formCadastroFornecedor.patchValue({
            logradouro: address.logradouro,
            bairro: address.bairro,
            estado: address.uf,
            cidade: address.localidade,
          })
        })
      }
    })

    this.formCadastroFornecedor.controls['estado'].valueChanges.subscribe((estado) => {
      this.ibgeService.getMunicipiosPorUF(estado).subscribe((cidades) => {
        if (this.fieldsCadastroFornecedorEndereco[1]?.[1])
        this.fieldsCadastroFornecedorEndereco[1][1].options = [];

        cidades.forEach((cidade:any) => {
        if (this.fieldsCadastroFornecedorEndereco[1]?.[1]) {
          if (!this.fieldsCadastroFornecedorEndereco[1][1].options) {
            this.fieldsCadastroFornecedorEndereco[1][1].options = [];
          }
            this.fieldsCadastroFornecedorEndereco[1][1].options.push([cidade.nome,cidade.nome])
          }
        })
      })
    })
  }

  validarCNPJ(cnpj:string) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(0)))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(1)))
          return false;
           
    return true;
    
}

  salvarFornecedor() {
    console.log(this.formCadastroFornecedor.value);
    this._snackBar.open("Fornecedor "+ (this.isEditing?"editado":"salvo") +" com sucesso", "fechar", {duration: 5000, panelClass: ['snackbar-success'], horizontalPosition: 'end'});
    this.router.navigate(['/fornecedores']);
  }
  editarFornecedor() {
    this.isEditing = true;
    this.formCadastroFornecedor.enable();
    this.formCadastroFornecedor.controls['cnpj'].disable();
    this.formCadastroFornecedor.controls['razaoSocial'].disable();
  }
  

}

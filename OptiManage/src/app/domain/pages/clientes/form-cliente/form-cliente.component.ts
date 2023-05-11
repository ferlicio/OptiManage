import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoriaAtividade, RamoAtividade, SubCategoriasServico } from 'src/shared/models/areaAtuacao';
import { CepService } from 'src/shared/services/cep.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss'],
})
export class FormClienteComponent implements OnInit{

  categoriasAtividade = CategoriaAtividade;
  ramoAtividades: string[] = [];
  subCategorias: string[] = [];

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
  ) { }

  formCliente = this.fb.group({
    categoriaAtividade: [''],
    ramoAtividade: [''],
    subCategoria: [''],
    razaoSocial: [''],
    nome: [''],
    cpfj: [''],
    inscricaoEstadual: [''],
    inscricaoMunicipal: [''],
    site: [''],
    telefone: [''],
    email: [''],
    cep: [''],
    cidade: [''],
    estado: [''],
    endereco: [''],
    numero: [''],
    complemento: [''],
    bairro: [''],
  })

  ngOnInit(): void {
    this.setValueChanges()
    
  }

  setValueChanges() {
    this.formCliente.controls['categoriaAtividade'].valueChanges.subscribe(value => {
      return this.ramoAtividades = RamoAtividade[value as keyof typeof RamoAtividade]|| []                 
    })

    this.formCliente.controls['ramoAtividade'].valueChanges.subscribe(value => {
      return this.subCategorias = SubCategoriasServico[value as keyof typeof SubCategoriasServico] || []      
    })

    this.formCliente.controls['cep'].valueChanges.subscribe(value => {
      if(value && value.length == 8) {
        this.cepService.getEnderecoByCEP(value).subscribe(endereco => {
          this.formCliente.patchValue({
            cidade: endereco.localidade,
            estado: endereco.uf,
            endereco: endereco.logradouro,
            bairro: endereco.bairro,
          })
        })
      }
    })
  }
}

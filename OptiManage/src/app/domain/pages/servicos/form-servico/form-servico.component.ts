import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFields } from 'src/app/widget/ait-form/ait-form.component';

@Component({
  selector: 'app-form-servico',
  templateUrl: './form-servico.component.html',
  styleUrls: ['./form-servico.component.scss']
})
export class FormServicoComponent {

  fieldsCadastroServico: FormFields = [
    [
      { name: 'Nome do serviço', type: 'text', formControlName: 'nomeServico', fieldWidth: '100%'},
      { name: 'Descrição do serviço', type: 'longText', formControlName: 'descricaoServico', fieldWidth: '100%'},
    ],
    [
      { name: 'Preço de custo', type: 'number', formControlName: 'costPrice', fieldFlexGrow:1},
      { name: 'Preço final', type: 'number', formControlName: 'finalPrice', fieldFlexGrow:1},
    ],
    [
      { name: 'Prazo de Entrega', type: 'text', formControlName: 'prazoEntrega', fieldFlexGrow:6},
      { name: 'Terceirizado?', type: 'select', formControlName: 'terceirizado', options:[['sim',true],['não',false]], fieldFlexGrow:1},
    ],
    [
      { name: 'Termos e condições', type: 'longText', formControlName: 'termosECondicoes', fieldWidth: '100%'},
    ],
  ]

  formCadastroServico: FormGroup = this.fb.group({
    nomeServico: ['',[Validators.required]],
    descricaoServico: [''],
    costPrice: [''],
    finalPrice: [''],
    prazoEntrega: [''],
    terceirizado: [''],
    userPassword: [''],
    termosECondicoes: [''],
  })

  constructor(private fb: FormBuilder) { }

}

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
      { name: 'Nome do serviço', type: 'text', formControlName: 'email', fieldWidth: '100%'},
      { name: 'Descrição do serviço', type: 'text', formControlName: 'email', fieldWidth: '100%'},
      { name: 'Preço', type: 'text', formControlName: 'userpassword', fieldWidth: '100%'},
      { name: 'Prazo de Entrega', type: 'text', formControlName: 'userpassword', fieldWidth: '100%'},
      { name: 'senha', type: 'text', formControlName: 'userpassword', fieldWidth: '100%'},
      { name: 'senha', type: 'text', formControlName: 'userpassword', fieldWidth: '100%'},
      { name: 'senha', type: 'text', formControlName: 'userpassword', fieldWidth: '100%'},
      { name: 'senha', type: 'text', formControlName: 'userpassword', fieldWidth: '100%'},
      { name: 'senha', type: 'text', formControlName: 'userpassword', fieldWidth: '100%'},
    ],
  ]

  formCadastroServico: FormGroup = this.fb.group({
    name: ['',[Validators.required]],
    surname: [''],
    email: [''],
    userpassword: [''],
    concorda: [''],
    cidade: [null],
  })

  constructor(private fb: FormBuilder) { }

}

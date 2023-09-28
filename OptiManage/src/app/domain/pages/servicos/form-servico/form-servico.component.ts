import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFields } from 'src/app/widget/ait-form/ait-form.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-servico',
  templateUrl: './form-servico.component.html',
  styleUrls: ['./form-servico.component.scss']
})
export class FormServicoComponent implements OnInit {

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
    costPrice: ['',[Validators.required]],
    finalPrice: ['',[Validators.required]],
    prazoEntrega: ['',[Validators.required]],
    terceirizado: ['',[Validators.required]],
    termosECondicoes: [''],
  })
  queryParams: any;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private router:Router, private _snackBar: MatSnackBar, private route: ActivatedRoute) { }


  salvarServico() {
    console.log(this.formCadastroServico.value);
    this._snackBar.open("Serviço "+ (this.isEditing?"editado":"salvo") +" com sucesso", "fechar", {duration: 5000, panelClass: ['snackbar-success'], horizontalPosition: 'end'});
    this.router.navigate(['/servicos']);
  }
  editarServico() {
    this.isEditing = true;
    this.formCadastroServico.enable();
  }
  
  ngOnInit(): void {
    this.route.url.subscribe(url => {
      if (url[0].path == 'editar') {
        this.formCadastroServico.disable()
        this.route.queryParams.subscribe(params => {
          this.queryParams = params;
        })
      }
    })

  }
}

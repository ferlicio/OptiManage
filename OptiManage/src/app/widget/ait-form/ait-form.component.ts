import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export interface FormField {
  name?: string;                     // nome do campo
  type: FieldType;                   // tipo do campo
  formControlName: string;           // nome do formControlName
  fieldPlaceholder?: string;         // texto do placeholder
  fieldFlexGrow?: number;            // flex-grow do campo
  fieldMinWidth?: string;            // largura mínima do campo
  fieldWidth?: string;               // largura do campo
  options?: [string, any][];         // opções para campos do tipo 'select'
}
type FieldType = "text" | "longText" | "number" | "select" | "date" | "radio" | "checkbox";
export type FormFields = (FormField|undefined)[][];


@Component({
  selector: 'ait-form',
  templateUrl: './ait-form.component.html',
  styleUrls: ['./ait-form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class AitFormComponent implements OnInit {

  @Input() columnGap: number = 20;
  @Input() formFields: FormFields = [];
  @Input() formgroup: FormGroup = this.fb.group({});
  @Input() formgroupExample: FormGroup = this.fb.group({
    name: ['',[Validators.required]],
    surname: [''],
    email: [''],
    userpassword: [''],
    concorda: [''],
    cidade: [null],
  });
  passwordHide = true;

  formFieldsExample: FormFields = [
    [
      { name: 'nome', type: 'text', formControlName: 'name', fieldFlexGrow: 2, fieldMinWidth: '200px'},
      { name: 'sobrenome', type: 'text', formControlName: 'surname', fieldFlexGrow: 1},
    ],
    [
      { name: 'email', type: 'text', formControlName: 'email', fieldWidth: '100%'},
      { name: 'senha', type: 'date', formControlName: 'userpassword', fieldWidth: '100%'},
    ],
    [
      { name: 'concordo com as regras', type: 'checkbox', formControlName: 'concorda', fieldWidth: '40%'},
    ],
    [
      {
        name: 'cidade',
        type: 'select',
        formControlName: 'cidade',
        fieldWidth: '500px',
        options: [
          ['são paulo', 'sao paulo'], 
          ['outras', ''],
          ['outras', ''],
        ]
      },
    ],
    [
      {
        name: 'cidade',
        type: 'radio',
        formControlName: 'cidade',
        fieldWidth: '100%',
        options: [
          ['são paulo', 'sao paulo'], 
          ['outras', ''],
          ['outras', ''],
        ]
      },
    ],
  ]

  constructor(private fb: FormBuilder,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) { }

  hasRequiredValidator(formControlName: string): boolean {
    return this.formgroup.controls[formControlName].hasValidator(Validators.required);
  }

  ngOnInit(): void {
  }
}

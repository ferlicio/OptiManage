import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ElementActionDialogComponent } from 'src/app/widget/ait-table/element-action-dialog/element-action-dialog.component';
import { Fornecedor, eColunaXPropFornecedor } from 'src/shared/models/fornecedor';
import { ScreenSizeService } from 'src/shared/services/screen-size.service';

@Component({
  selector: 'app-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.scss']
})
export class ListarFornecedoresComponent {

  screenSize!: string;
  fornecedores: Fornecedor[] = [
    {id:1, tipo:'agencia', nome: 'Arriba', cnpj: '123.456.789-00', email: 'teste', website: '', telefone:'', idAtuacao: 0},
    {id:1, tipo:'agencia', nome: 'Toshiba', cnpj: '123.456.789-00', email: '', website: '', telefone:'', idAtuacao: 0},
    {id:1, tipo:'agencia', nome: 'Toboe', cnpj: '123.456.789-00', email: '', website: '', telefone:'', idAtuacao: 0},
    {id:1, tipo:'agencia', nome: 'Andale', cnpj: '123.456.789-00', email: '', website: '', telefone:'', idAtuacao: 0},
    {id:1, tipo:'agencia', nome: 'Xiaomi', cnpj: '123.456.789-00', email: '', website: '', telefone:'', idAtuacao: 0},
    {id:1, tipo:'agencia', nome: 'Lenovo', cnpj: '123.456.789-00', email: '', website: '', telefone:'', idAtuacao: 0},
    {id:1, tipo:'agencia', nome: 'Redragon', cnpj: '123.456.789-00', email: '', website: '', telefone:'', idAtuacao: 0},
    {id:1, tipo:'agencia', nome: 'Trident', cnpj: '123.456.789-00', email: '', website: '', telefone:'', idAtuacao: 0},
    {id:1, tipo:'agencia', nome: 'Ibis', cnpj: '123.456.789-00', email: '', website: '', telefone:'', idAtuacao: 0},
  ]
  colunasVisiveis: string[] = ['Nome', 'CNPJ', 'Email', 'Website', 'Telefone', 'Area de atuação'];
  todasColunas: string[] = [...this.colunasVisiveis, 'Tipo', 'Contato'];
  colunaXPropriedade = eColunaXPropFornecedor; 

  filtroEPesquisa: FormGroup = this.fb.group({
    filtro: [''],
    pesquisa: ['']
  })
  
  constructor(private screenSizeService: ScreenSizeService, private fb: FormBuilder, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {   
    this.screenSizeService.screenSize().subscribe(size => {
      this.screenSize = size;
    }); 
  }

  editEl(id: number) {
    this.router.navigate(['/fornecedores/editar'],
    {queryParams: {id: id}})
  }

  deleteEl(id: number) {
    const dialogRef = this.dialog.open(ElementActionDialogComponent, {
      data: {id: id, title: 'Excluir Fornecedor', message: 'Você deseja mesmo excluir o fornecedor selecionado?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { console.log(`Fornecedor a ser deletado: ${result}`);}
    })
  }
}

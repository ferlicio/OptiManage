import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ElementActionDialogComponent } from 'src/app/widget/ait-table/element-action-dialog/element-action-dialog.component';
import { Servico, eColunaXPropServico } from 'src/shared/models/servico';
import { ScreenSizeService } from 'src/shared/services/screen-size.service';

@Component({
  selector: 'app-listar-servicos',
  templateUrl: './listar-servicos.component.html',
  styleUrls: ['./listar-servicos.component.scss']
})
export class ListarServicosComponent {

  screenSize!: string;
  clientes: Servico[] = [
    {id:1, nome: 'Desenho Artistico', descricao:'', valor:'100,00'},
  ]
  colunasVisiveis: string[] = ['Nome', 'Descrição', 'Valor'];
  colunaXPropriedade = eColunaXPropServico 

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
    this.router.navigate(['/servicos/editar'],
    {queryParams: {id: id}})
  }

  deleteEl(id: number) {
    const dialogRef = this.dialog.open(ElementActionDialogComponent, {
      data: {id: id, title: 'Excluir serviço', message: 'Você deseja mesmo excluir o serviço selecionado?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { console.log(`Serviço a ser deletado: ${result}`);}
    })
  }
}

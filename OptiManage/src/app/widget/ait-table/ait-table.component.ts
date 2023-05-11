import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ElementActionDialogComponent } from './element-action-dialog/element-action-dialog.component';

type emptyObject = { [key: string]: any};

@Component({
  selector: 'ait-table',
  templateUrl: './ait-table.component.html',
  styleUrls: ['./ait-table.component.scss']
})
export class AitTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() editFunction = new EventEmitter<number>();
  @Output() deleteFunction = new EventEmitter<number>();
  @Input() tableSource: emptyObject[] = [];
  @Input() tableColumns: string[] = [];
  @Input() tableVisibleColumns: string[] = [];
  @Input() ColumnXPropertyEnum = {};
  @Input() elementName!: string;
  @Input() hasEdit: boolean = false;
  @Input() hasDelete: boolean = false;
  @Input() hasPaginator: boolean = true;
  @Input() canChangeColumns: boolean = true;
  @Input() filterAndSearch: Observable<{}> = new Observable<{}>();
  @Input() defaultValue: string = '--';
  @Input() paginatorInterval: number = 5;
  tableData!:MatTableDataSource<emptyObject>
  TranslatedColumns!: string[]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formatData();
    this.initializingVariables();
    this.subscribeFilterAndSearch();
  }

  formatData() {
    this.tableSource.map(element => { //formatando os dados
      Object.entries(element).forEach(([key, value]) => {
        if (value === null||value === '') {
          element[key] = this.defaultValue;
        }
        if(key === 'nome') {
          element[key] = value[0]?.toUpperCase() + value.slice(1);
        }
        if(key === 'valor'||key === 'preco') {
          element[key] = 'R$ '+value
        }
      })
    })
  }

  initializingVariables() {
    if (this.tableColumns.length === 0) {this.tableColumns = this.tableVisibleColumns.slice()}
    this.tableData = new MatTableDataSource<emptyObject>(this.tableSource);
    this.TranslatedColumns = this.tableVisibleColumns.map(coluna => {
      return this.ColumnXPropertyEnum[coluna as keyof typeof this.ColumnXPropertyEnum]
    })
    if (this.hasEdit||this.hasDelete) {
      this.tableColumns.push('Ações')
      this.tableVisibleColumns.push('Ações')
    }
  }

  subscribeFilterAndSearch() {
    this.filterAndSearch.subscribe(value => {
      console.log('pesquisa: ', value);
      let filterAndSearch: string[] = Object.values(value);
      filterAndSearch[0] = this.ColumnXPropertyEnum[filterAndSearch[0] as keyof typeof this.ColumnXPropertyEnum]//traduzir o nome da coluna
      this.tableData.data = this.tableSource.filter(element => { //filtrar e atribuir a tableData
        const searchTerm = filterAndSearch[1].toLowerCase().normalize('NFD'); //formatando o termo de pesquisa
        let result = false;
        Object.entries(element).forEach(([key1, value1]) => {
          if(filterAndSearch[0]!=undefined? key1 === filterAndSearch[0]: true) { //se o filtro for vazio, retorna todos os elementos
            if (this.TranslatedColumns.includes(key1)) { //se a coluna estiver visível
              if (value1.toString().normalize('NFD').toLowerCase().replace(/[./-]/g, '').includes(searchTerm)) {
                result = true;
              }
            }
          }
        });
        return result;
      });
      console.log('tableData: ', this.tableData.data);
    }) 
  }

  changeColumns(coluna:string) {
    if(this.tableVisibleColumns.includes(coluna)) {
      if (this.tableVisibleColumns.length === 2) {
        const dialogRef = this.dialog.open(ElementActionDialogComponent, {
          data: {title: 'Alteração de colunas visiveis', message: 'A tabela deve ter pelo menos uma coluna visível!'}
        });
        return
      }
      this.tableVisibleColumns = this.tableVisibleColumns.filter(element => element!=coluna)
    } else {
      this.tableVisibleColumns.push(coluna)
      this.tableVisibleColumns = this.tableColumns.filter(element => this.tableVisibleColumns.includes(element))
    }
    this.TranslatedColumns = this.tableVisibleColumns.map(coluna => {
      return this.ColumnXPropertyEnum[coluna as keyof typeof this.ColumnXPropertyEnum]
    })
  }

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  confirmDelete(id: number) {
    const dialogRef = this.dialog.open(ElementActionDialogComponent, {
      data: {type: 'boolean', title: `Excluir ${this.elementName||'elemento'}`, message: `Você deseja mesmo excluir o ${this.elementName||'elemento'} selecionado?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.deleteFunction.emit(id);}
    })
  }

}

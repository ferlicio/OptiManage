import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente, eColunaXPropCliente } from 'src/shared/models/cliente';
import { ScreenSizeService } from 'src/shared/services/screen-size.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class ListarClientesComponent implements OnInit {

  screenSize!: string;
  clientes: Cliente[] = [
    {id:1, tipo:'agencia', nome: 'Arriba', cpfj: '123.456.789-00', email: 'teste', telefone: '', areaAtuacao: ''},
    {id:2, tipo:'agencia', nome: 'João', cpfj: '123.456.789-00', email: '', telefone: '', areaAtuacao: ''},
    {id:3, tipo:'agencia', nome: 'pedro', cpfj: '123.456.789-00', email: '', telefone: '', areaAtuacao: ''},
    {id:4, tipo:'agencia', nome: 'kevin', cpfj: '123.456.789-00', email: '', telefone: '', areaAtuacao: ''},
    {id:5, tipo:'agencia', nome: 'teseu', cpfj: '123.456.789-00', email: '', telefone: '', areaAtuacao: ''},
    {id:6, tipo:'agencia', nome: 'william', cpfj: '123.456.789-00', email: '', telefone: '', areaAtuacao: ''},
    {id:7, tipo:'agencia', nome: 'breno', cpfj: '123.456.789-00', email: '', telefone: '', areaAtuacao: ''},
    {id:8, tipo:'agencia', nome: 'victor', cpfj: '123.456.789-00', email: '', telefone: '', areaAtuacao: ''},
    {id:9, tipo:'agencia', nome: 'lenon', cpfj: '123.456.789-00', email: '', telefone: '', areaAtuacao: ''},
  ]
  todasColunas: string[] = ['Nome', 'CPF/CNPJ/ID Estrangeiro', 'Email', 'Telefone', 'Area de atuação'];
  colunasVisiveis: string[] = ['Nome', 'CPF/CNPJ/ID Estrangeiro', 'Email', 'Telefone', 'Area de atuação'];
  colunaXPropriedade = eColunaXPropCliente 

  filtroEPesquisa: FormGroup = this.fb.group({
    filtro: [''],
    pesquisa: ['']
  })
  
  constructor(private screenSizeService: ScreenSizeService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {   
    this.screenSizeService.screenSize().subscribe(size => {
      this.screenSize = size;
    }); 
  }

  editEl(id: number) {
    this.router.navigate(['/clientes/editar'],
    {queryParams: {id: id}})
  }

  deleteEl(id: number) {
    
  }
}

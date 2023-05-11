import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from '../models/cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly baseUrl: string = 'http://viacep.com.br/ws'

  constructor(
    private http: HttpClient,
  ) { }

  getEnderecoByCEP(cep: string): Observable<Cep> {
    return this.http.get<Cep>(`${this.baseUrl}/${cep}/json/`);
  }
}

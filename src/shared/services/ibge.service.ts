import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { estado, municipio, CNAE, grupoDoCNAE, classeDoGrupo } from '../models/dadosIBGE';

@Injectable({
  providedIn: 'root'
})
export class ibgeService {
  readonly IBGE_BASEURL = environment.otherApis.IBGE.baseUrl;


  constructor(
    private http: HttpClient,
  ) { }

  getEstados(): Observable<estado[]> {
    return this.http.get<estado[]>(
        `${this.IBGE_BASEURL}/estados?orderBy=nome`
    )
  }
  getMunicipiosPorUF(UF:string): Observable<municipio[]> {
    return this.http.get<municipio[]>(
        `${this.IBGE_BASEURL}/estados/${UF}/municipios?orderBy=nome`
    )
  }

  getCNAE(): Observable<CNAE[]> {
    return this.http.get<CNAE[]>(
        `https://servicodados.ibge.gov.br/api/v2/cnae/divisoes`
    )
  }
  getGruposPorDivisao(idDivisao:number): Observable<grupoDoCNAE[]> {
    return this.http.get<grupoDoCNAE[]>(
        `https://servicodados.ibge.gov.br/api/v2/cnae/divisoes/${idDivisao}/grupos`
    )
  }
  getClassesPorGrupo(idClasse:number): Observable<classeDoGrupo[]> {
    return this.http.get<classeDoGrupo[]>(
        `https://servicodados.ibge.gov.br/api/v2/cnae/grupos/${idClasse}/classes`
    )
  }
}

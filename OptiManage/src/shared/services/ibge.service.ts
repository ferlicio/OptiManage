import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { speedioConsultaCNPJ } from 'src/shared/models/speedioConsultaCNPJ';
import { ViaCepAddress } from 'src/shared/models/viacep';
import { CepService } from 'src/shared/services/cep.service';
import { estado, municipio } from '../models/dadosIBGE';

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
}

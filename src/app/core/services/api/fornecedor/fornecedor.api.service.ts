import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { speedioConsultaCNPJ } from 'src/shared/models/speedioConsultaCNPJ';
import { ViaCepAddress } from 'src/shared/models/viacep';
import { CepService } from 'src/shared/services/cep.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedorApiService {
  readonly BASE_URL = environment.optimanageApi.baseUrl;
  readonly VIA_CEP_BASEURL = environment.otherApis.viacep.baseUrl;
  readonly OPTIMANAGE_API = environment.otherApis.optimanageApiAWS;


  constructor(
    private http: HttpClient,
    private cepService: CepService,
  ) { }

  getAddressViaCep(zipcode: string | number): Observable<ViaCepAddress> {
    return this.cepService.getAddressViaCep(zipcode); 
  }
  getCNPJ(cnpj: string): Observable<speedioConsultaCNPJ> {
    return this.http.get<speedioConsultaCNPJ>(
      `${this.OPTIMANAGE_API.baseUrl + this.OPTIMANAGE_API.endpoints.getCNPJInfo}?cnpj=${cnpj}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bq6LFvnHas4IATTGQfxUQ3gEigEGvNGp4jhhnkiT'
        }
      }
    );
  }
}

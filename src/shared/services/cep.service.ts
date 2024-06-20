import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ViaCepAddress } from '../models/viacep';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly VIA_CEP_BASEURL = environment.otherApis.viacep.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getAddressViaCep(zipcode: string | number): Observable<ViaCepAddress> {
    return this.http.get<ViaCepAddress>(
      `${this.VIA_CEP_BASEURL}/${zipcode}/json/`
    );
  }
}

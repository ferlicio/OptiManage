import { TestBed } from '@angular/core/testing';

import { FornecedorApiService } from './fornecedor.api.service';

describe('FornecedorApiService', () => {
  let service: FornecedorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornecedorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

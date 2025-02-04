import { TestBed } from '@angular/core/testing';

import { CatalogoEspeciesService } from './catalogo-especies.service';

describe('CatalogoEspeciesService', () => {
  let service: CatalogoEspeciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoEspeciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

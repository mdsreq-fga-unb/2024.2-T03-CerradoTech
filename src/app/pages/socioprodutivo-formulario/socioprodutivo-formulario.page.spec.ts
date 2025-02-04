import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocioprodutivoFormularioPage } from './socioprodutivo-formulario.page';

describe('SocioprodutivoFormularioPage', () => {
  let component: SocioprodutivoFormularioPage;
  let fixture: ComponentFixture<SocioprodutivoFormularioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SocioprodutivoFormularioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocioprodutivoFormularioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParcelaMonitoramentoPage } from './parcela-monitoramento.page';

describe('ParcelaMonitoramentoPage', () => {
  let component: ParcelaMonitoramentoPage;
  let fixture: ComponentFixture<ParcelaMonitoramentoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelaMonitoramentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParcelaMonitoramentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

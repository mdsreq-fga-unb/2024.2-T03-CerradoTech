import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndicadoresPoligonoComponent } from './indicadores-poligono.component';

describe('IndicadoresPoligonoComponent', () => {
  let component: IndicadoresPoligonoComponent;
  let fixture: ComponentFixture<IndicadoresPoligonoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadoresPoligonoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndicadoresPoligonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoligonoDFComponent } from './PoligonoForm/df/df.component';
import { IndicadoresPoligonoComponent } from './indicadores-poligono/indicadores-poligono.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { PipesModule } from '@app/pipes/pipes.module';

@NgModule({
	declarations: [
		PoligonoDFComponent,
		IndicadoresPoligonoComponent
	],
	imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, BrMaskerModule, PipesModule],
	exports: [
		PoligonoDFComponent,
		IndicadoresPoligonoComponent
	]
})
export class ComponentsModule { }

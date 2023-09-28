import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { PortFeesComponent } from './port-fees/port-fees.component';
import { AgentFeesComponent } from './agent-fees/agent-fees.component';
import { SidecomexRatesComponent } from './sidecomex-rates/sidecomex-rates.component';
import { TerrestrialRatesComponent } from './terrestrial-rates/terrestrial-rates.component';
import { OtherFeesComponent } from './other-fees/other-fees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgzorroModule } from '../ngzorro/ngzorro.module';
import { TransportationCartagenaComponent } from './transportation-cartagena/transportation-cartagena.component';
import { TransportationBuenaventuraComponent } from './transportation-buenaventura/transportation-buenaventura.component';
import { CodigosMaterialesComponent } from './codigos-materiales/codigos-materiales.component';
import { FormMaterialComponent } from './form-material/form-material.component';



@NgModule({
  declarations: [
    ReportComponent,
    PortFeesComponent,
    AgentFeesComponent,
    SidecomexRatesComponent,
    TerrestrialRatesComponent,
    OtherFeesComponent,
    TransportationCartagenaComponent,
    TransportationBuenaventuraComponent,
    CodigosMaterialesComponent,
    FormMaterialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgzorroModule
  ]
})
export class ComponentsModule { }

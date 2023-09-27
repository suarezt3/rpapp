import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { ReportComponent } from 'src/app/components/report/report.component';
import { PortFeesComponent } from 'src/app/components/port-fees/port-fees.component';
import { AgentFeesComponent } from 'src/app/components/agent-fees/agent-fees.component';
import { SidecomexRatesComponent } from 'src/app/components/sidecomex-rates/sidecomex-rates.component';
import { TerrestrialRatesComponent } from 'src/app/components/terrestrial-rates/terrestrial-rates.component';
import { OtherFeesComponent } from 'src/app/components/other-fees/other-fees.component';
import { TransportationBuenaventuraComponent } from 'src/app/components/transportation-buenaventura/transportation-buenaventura.component';
import { TransportationCartagenaComponent } from 'src/app/components/transportation-cartagena/transportation-cartagena.component';
import { CodigosMaterialesComponent } from 'src/app/components/codigos-materiales/codigos-materiales.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'tarifa-puerto', component: PortFeesComponent },
  { path: 'tarifa-agente-naviera', component: AgentFeesComponent },
  { path: 'tarifa-sidecomex', component: SidecomexRatesComponent },
  { path: 'buenaventura', component: TransportationBuenaventuraComponent },
  { path: 'cartagena', component: TransportationCartagenaComponent },
  { path: 'otras-tarifas', component: OtherFeesComponent },
  { path: 'reporte', component: ReportComponent },
  { path: 'materiales', component: CodigosMaterialesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }

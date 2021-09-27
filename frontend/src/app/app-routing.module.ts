import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConstructorEnteringComponent} from "./pages/constructor-entering/constructor-entering.component";
import {StatementEnteringComponent} from "./pages/statement-entering/statement-entering.component";
import {FunctionDefinitionsComponent} from "./pages/function-definitions/function-definitions.component";
import {AdditionalConstraintsEnteringComponent} from "./pages/additional-constraints-entering/additional-constraints-entering.component";
import {FinishComponent} from "./pages/finish/finish.component";
import {StartComponent} from "./pages/start/start.component";
import {LoadRequestComponent} from "./pages/load-request/load-request.component";

const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'start', component: StartComponent},
  {path: 'constructor-definitions', component: ConstructorEnteringComponent},
  {path: 'statement', component: StatementEnteringComponent},
  {path: 'function-definitions', component: FunctionDefinitionsComponent},
  {path: 'additional-constraints', component: AdditionalConstraintsEnteringComponent},
  {path: 'finish', component: FinishComponent},
  // {path: 'load-request', component: LoadRequestComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

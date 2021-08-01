import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ConstructorEnteringComponent} from "./components/constructor-entering/constructor-entering.component";
import {StructuralInductionProverGuidedComponent} from "./components/structural-induction-prover-guided/structural-induction-prover-guided.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AccordionModule} from "primeng/accordion";
import {DropdownModule} from "primeng/dropdown";
import {FieldsetModule} from "primeng/fieldset";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TabMenuModule} from "primeng/tabmenu";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {KeyFilterModule} from "primeng/keyfilter";
import {CardModule} from "primeng/card";
import {RippleModule} from "primeng/ripple";
import {InputNumberModule} from "primeng/inputnumber";
import { StatementEnteringComponent } from './components/statement-entering/statement-entering.component';
import {BlockUIModule} from "primeng/blockui";
import { BlockComponent } from './components/block/block.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {FunctionDefinitionsComponent} from "./components/function-definitions/function-definitions.component";
import { AdditionalConstraintsEnteringComponent } from './components/additional-constraints-entering/additional-constraints-entering.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ConstructorEnteringComponent,
    StructuralInductionProverGuidedComponent,
    StatementEnteringComponent,
    BlockComponent,
    FunctionDefinitionsComponent,
    AdditionalConstraintsEnteringComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccordionModule,
    DropdownModule,
    FieldsetModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TabMenuModule,
    OverlayPanelModule,
    KeyFilterModule,
    CardModule,
    RippleModule,
    InputNumberModule,
    BlockUIModule,
    ProgressSpinnerModule,
    HttpClientModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

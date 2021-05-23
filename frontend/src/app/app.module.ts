import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { StructuralInductionProverComponent } from './components/structural-induction-prover/structural-induction-prover.component';
import {AccordionModule} from "primeng/accordion";
import {DropdownModule} from "primeng/dropdown";
import { FunctionDefinitionComponent } from './components/function-definition/function-definition.component';
import {FieldsetModule} from "primeng/fieldset";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    AppComponent,
    StructuralInductionProverComponent,
    FunctionDefinitionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccordionModule,
    DropdownModule,
    FieldsetModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

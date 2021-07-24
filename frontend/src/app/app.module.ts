import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StructuralInductionProverComponent } from './components/structural-induction-prover/structural-induction-prover.component';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabMenuModule } from 'primeng/tabmenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { StructuralInductionProverGuidedComponent } from './components/structural-induction-prover-guided/structural-induction-prover-guided.component';
import { ConstructorSidebarEditorComponent } from './components/constructor-sidebar-editor/constructor-sidebar-editor.component';
import { ConstructorEnteringComponent } from './components/constructor-entering/constructor-entering.component';
import { ConstructorFunctionEditingComponent } from './components/constructor-function-editing/constructor-function-editing.component';
import {CardModule} from "primeng/card";

@NgModule({
	declarations: [AppComponent, StructuralInductionProverComponent, StructuralInductionProverGuidedComponent, ConstructorSidebarEditorComponent, ConstructorEnteringComponent, ConstructorFunctionEditingComponent],
	imports: [
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
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

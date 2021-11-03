import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ConstructorEnteringComponent} from "./pages/constructor-entering/constructor-entering.component";
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
import { StatementEnteringComponent } from './pages/statement-entering/statement-entering.component';
import {BlockUIModule} from "primeng/blockui";
import { BlockComponent } from './components/block/block.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {FunctionDefinitionsComponent} from "./pages/function-definitions/function-definitions.component";
import { AdditionalConstraintsEnteringComponent } from './pages/additional-constraints-entering/additional-constraints-entering.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LoadingScreenService} from "./services/loading-screen/loading-screen.service";
import {RequestDataService} from "./services/request-data-service/request-data.service";
import {DividerModule} from "primeng/divider";
import { FinishComponent } from './pages/finish/finish.component';
import { StartComponent } from './pages/start/start.component';
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService, MessageService} from "primeng/api";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToastModule} from "primeng/toast";
import {StepsModule} from "primeng/steps";
import {LoadRequestComponent} from "./pages/load-request/load-request.component";
import { UsageComponent } from './pages/usage/usage.component';
import {DialogModule} from "primeng/dialog";
import {TooltipModule} from "primeng/tooltip";
import {InputSwitchModule} from "primeng/inputswitch";
import {SelectButtonModule} from "primeng/selectbutton";
import {MessagesModule} from "primeng/messages";

@NgModule({
  declarations: [
    AppComponent,
    ConstructorEnteringComponent,
    StatementEnteringComponent,
    BlockComponent,
    FunctionDefinitionsComponent,
    AdditionalConstraintsEnteringComponent,
    FinishComponent,
    StartComponent,
    LoadRequestComponent,
    UsageComponent,
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
        DividerModule,
        ConfirmPopupModule,
        InputTextareaModule,
        ToastModule,
        StepsModule,
        DialogModule,
        TooltipModule,
        InputSwitchModule,
        SelectButtonModule,
        MessagesModule,
    ],
  providers: [HttpClient, LoadingScreenService, RequestDataService, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

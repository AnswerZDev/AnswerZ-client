import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ErrorsModule } from './errors/errors.module';
import { FlashcardModule } from './flashcards/flashcards.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from './shared/services/toast.service';
import { ConfirmService } from './shared/services/confirm.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        BrowserAnimationsModule,
        SharedModule,
        ErrorsModule,
        FlashcardModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

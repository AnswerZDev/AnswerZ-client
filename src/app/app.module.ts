import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ErrorsModule } from './errors/errors.module';
import { FlashcardModule } from './flashcards/flashcards.module';
import { CardsPreviewComponent } from './flashcards/component/cards-preview/cards-preview.component';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ToastModule,
        AuthModule,
        BrowserAnimationsModule,
        SharedModule,
        ErrorsModule,
        FlashcardModule,
        UserModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

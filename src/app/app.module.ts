import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ErrorsModule } from './errors/errors.module';
import { FlashcardModule } from './flashcards/flashcards.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module'
import { CardsetModule } from './cardset/cardset.module';
import { NgClass } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ToastModule,
        AuthModule,
        ToastModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HomeModule,
        ErrorsModule,
        FlashcardModule,
        UserModule,
        AdminModule,
        AuthModule,
        BrowserAnimationsModule,
        SharedModule,
        NgClass,
        CardsetModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

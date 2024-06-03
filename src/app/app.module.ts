import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthModule } from './auth/auth.module';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ErrorsModule } from './errors/errors.module';
import { FlashcardModule } from './flashcards/flashcards.module';
import { UserModule } from './user/user.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AdminModule } from './admin/admin.module'
import { CardsetModule } from './cardset/cardset.module';
import {CoreModule} from "./core/core.module";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { NgClass } from '@angular/common';
import {TranslateLoader,TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ConfirmDialogModule} from "primeng/confirmdialog";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http)
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ToastModule,
        ConfirmDialogModule,
        AuthModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HomeModule,
        ErrorsModule,
        FlashcardModule,
        UserModule,
        AdminModule,
        SharedModule,
        CardsetModule,
        NgClass,
        CoreModule,
        ProgressSpinnerModule,
        MessagesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule { }

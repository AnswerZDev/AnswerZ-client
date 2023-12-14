import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'flashcards',
        loadChildren: () =>
            import('./flashcards/flashcards.module').then((m) => m.FlashcardModule),
    },
    {
        path: 'user',
        loadChildren: () =>
            import('./user/user.module').then((m) => m.UserModule),

    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

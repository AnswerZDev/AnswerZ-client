import { NgModule } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { CarsetRoutingModule } from './cardset-routing.module';
import { AllCardsetComponent } from './component/all-cardset/all-cardset.component';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SearchCardsetComponent } from './component/search-cardset/search-cardset.component';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    AllCardsetComponent,
    SearchCardsetComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    CommonModule,
    CarsetRoutingModule,
    DropdownModule,
    KeyFilterModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    AutoCompleteModule,
  ]
})
export class CardsetModule { }

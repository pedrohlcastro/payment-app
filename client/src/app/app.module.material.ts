import 'hammerjs';
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdInputModule, MdCardModule, MdIconModule,
  MdTabsModule, MdProgressSpinnerModule, MdTooltipModule, MdDialogModule, MdSelectModule,
  MdGridListModule, MdSidenavModule, MdExpansionModule } from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdInputModule, MdCardModule, MdIconModule, MdTabsModule,
    MdProgressSpinnerModule, MdTooltipModule, MdDialogModule, MdSelectModule, MdGridListModule, MdSidenavModule, MdExpansionModule ],

  exports: [MdButtonModule, MdCheckboxModule, MdInputModule, MdCardModule, MdIconModule, MdTabsModule,
    MdProgressSpinnerModule, MdTooltipModule, MdDialogModule, MdSelectModule, MdGridListModule, MdSidenavModule, MdExpansionModule ],
})
export class AppMaterialModule { }

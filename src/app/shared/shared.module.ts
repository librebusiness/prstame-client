import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadComponent } from './preload/preload.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PreloadComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    PreloadComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }

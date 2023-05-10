import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { SharedModule } from './shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './reducers/effects/auth.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    DashboardModule,
    AuthModule,
    SharedModule,
    EffectsModule.forRoot(AuthEffects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

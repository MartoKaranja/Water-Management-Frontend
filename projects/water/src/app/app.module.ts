
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { LoginLayoutComponent } from './login/login-layout/login-layout.component';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import { MTX_DATETIME_FORMATS } from '@ng-matero/extensions/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MtxMomentDatetimeModule } from '@ng-matero/extensions-moment-adapter';


import { AuthInterceptor } from './services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard, LoginGuard } from './auth.guard';
import { DataStorage } from './services/data-store';



@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    MtxDatetimepickerModule,
    MtxMomentDatetimeModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    LoginGuard,
    AuthGuard,
    DataStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        floatLabel: 'always',
        appearance: 'fill',
      }
    }
    ,
    {
      provide: MTX_DATETIME_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
          yearInput: 'YYYY',
          monthInput: 'MMMM',
          datetimeInput: 'YYYY-MM-DD HH:mm',
          timeInput: 'HH:mm',
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          yearInput: 'YYYY',
          monthInput: 'MMMM',
          datetimeInput: 'YYYY-MM-DD HH:mm',
          timeInput: 'HH:mm',
          monthYearLabel: 'YYYY MMMM',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
          popupHeaderDateLabel: 'MMM DD, ddd',
        },
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

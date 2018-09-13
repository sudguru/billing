import { LoginGuard } from './guards/loginguard';
import { AuthGuard } from './guards/authguard';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

import { AppNavComponent } from './components/app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './modules/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './components/register/register.component';
import { StudentComponent } from './components/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

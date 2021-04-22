import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SortingPipe } from './sorting.pipe';
import { TokenInterceptor } from './services/token.interceptor';
import { PostComponent } from './components/post/post.component';
import { QuillModule } from 'ngx-quill'
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    SortingPipe,
    DashboardComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        multi: true,
        useClass: TokenInterceptor
    }
],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

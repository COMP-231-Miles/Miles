import { UserService } from './services/user.service';
import { UserApiService } from './services/user-api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TestService } from './services/test.service';
import { AuthInterceptor } from './services/auth-interceptor';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './partials/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FooterComponent } from './partials/footer/footer.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, SearchBarComponent, FooterComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule
  ],
  providers: [
    UserApiService,
    UserService,
    TestService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

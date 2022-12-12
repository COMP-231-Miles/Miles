import { MyReservationComponent } from './pages/my-reservation/my-reservation.component';
import { UserService } from './services/user.service';
import { UserApiService } from './services/user-api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestService } from './services/test.service';
import { AuthInterceptor } from './services/auth-interceptor';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './partials/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FooterComponent } from './partials/footer/footer.component';
import { CarListComponent } from './pages/car-list/car-list.component';
import { CardCarComponent } from './components/card-car/card-car.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoliciesComponent } from './pages/policies/policies.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { BookComponent } from './pages/book/book.component';
import { CustomerAccountComponent } from './pages/customer-account/customer-account.component';
import { AdminAccountComponent } from './pages/admin-account/admin-account.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    CarListComponent,
    CardCarComponent,
    CardCarComponent,
    PoliciesComponent,
    SignUpComponent,
    BookComponent,
    CustomerAccountComponent,
    AdminAccountComponent,
    InvoiceComponent,
    MyReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
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

import { MyReservationComponent } from './pages/my-reservation/my-reservation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { AuthGuard } from './guards/auth.guard';
import { CarListComponent } from './pages/car-list/car-list.component';
import { HomeComponent } from './pages/home/home.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'car-list/:location/:dateFrom/:dateTo', component: CarListComponent, data: {title: 'Cars'}},
  {path: 'book/:car/:location/:dateFrom/:dateTo', component: BookComponent, data: {title: 'Booking'}},
  {path: 'invoice/:car/:location/:dateFrom/:dateTo', component: InvoiceComponent, data: {title: 'Cars'}},
  {path: 'policies', component: PoliciesComponent, data: {title: 'Cars'}},
  {path: 'sign-up', component: SignUpComponent, data: {title: 'Cars'}},
  {path: 'my-reservation', component: MyReservationComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

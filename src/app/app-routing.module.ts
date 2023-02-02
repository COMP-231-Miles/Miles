import { ProfileComponent } from './pages/profile/profile.component';
import { MyReservationComponent } from './pages/my-reservation/my-reservation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { AuthGuard } from './guards/auth.guard';
import { CarSearchListComponent } from './pages/car-search-list/car-search-list.component';
import { HomeComponent } from './pages/home/home.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { InventoryComponent } from './pages/inventory/inventory.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'car-list/:location/:dateFrom/:dateTo', component: CarSearchListComponent, data: {title: 'Cars'}},
  {path: 'book/:car/:location/:dateFrom/:dateTo', component: BookComponent, data: {title: 'Booking'}},
  {path: 'invoice/:car/:location/:dateFrom/:dateTo/:reservation', component: InvoiceComponent, data: {title: 'Cars'}},
  {path: 'policies', component: PoliciesComponent, data: {title: 'Cars'}},
  {path: 'contact-us', component: ContactUsComponent, data: {title: 'Contact Us'}},
  {path: 'sign-up', component: SignUpComponent, data: {title: 'Cars'}},
  {path: 'reservations', component: ReservationsComponent, data: {title: 'Reservations'}},
  {path: 'inventory', component: InventoryComponent, data: {title: 'Inventory'}},
  {path: 'my-reservation', component: MyReservationComponent },
  {path: 'my-profile', component: ProfileComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

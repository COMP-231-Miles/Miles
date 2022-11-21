import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './pages/car-list/car-list.component';
import { HomeComponent } from './pages/home/home.component';
import { PoliciesComponent } from './pages/policies/policies.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'car-list/:location', component: CarListComponent, data: {title: 'Cars'}},
  {path: 'policies', component: PoliciesComponent, data: {title: 'Cars'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

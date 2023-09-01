import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FooterComponent } from './footer/footer.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ReserveAppointmentComponent } from './reserve-appointment/reserve-appointment.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChooseyourdoctorComponent } from './chooseyourdoctor/chooseyourdoctor.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import { AddnewdaysComponent } from './addnewdays/addnewdays.component';
import { EditdaysComponent } from './editdays/editdays.component';


const appRoute: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'AdminLogin', component: AdminLoginComponent },
  { path: 'AdminPanel/:doctorId', component: AdminPanelComponent },
  { path: 'ChooseYourDoctor', component: ChooseyourdoctorComponent },
  { path: 'ReserveAppointment/:doctorId', component: ReserveAppointmentComponent },
  {path:'AddNewDays/:doctorId',component:AddnewdaysComponent},
  {path:'EditDays/:doctorId',component: EditdaysComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    AdminLoginComponent,
    FooterComponent,
    AdminPanelComponent,
    ReserveAppointmentComponent,
    ChooseyourdoctorComponent,
    AddnewdaysComponent,
    EditdaysComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
    FullCalendarModule,
    MatDialogModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

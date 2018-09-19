import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { HttpClientModule } from '@angular/common/http';
import { EmailService } from './services/email.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NetworksocialComponent } from './components/networksocial/networksocial.component';
import { AcercadeComponent } from './components/about/acercade/acercade.component';
import { SkillsComponent } from './components/about/skills/skills.component';
import { ExperienceComponent } from './components/about/experience/experience.component';
import { EducationComponent } from './components/about/education/education.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    NavbarComponent,
    NetworksocialComponent,
    AcercadeComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    NotFoundComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    SnotifyModule
  ],
  providers: [EmailService, { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

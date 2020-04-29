import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlComponent } from './views/commons/control/control.component';

import { AboutComponent } from './views/pages/about/about.component';
import { PanelComponent } from './views/pages/panel/panel.component';
import { HttpClientModule } from '@angular/common/http';
import { EventComponent } from './views/pages/panel/event/event.component';
import { CrewComponent } from './views/pages/panel/crew/crew.component';
import { ContentComponent } from './views/pages/panel/content/content.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './views/pages/panel/user/user.component';
import { ImageComponent } from './views/pages/panel/image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    AboutComponent,
    PanelComponent,
    EventComponent,
    CrewComponent,
    ContentComponent,
    UserComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

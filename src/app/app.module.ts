import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlarmListComponent } from './alarm-list/alarm-list.component';
import { AlarmItemComponent } from './alarm-item/alarm-item.component';
import { HttpClientModule } from '@angular/common/http';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { Observable } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    AlarmListComponent,
    AlarmItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

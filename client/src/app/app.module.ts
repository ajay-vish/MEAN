import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AuthService } from "./services/auth.service";
import { AdminauthService } from "./services/adminauth.service";
import { MainService } from "./services/main.service";

import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddQuestionComponent } from './components/question/add-question/add-question.component';
import { EditQuestionComponent } from './components/question/edit-question/edit-question.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { DisplayProfileComponent } from './components/user/profile/display-profile/display-profile.component';
import { EditProfileComponent } from './components/user/profile/edit-profile/edit-profile.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { DisplayQuestionComponent } from './components/question/display-question/display-question.component';
import { DisplayAllQuestionsComponent } from './components/question/display-all-questions/display-all-questions.component';
import { AddAnswerComponent } from './components/answer/add-answer/add-answer.component';
import { EditAnswerComponent } from './components/answer/edit-answer/edit-answer.component';
import { AnswerTemplateComponent } from './components/answer/answer-template/answer-template.component';
import { QuestionTemplateComponent } from './components/question/question-template/question-template.component';
import { WebsocketService } from './services/websocket.service';
import { ChatroomComponent } from './components/user/chatroom/chatroom.component';
import { FollowersComponent } from './components/user/templates/followers/followers.component';
import { NotificationsComponent } from './components/user/templates/notifications/notifications.component';
import { MessagesComponent } from './components/user/templates/messages/messages.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { QuestionComponent } from './components/admin/template/question/question.component';
import { AnswerComponent } from './components/admin/template/answer/answer.component';
import { UserComponent } from './components/admin/template/user/user.component';
import { ReportedQuestionComponent } from './components/admin/template/reported-question/reported-question.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DisplayProfileComponent,
    EditProfileComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    DisplayQuestionComponent,
    DisplayAllQuestionsComponent,
    AddAnswerComponent,
    EditAnswerComponent,
    AnswerTemplateComponent,
    QuestionTemplateComponent,
    ChatroomComponent,
    FollowersComponent,
    NotificationsComponent,
    MessagesComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    AdminNavbarComponent,
    QuestionComponent,
    AnswerComponent,
    UserComponent,
    ReportedQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    NgMatSearchBarModule,
    BarRatingModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule
  ],
  providers: [
    MainService,
    AuthService, 
    AdminauthService, 
    WebsocketService,
    Title,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

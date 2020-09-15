import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { DisplayProfileComponent } from './components/user/profile/display-profile/display-profile.component';
import { EditProfileComponent } from './components/user/profile/edit-profile/edit-profile.component';
import { HomeComponent } from './components/user/home/home.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { DisplayAllQuestionsComponent } from './components/question/display-all-questions/display-all-questions.component';
import { DisplayQuestionComponent } from './components/question/display-question/display-question.component';
import { AddQuestionComponent } from './components/question/add-question/add-question.component';
import { AddAnswerComponent } from './components/answer/add-answer/add-answer.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ChatroomComponent } from './components/user/chatroom/chatroom.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' },
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    component: DisplayProfileComponent,
    data: { title: 'Profile' },
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: EditProfileComponent,
    data: { title: 'Profile' },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    canActivate: [AuthGuard]
  },
  {
    path: 'question',
    component: DisplayAllQuestionsComponent,
    data: { title: 'Questions' },
    canActivate: [AuthGuard]
  },
  {
    path: 'question/:id',
    component: DisplayQuestionComponent,
    data: { title: 'Question' },
    canActivate: [AuthGuard]
  },
  {
    path: 'addquestion',
    component: AddQuestionComponent,
    data: { title: 'Question' },
    canActivate: [AuthGuard]
  },
  {
    path: 'answer/:id',
    component: AddAnswerComponent,
    data: { title: 'Edit answer' },
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:username',
    component: ChatroomComponent,
    data: { title: 'Chatroom' },
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

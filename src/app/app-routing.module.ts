import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { AuthGuard } from './services/auth.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  { path: 'category', component: CategoriesComponent, canActivate: [AuthGuard] },
  {path: 'posts', component: AllPostComponent, canActivate: [AuthGuard]},
  {path: 'posts/new', component: NewPostComponent, canActivate: [AuthGuard]},
  {path: 'subscribers', component: SubscribersComponent, canActivate: [AuthGuard]},
  {path: 'comments', component: CommentsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

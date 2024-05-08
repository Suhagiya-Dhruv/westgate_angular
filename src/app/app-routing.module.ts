import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './utility/shared/components/login/login.component';
import { ForgotPasswordComponent } from './utility/shared/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './utility/shared/components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'boss-user',
    loadChildren: () => import('./modules/bos-user/bos-user.module').then(m => m.BOSUserModule)
  },
  {
    path: 'supplier-admin',
    loadChildren: () => import('./modules/supplier-admin/supplier-admin.module').then(m => m.SupplierAdminModule)
  },
  {
    path: 'feasibility-user',
    loadChildren: () => import('./modules/feasibility-analyst/feasibility-analyst.module').then(m => m.FeasibilityModule)
  },
  {
    path: 'project-manager',
    loadChildren: () => import('./modules/Project-Manager/Project-Manager.module').then(m => m.ProjectManagerModule)
  },
  {
    path: 'project-co-ordinator',
    loadChildren: () => import('./modules/project-co-ordinator/project-co-ordinator.module').then(m => m.ProjectCoOrdinatorModule)
  },
  {
    path: 'uk-writer',
    loadChildren: () => import('./modules/uk-writer/uk-writer.module').then(m => m.UkWriterModule)
  },
  {
    path: 'bid-submission',
    loadChildren: () => import('./modules/bid-submission/bid-submission.module').then(m => m.BidSubmissionModule)
  },
  {
    path: 'super-admin',
    loadChildren: () => import('./modules/super-admin/super-admin.module').then(m => m.SuperAdminModule)
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component : ResetPasswordComponent
  },
  {
    path: '**',
    pathMatch : 'full',
    redirectTo : 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

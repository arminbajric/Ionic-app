import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
 
  {  path: '', loadChildren: 'app/home/home.module#HomePageModule'  },  
   { path: 'signin', loadChildren: './pages/signin/signin.module#SigninPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },

 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

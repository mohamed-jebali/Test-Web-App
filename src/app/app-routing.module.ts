import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { MainContentComponent } from './main-content/main-content.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: '', component: MainContentComponent , pathMatch: 'full' },
  { path:'create', component: CreateComponent },
  { path:'edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

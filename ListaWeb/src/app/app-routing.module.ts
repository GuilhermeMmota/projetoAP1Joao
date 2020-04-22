import { MainNavComponent } from './main-nav/main-nav.component';
import { ListaEditorComponent } from './lista-editor/lista-editor.component';
import { ListaListComponent } from './lista-list/lista-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';



const routes: Routes = [
  { path: '', component: MainNavComponent },
  { path: 'index.html', component: AppComponent },
  { path: 'index', component: MainNavComponent },
  { path: 'listas', component: ListaListComponent },
  { path: 'lista/:listasId', component: ListaEditorComponent, },
  { path: 'lista', component: ListaEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

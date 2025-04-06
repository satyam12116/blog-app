import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
     { path: 'blog', component: BlogListComponent },
  { path: 'create', component: EditorComponent }
];

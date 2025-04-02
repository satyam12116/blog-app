import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { EditorComponent } from './editor/editor.component';

export const routes: Routes = [
     { path: '', component: BlogListComponent },
  { path: 'create', component: EditorComponent }
];

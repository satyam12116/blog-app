import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  posts: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  getContent(blocks: any[]): string {
    return blocks.map(block => this.renderBlock(block)).join('');
  }
   // Function to render content blocks dynamically
   renderBlock(block: any): string {
    switch (block.type) {
      case 'header':
        return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
      case 'paragraph':
        return `<p>${block.data.text}</p>`;
      case 'image':
        return `<img src="${block.data.file.url}" alt="${block.data.caption}" style="max-width: 100%; height: 500px; border-radius: 8px; margin-bottom: 20px;" />`;
      case 'code':
        return `<pre><code>${block.data.code}</code></pre>`;
      case 'link':
        return `<a href="${block.data.link}">${block.data.text}</a>`;
      default:
        return '';
    }
  }
  
}

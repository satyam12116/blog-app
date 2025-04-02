import { Component, OnInit, AfterViewInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import CodeTool from '@editorjs/code';
// import LinkTool from '@editorjs/link';
import { BlogService } from '../blog.service';
import List from '@editorjs/list';
import Table from '@editorjs/table';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule  // Add FormsModule to imports array
  ],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  private editor: any;
  imageUrl: string = ''; // Bind image URL input
  imageFile: File | null = null; // Store the file input

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        image: {
          class: ImageTool,
          config: {
            config: {
              endpoints: {
             
                byUrl: '/upload-url' 
              }
            }
  
          }
        },
        code: CodeTool,
     
      },
      placeholder: 'Start typing your blog post here...'
    });
  }

  saveContent(): void {
    this.editor.save().then((outputData: any) => {
      const newPost = {
        title: "",  // You can customize this
        content: outputData
      };

      this.blogService.addPost(newPost).subscribe(response => {
        console.log('Post saved:', response);
      });
    }).catch((error: any) => {
      console.error('Saving failed: ', error);
    });
  }
  async addImageToEditor() {
    if (this.imageUrl.trim()) {
      // If the user has entered an image URL, insert it into the editor
      await this.editor.blocks.insert('image', {
        file: { url: this.imageUrl },
        caption: '', // You can add a caption field here if needed
        stretched: false,
        withBorder: false,
        withBackground: false
      });
      this.imageUrl = ''; // Clear the input field after insertion
    } else {
      alert('Please enter a valid image URL!');
    }
  }
}


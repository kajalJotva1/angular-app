import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create-dialog',
  templateUrl: './post-create-dialog.component.html',
  styleUrls: ['./post-create-dialog.component.scss']
})
export class PostCreateDialogComponent {
  post = { title: '', body: '' };
  isShowMessage = false;
  message = '';
  bgColor = '';

  constructor(
    public dialogRef: MatDialogRef<PostCreateDialogComponent>,
    private postService: PostService
  ) {}

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without any changes
  }

  onCreate(): void {
    if (this.post.title && this.post.body) {
      this.postService.createPost(this.post).subscribe((newPost) => {
        if(newPost){
          this.dialogRef.close(newPost);
        }
      });
    }
    else{
      this.message = 'Enter Post Details.';
      this.bgColor = '#e93c3c';
      this.isShowMessage = true;
      setTimeout(()=>{
        this.isShowMessage = false;
      },2000)
    }
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit-dialog',
  templateUrl: './post-edit-dialog.component.html',
  styleUrls: ['./post-edit-dialog.component.scss']
})
export class PostEditDialogComponent {
  post: any = {};

  constructor(
    public dialogRef: MatDialogRef<PostEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService
  ) {
    this.post = { ...data };
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without any changes
  }

  onUpdate(): void {
    this.postService.updatePost(this.post.id, this.post).subscribe((updatedPost) => {
      if(updatedPost){
        this.dialogRef.close(updatedPost); // Send updated post back to parent component
      }
    });
  }
}

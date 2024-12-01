import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { MatDialog } from '@angular/material/dialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any = {};
  postId;
  isShowMessage = false;
  message = '';
  bgColor = '';
  @Output() updateComplete = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id')!;  // Get the post ID from the route
    this.getPost(this.postId);
  }

  getPost(id: number): void {
    this.postService.getPost(id).subscribe(data => {
      this.post = data;
    });
  }

  editPost(): void {
    const dialogRef = this.dialog.open(PostEditDialogComponent, {
      width: '400px',
      data: this.post // Pass post data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.post = result;
        this.isShowMessage = true;
        this.message = 'Post Updated successfully';
        this.bgColor = '#6bb56e';

        setTimeout(()=>{
        this.isShowMessage = false;
        },2000)
      }
    });
  }

  deletePost(): void {
    this.postService.deletePost(this.post.id).subscribe((response) => {
      this.isShowMessage = true;
      this.message = 'Post Deleted successfully';
      this.bgColor = '#e93c3c';

      setTimeout(()=>{
      this.isShowMessage = false;
      this.router.navigate(['/']);
      },2000)
    });
  }
}

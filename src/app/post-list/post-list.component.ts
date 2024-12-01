import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { PostCreateDialogComponent } from '../post-create-dialog/post-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
    posts: any[] = [];
    isShowMessage = false;
    currentPage = 1;
    itemsPerPage = 10;
    message = '';
    bgColor = '';
  
    constructor(private postService: PostService, private router: Router, public dialog: MatDialog) {}
  
    ngOnInit(): void {
      this.getPosts();
    }
  
    getPosts(): void {
      this.postService.getPosts().subscribe(data => {
        console.log("//after update",)
        this.posts = data;
      });
    }

    goToDetail(id: number): void {
      this.router.navigate(['/posts', id]);
    }

    openCreateDialog(): void {
      const dialogRef = this.dialog.open(PostCreateDialogComponent, {
        width: '400px'
      });
  
      dialogRef.afterClosed().subscribe((newPost) => {
        if (newPost) {
          this.isShowMessage = true;
          this.message = 'Post Created successfully';
          this.bgColor = '#6bb56e'
          this.posts.push(newPost); // Add the new post to the list
        }
        setTimeout(() => {
          this.isShowMessage = false;
        }, 60000);
      });
    }

    get paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.posts.slice(startIndex, startIndex + this.itemsPerPage);
    }
  
    get totalPages() {
      return Math.ceil(this.posts.length / this.itemsPerPage);
    }
  
    changePage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
    
}

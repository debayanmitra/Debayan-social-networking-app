import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../post.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() posts = [];

  private postSubscription: Subscription;
  isLoading = false;
  postsSub;

  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        //.subscribe((postsReceived: Post[]) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
        //this.posts = postsReceived;
      });
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  onChangedPage(pageData: PageEvent) {
    //onsole.log(pageData);
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  //onDelete(postId: string) {
  //this.isLoading = true;
  //this.postService.deletePost(postId).subscribe(() =>{
  //this.postService.getPosts(this.postsPerPage, this.currentPage);
  //});
  //}
}

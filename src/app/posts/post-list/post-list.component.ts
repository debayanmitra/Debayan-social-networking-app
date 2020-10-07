import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";

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

  constructor(public postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
        this.posts = posts;
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
}

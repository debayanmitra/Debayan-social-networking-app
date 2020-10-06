import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  newPost = "No Content on the new post";

  onAddPost(postInput: HTMLTextAreaElement) {
    /** alert("Save clicked"); 
    console.dir(postInput);**/
    this.newPost = postInput.value;
  }
}

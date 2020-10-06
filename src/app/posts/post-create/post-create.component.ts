import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  enteredValue = "";
  newPost = "No Content on the new post";

  onAddPost() {
    /** alert("Save clicked"); 
    console.dir(postInput);**/
    this.newPost = this.enteredValue;
  }
}

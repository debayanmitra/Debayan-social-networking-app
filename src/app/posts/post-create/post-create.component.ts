// import { Component, OnInit, EventEmitter, Output } from "@angular/core";
// import { Post } from "../post.model";
// import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
// import { PostService } from "../post.service";
// import { ActivatedRoute, ParamMap } from "@angular/router";
// import { mimeType } from "./mime-type.validator";
// @Component({
//   selector: "app-post-create",
//   templateUrl: "./post-create.component.html",
//   styleUrls: ["./post-create.component.css"],
// })
// export class PostCreateComponent implements OnInit {
//   constructor(public postService: PostService, public route: ActivatedRoute) {}

//   newPost: string = "";
//   enteredValue: string = "";
//   enteredTitle: string = "";
//   enteredContent: string = "";
//   private mode = "create";
//   private postId: string;
//   post: Post;
//   isLoading: boolean = false;
//   form: FormGroup;
//   imagePreview: string | ArrayBuffer;

//   @Output() postCreated = new EventEmitter<Post>();

//   ngOnInit() {
//     this.form = new FormGroup({
//       title: new FormControl(null, {
//         validators: [Validators.required, Validators.minLength(3)],
//       }),
//       content: new FormControl(null, { validators: [Validators.required] }),
//       image: new FormControl(null, {
//         validators: [Validators.required],
//         asyncValidators: [mimeType],
//       }),
//     });
//     this.route.paramMap.subscribe((paramMap: ParamMap) => {
//       if (paramMap.has("postId")) {
//         this.mode = "edit";
//         this.postId = paramMap.get("postId");
//         this.isLoading = true;
//         this.postService.getPost(this.postId).subscribe((postData) => {
//           this.isLoading = false;
//           this.post = {
//             id: postData._id,
//             title: postData.title,
//             content: postData.content,
//             imagePath: postData.imagePath || "",
//           };
//           this.form.setValue({
//             title: this.post.title,
//             content: this.post.content,
//             image: postData.imagePath || "",
//           });
//           this.imagePreview = postData.imagePath || "";
//         });
//       } else {
//         this.mode = "create";
//         this.postId = null;
//       }
//     });
//   }

//   onAddPost(form: NgForm) {
//     if (form.invalid) {
//       return;
//     }

//     this.postService.addPost(
//       form.value.title,
//       form.value.content,
//       form.value.image
//     );
//     form.resetForm();
//   }

//   onSavePost() {
//     if (this.form.invalid) {
//       // return;
//     }
//     this.isLoading = true;
//     if (this.mode === "create") {
//       this.postService.addPost(
//         this.form.value.title,
//         this.form.value.content,
//         this.form.value.image
//       );
//     } else {
//       this.postService.updatePost(
//         this.postId,
//         this.form.value.title,
//         this.form.value.content,
//         this.form.value.image
//       );
//     }
//     this.form.reset();
//   }

//   onImagePicked(event) {
//     const reader = new FileReader();
//     const file = (event.target as HTMLInputElement).files[0];
//     reader.readAsDataURL(file);
//     this.form.patchValue({ image: file });
//     this.form.get("image").updateValueAndValidity();
//     reader.onload = (event) => {
//       // called once readAsDataURL is completed
//       this.imagePreview = event.target.result;
//     };
//   }
// }

import { Component, OnInit } from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  // @Output() postCreated = new EventEmitter<Post>();
  private mode = "create";
  private postId: string;
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          // this.isLoading = false;
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
          });
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) return;

    this.isLoading = true;
    if (this.mode === "create") {
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }

    this.form.reset();
  }
}

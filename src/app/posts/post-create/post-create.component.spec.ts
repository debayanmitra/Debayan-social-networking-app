// import { async, ComponentFixture, TestBed } from "@angular/core/testing";

// import { PostCreateComponent } from "./post-create.component";

// describe("PostCreateComponent", () => {
//   let component: PostCreateComponent;
//   let fixture: ComponentFixture<PostCreateComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [PostCreateComponent],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PostCreateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PostsCreateComponent } from "./post-create.component";

describe("PostCreateComponent", () => {
  let component: PostsCreateComponent;
  let fixture: ComponentFixture<PostsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

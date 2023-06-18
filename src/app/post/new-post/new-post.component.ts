import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;
  isDisable: boolean = true;

  postForm: FormGroup;

  categories: Array<any>;

  post: any;

  formStatus: string = 'Add New';

  docId: string;

  constructor(
    private _categoryService: CategoriesService,
    private _formBuilder: FormBuilder,
    private _postService: PostService,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe((val) => {
      this.docId = val.id;
      if (this.docId) {
        this._postService.loadOnePost(val.id).subscribe((post) => {
          this.post = post;

          this.postForm = this._formBuilder.group({
            title: [
              this.post.title,
              [Validators.required, Validators.minLength(10)],
            ],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [
              this.post.excerpt,
              [Validators.required, Validators.minLength(50)],
            ],
            category: [
              `${this.post.category.categoryId}-${this.post.category.category}`,
              Validators.required,
            ],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required],
          });
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        });
      } 
      else {
        this.postForm = this._formBuilder.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadCategoryData();
  }

  get fc() {
    return this.postForm.controls;
  }

  loadCategoryData() {
    this._categoryService.loadData().subscribe((data) => {
      this.categories = data;
    });
  }
  
  onTitleChange($event) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    this._postService.uploadImage(
      this.selectedImg,
      postData,
      this.formStatus,
      this.docId
    );
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }
}

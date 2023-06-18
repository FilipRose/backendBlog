import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  postArray: Array<any>;

  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this._postService.loadData().subscribe((val) => {
      this.postArray = val;
    });
  }

  deletePost(postImgPath, id) {
    this._postService.deletePost(postImgPath, id);
  }

  onFeatured(id, value) {
    const featuredData = {
      isFeatured: value,
    };
    this._postService.markFeatured(id, featuredData);
  }
}

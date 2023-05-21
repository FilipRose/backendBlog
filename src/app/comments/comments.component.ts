import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{

  comments: any

  constructor(private _commentsService: CommentsService) {}

  ngOnInit(): void {
    
  }

  loadSubsList() {
    this._commentsService.loadData().subscribe(val => {
      this.comments = val;
    });
  }

  onDelete(id) {
    this._commentsService.deleteData(id);
  }

}

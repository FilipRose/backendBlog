import { Component, OnInit } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subs: any;

  constructor(private _subService: SubscribeService) {}

  ngOnInit(): void {
    this.loadSubsList();
  }

  loadSubsList() {
    this._subService.loadData().subscribe(val => {
      this.subs = val;
    });
  }

  onDelete(id) {
    this._subService.deleteData(id);
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  constructor(
    private _fireStore: AngularFirestore,
    private _toastr: ToastrService
  ) {}

  loadData() {
    return this._fireStore
      .collection('subscribers')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {
              id,
              data,
            };
          });
        })
      );
  }
  deleteData(id) {
    this._fireStore.doc(`subscribers/${id}`).delete().then(docRef => {
      this._toastr.success('Data Deleted!')
    })
  }
}

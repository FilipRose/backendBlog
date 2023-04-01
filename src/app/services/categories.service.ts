import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private _fireStore: AngularFirestore,
    private _toastr: ToastrService
  ) {}

  saveData(data: any) {
    this._fireStore
      .collection('categories')
      .add(data)
      .then((docRef) => {
        this._toastr.success('Data insert successfuly!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  loadData() {
    return this._fireStore
      .collection('categories')
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
  updateData(id, EditData) {
    this._fireStore
      .collection('categories')
      .doc(id)
      .update(EditData)
      .then((docRef) => {
        this._toastr.success('Data edited successfuly!');
      });
  }
  deleteData(id) {
    this._fireStore
      .collection('categories')
      .doc(id)
      .delete()
      .then((docRef) => {
        this._toastr.success('Data deleted successfuly!');
      });
  }
}

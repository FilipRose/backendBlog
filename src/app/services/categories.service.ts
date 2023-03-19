import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private fireDb: AngularFirestore,
    private toastr: ToastrService
  ) {}

  saveData(data: any) {
    this.fireDb
      .collection('categories')
      .add(data)
      .then((docRef) => {
        this.toastr.success('Data Insert Successfuly!')
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

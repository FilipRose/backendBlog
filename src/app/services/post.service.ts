import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private _storage: AngularFireStorage,
    private _fireStore: AngularFirestore,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  uploadImage(selectedImg, postData, formStatus, id) {
    const filePath = `postIMG/${Date.now()}`;

    this._storage.upload(filePath, selectedImg).then(() => {
      this._storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;

          if(formStatus == 'Edit') {
            this.updatePost(id, postData);
          }
          else {
            this.saveData(postData);
          }
        });
    });
  }

  saveData(postData) {
    this._fireStore
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this._toastr.success('Post created successfully');
        this._router.navigate(['/posts']);
      });
  }

  loadData() {
    return this._fireStore
      .collection('posts')
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

  loadOnePost(id) {
    return this._fireStore.doc(`posts/${id}`).valueChanges();
  }

  updatePost(id, postData) {
    this._fireStore.doc(`posts/${id}`).update(postData).then(() => {
      this._toastr.success('Post updated successfully.');
      this._router.navigate(['/posts']);
    })
  }

  deletePost(postImgPath, id) {
    this._storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id)
    })
  }

  deleteData(id) {
    this._fireStore.doc(`posts/${id}`).delete().then(() => {
      this._toastr.warning('Post deleted successfully.')
    })
  }

  markFeatured(id, featuredData) {
    this._fireStore.doc(`posts/${id}`).update(featuredData).then(() => {
      this._toastr.info('Featured status updated.');
    })
  }

}

import { Component } from '@angular/core';
import { Photo, PhotoService } from '../services/photo.service'; //import photoservice class
import { ActionSheetController } from '@ionic/angular'; //import action sheet - utilized in displayed delete/cancel dialog

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoService: PhotoService,
    public actionSheetController: ActionSheetController) {}
  //call addNewToGallery on imported service
  addPhotoToGallery(){
    this.photoService.addNewToGallery();
    console.log('CAMERA OPENED'); //Added because of temporary lack of webcam - Confirms that this method has been executed successfully
    
  }

  //load and display all saved photos on screen
  async ngOnInit() {
    await this.photoService.loadSaved();
    console.log('PHOTOS LOADED SUCCESSFULLY');
  }

  //handles action sheet functionality, displayed when photos are tapped on (delete, cancel)
  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }
  
}


import { Component } from '@angular/core';

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Camera, CameraResultType}from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { BLE } from '@ionic-native/ble/ngx';
import { ActionSheetController, IonicModule } from '@ionic/angular';





@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class BluetoothPage  {
  
  devices: any[] = [];
  statusMessage: string | undefined;
  chemin : string | undefined;
    chemin2: string | undefined;
    list_image: String[]  = [];
  imageBase64!: string | String;
  // ble!: BLE ;
  
    
   constructor( private ble: BLE, private socialSharing:SocialSharing, public actionSheetController: ActionSheetController, ) {  }
   async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Settings',
      buttons: [
        {
          text: 'déconnecter',
          role: 'destructive',
          handler: () => { console.log('delete clicked'); }
        },
        {
          text: 'oublier',
          icon: 'trash',
          handler: () => { console.log('share clicked'); }
        },
        {
          text: 'Partager',
          icon: 'share',
          handler: () => { console.log('play clicked'); }
        }
      ]
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  startScan() {
    this.devices = [];
    this.ble
      .scan([], 5)
      .subscribe((device: any) => this.onDeviceDiscovered(device),);
  }

  onDeviceDiscovered(device: any) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.devices.push(device);
  }

  connectToDevice(device: any) {
    this.statusMessage = 'Connecting to ' + device.name || device.id ;

    this.ble
      .connect(device.id)
      .subscribe(
        (peripheral) => this.onConnected(peripheral),
        (peripheral) => this.onDeviceDisconnected(peripheral)
      );
  }

  onConnected(peripheral:any) {
    this.statusMessage = 'Connected to ' + (peripheral.name || peripheral.id);
  }

  onDeviceDisconnected(peripheral: any) {
    this.statusMessage = 'Disconnected ' + (peripheral.name || peripheral.id);
  }

   handleShare(image: any){
     this.socialSharing.share("Message: salut","titre: mon image", image)
     .then(res=>
       {console.log("Launched views", res)})
       .catch(err=>
         {console.log("Error launching views", err)
     });
 
   }
    async getImage(){
     const image= await Camera.getPhoto ({
     quality:90,
     allowEditing:true,
     resultType: CameraResultType.Base64
 
     });
    
 
     var imageUrl= "data: image/png;base64,"+image.base64String;//recupere l'image en string
     this.imageBase64= imageUrl;
     console.log(image);
     this.chemin2 = imageUrl;
     this.list_image.push(this.imageBase64)// met l'image enregistre dans le tableau
 
     
   }
   


 

  

}

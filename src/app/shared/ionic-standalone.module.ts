import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Ionic from '@ionic/angular/standalone';

@NgModule({
  imports: [
    CommonModule,
    Ionic.IonHeader,
    Ionic.IonToolbar,
    Ionic.IonTitle,
    Ionic.IonContent,
    Ionic.IonButtons,
    Ionic.IonButton,
    Ionic.IonIcon,
    Ionic.IonList,
    Ionic.IonItem,
    Ionic.IonLabel,
    Ionic.IonModal,
  ],
  exports: [
    CommonModule,
    Ionic.IonHeader,
    Ionic.IonToolbar,
    Ionic.IonTitle,
    Ionic.IonContent,
    Ionic.IonButtons,
    Ionic.IonButton,
    Ionic.IonIcon,
    Ionic.IonList,
    Ionic.IonItem,
    Ionic.IonLabel,
    Ionic.IonModal,
  ],
})
export class IonicStandaloneModule {}

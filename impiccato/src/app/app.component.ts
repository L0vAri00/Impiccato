import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private alertController: AlertController) {}


  reloadPage() {
    window.location.reload();
  }

  logMeOut() {
    this.router.navigate(['/home']);
  }

 async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Attenzione',
      message: 'Sei sicuro di voler ricominciare?',
      buttons: [
        {
          text: 'Conferma',
        handler: () => {
          this.reloadPage();
        }
        },
        {
          text: 'cancella',
        }
      ]
    });

    await alert.present();
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Attenzione',
      message: 'Sei sicuro di voler abbandonare?',
      buttons: [
        {
          text: 'Conferma',
        handler: () => {
          this.logMeOut();
        }
        },
        {
          text: 'cancella',
        }
      ]
    });

    await alert.present();
  }}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Game } from './game.page';
import { GameRoutingModule } from './game-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameRoutingModule,
  ],
  declarations: [Game]
})
export class GameModule {}

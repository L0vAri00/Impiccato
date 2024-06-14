import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Game } from './game.page';

const routes: Routes = [
  {
    path: '',
    component: Game,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}

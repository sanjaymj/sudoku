import { Component, OnInit } from '@angular/core';
import { SudokuService, GameState } from 'src/app/services/sudoku.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public sudokuService: SudokuService) { }

  public gameState = GameState;
  
  ngOnInit() {
  }

  public startGame() {
    this.sudokuService.startGame();
  }

  public stopGame() {
    this.sudokuService.stopGame();
  }

}

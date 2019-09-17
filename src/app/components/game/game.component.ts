import { Component, OnInit, Input } from '@angular/core';
import { SudokuService, GameState } from 'src/app/services/sudoku.service';
import { DifficultyLevel } from 'src/app/services/difficulty.level.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public sudokuService: SudokuService) { }

  public gameState = GameState;

  @Input()
  gameDifficulty:DifficultyLevel;

  public difficultyLevel = [{value: DifficultyLevel.Easy, id: 'Easy'}, {value: DifficultyLevel.Medium, id: 'Medium'}, {value: DifficultyLevel.Hard, id: 'Hard'}];
  
  ngOnInit() {
  }

  public startGame() {
    this.sudokuService.startGame(this.gameDifficulty);
  }

  public stopGame() {
    this.sudokuService.stopGame();
  }

}

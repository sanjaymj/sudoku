import { Component, OnInit, Input } from '@angular/core';
import { SudokuService, GameState } from 'src/app/services/sudoku.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {
  public gameState = GameState;
  constructor(public sudokuService: SudokuService) { }

  ngOnInit() {

  }

}

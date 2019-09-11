import { Component, OnInit } from '@angular/core';
import { SudokuService } from 'src/app/services/sudoku.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  public boardArray = [[0,1,2], [0,1,2],[0,1,2]];
  constructor(public sudokuService: SudokuService) {
  }

  public getCurrentBoard(i: number) {
    return this.sudokuService.getDesiredInnerBoard(i);
  }
}

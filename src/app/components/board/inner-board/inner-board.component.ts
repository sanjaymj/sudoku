import { Component, OnInit, Input } from '@angular/core';
import { SudokuService } from 'src/app/services/sudoku.service';
import { Cell } from 'src/app/model/cell.model';

@Component({
  selector: 'app-inner-board',
  templateUrl: './inner-board.component.html',
  styleUrls: ['./inner-board.component.scss']
})
export class InnerBoardComponent {

  @Input()
  currentBoard: Cell[] = [];

  constructor(public sudokuService: SudokuService) { }
}

import { Component, Input } from '@angular/core';
import { SudokuService, GameState } from 'src/app/services/sudoku.service';
import { Cell } from 'src/app/model/cell.model';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input()
  public cell: Cell;

  @Input()
  public val: number;

  public gameState = GameState;

  constructor(public sudokuService: SudokuService) { 
      
  }

  public update() {
    this.val = Number(this.val)%10;
    this.sudokuService.insertElementToTable(this.cell.index, Number(this.val)); 
  }

}

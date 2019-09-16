import { Component, OnInit } from '@angular/core';
import { interval, combineLatest, EMPTY } from 'rxjs';
import { SudokuService, GameState } from 'src/app/services/sudoku.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  public gameState = GameState;
  start = new Date(0,0,0);
  constructor(public sudokuService: SudokuService) { }

  ngOnInit() {
    const res = this.sudokuService.gameState$.pipe(switchMap((state) => {
      if (state === GameState.Playing) {
        return interval(1000);
      }
      else if (state === GameState.Finished) {
        this.sudokuService.setTimeToSolveChallenge(this.start);
      }
      return EMPTY;
    }));

    res.subscribe((val) => {
      this.start = new Date(0, 0, 0);
      this.start.setSeconds(val);
    });
  }

}

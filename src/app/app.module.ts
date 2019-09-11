import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { CellComponent } from './components/board/cell/cell.component';
import { MatTableModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import { InnerBoardComponent } from './components/board/inner-board/inner-board.component';
import { SudokuService } from './services/sudoku.service';
import { GameComponent } from './components/game/game.component';
import { TimeComponent } from './components/game/time/time.component';
import { GameOverComponent } from './components/game/game-over/game-over.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    InnerBoardComponent,
    GameComponent,
    TimeComponent,
    GameOverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatGridListModule
  ],
  providers: [SudokuService],
  bootstrap: [AppComponent]
})
export class AppModule { }

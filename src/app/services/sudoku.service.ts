import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject, from } from 'rxjs';
import { Cell } from '../model/cell.model';

export enum GameState {
    Dormant = 1,
    Playing = 2,
    Finished = 3
}

@Injectable()
export class SudokuService {

    private initialBoardStructure = [[4,0,0,2,6,9,7,8,1],[6,8,2,5,7,1,4,9,3],[1,9,7,8,3,4,5,6,2],[8,2,6,1,9,5,3,4,7],[3,7,4,6,8,2,9,1,5],
    [9,5,1,7,4,3,6,2,8],[5,1,9,3,2,6,8,7,4],[2,4,8,9,5,7,1,3,6],[7,6,3,4,1,8,2,5,9]];

    private sudokuBoard: Cell[][] = [];
    public sudokuBoard$$:BehaviorSubject<Cell[][]> =  new BehaviorSubject<Cell[][]>(this.sudokuBoard);
    public sudokuBoard$:Observable<Cell[][]> =  this.sudokuBoard$$.asObservable();

    public gameState$$:BehaviorSubject<GameState> = new BehaviorSubject<GameState>(GameState.Dormant);
    public gameState$:Observable<GameState> = this.gameState$$.asObservable();

    private innerBoards = [];

    private timeToFinishGame: Date = new Date();

    constructor() {
        this.initSudokuBoard();
        this.sudokuBoard$.subscribe(() => {
            this.applyAllRules();
        });
    }

    private initSudokuBoard() {
        this.mapInputToSudokuTable();
        this.divideBoardToSmallerTables();
    }

    private mapInputToSudokuTable() {
        let count = 0;
        for(const row of this.initialBoardStructure) {
            const mappedRowToCell : Cell[] = [];
            for (const item of row) {
                const cell: Cell = new Cell();
                cell.value = item;
                cell.isPrefilled = item !== 0;
                cell.index = count++;
                mappedRowToCell.push(cell);
            }
            this.sudokuBoard.push(mappedRowToCell);
        }
        this.sudokuBoard$$.next(this.sudokuBoard);
    }

    private divideBoardToSmallerTables() {
        for (let x1=0, x2=2; x1<=6; x1=x1+3, x2=x2+3) {
            for(let y1=0, y2=2; y1<=6; y1=y1+3, y2=y2+3) {
                this.innerBoards.push(this.createInnerBoard(x1,y1,x2,y2));
            }
        }
    }

    private createInnerBoard(x1: number, y1: number, x2: number, y2: number) {
        const arrayToReturn = [];
        for(let i = x1; i<=x2; i++) {
            const row = [];
            for (let j = y1; j<=y2; j++) {
                row.push(this.sudokuBoard[i][j]);
            }
            arrayToReturn.push(row);
        }
        return arrayToReturn;
    }

    public insertElementToTable(index: number, value: number) {
        const i = Math.floor(index/9);
        const j = index%9;
        this.sudokuBoard[i][j].value = value;
        this.sudokuBoard$$.next(this.sudokuBoard);
    }

    private applyAllRules() {
        if (this.allCellsFilled()) {
            if (this.applyRulesForInnerBoards()) {
                if (this.applyRulesForRows()) {
                    if (this.applyRulesForColumns()) {
                        this.gameState$$.next(GameState.Finished);
                    }
                }
            }
        }
    }

    private allCellsFilled() {
        return ![].concat(...this.sudokuBoard).some(cell => cell.value === 0);
    }

    private applyRulesForInnerBoards() {
        for(const row of this.innerBoards) {
            if (this.hasDuplicateEntries([].concat(...row))) {
                return false;
            }
        }
        return true;
    }

    private hasDuplicateEntries(array: Cell[]) {
        const cellValueArray = []
        array.forEach((cell : Cell) => {
            cellValueArray.push(cell.value);
        });
        return (new Set(cellValueArray)).size !== array.length;
    }

    private applyRulesForRows() {
        for(const row of this.sudokuBoard) {
            if (this.hasDuplicateEntries(row)) {
                return false;
            }
        }
        return true;
    }

    private applyRulesForColumns() {
        for(const row of this.transpose()) {
            if (this.hasDuplicateEntries(row)) {
                return false;
            }
        }
        return true;
    }

    private transpose() {
        let transposedArray = [];
        for(var i = 0; i < this.sudokuBoard.length; i++){
            transposedArray.push([]);
        };

        for(var i = 0; i < this.sudokuBoard.length; i++){
            for(var j = 0; j < this.sudokuBoard.length; j++){
                transposedArray[j].push(this.sudokuBoard[i][j]);
            };
        };
        return transposedArray;
    }

    public startGame() {
        this.sudokuBoard = [];
        this.innerBoards = [];
        this.initSudokuBoard();
        this.gameState$$.next(GameState.Playing);
    }

    public stopGame() {
        this.gameState$$.next(GameState.Dormant);
    }

    public getDesiredInnerBoard(index: number) {
        return this.innerBoards[index];
    }

    public setTimeToSolveChallenge(time: Date) {
        this.timeToFinishGame = time;
    }

    public getTimeToSolveChallenge() {
        return this.timeToFinishGame;
    }
}
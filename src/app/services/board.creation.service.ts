import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DifficultyLevel } from './difficulty.level.service';

export class BoardCreationService {
    private board = [];
    private firstRow = [];
    private emptyCellIndices = new Set<number>();

    constructor(private difficulty: DifficultyLevel) {
        this.creategameBoard();
    }

    public getGameBoard(): number[][] {
        return this.board;
    }

    private creategameBoard() {
        this.createRandomFirstRow();
        this.fillRemainingRows();
        this.generateRandomCellIndices();
        this.emtpyRequiredCellsToBeFilledByUser();
    }

    private createRandomFirstRow() {
        this.board = [];
        this.firstRow = [4,3,5,2,6,9,7,8,1];
        var j: number, x: number, i: number;
        for (i = this.firstRow.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.firstRow[i];
            this.firstRow[i] = this.firstRow[j];
            this.firstRow[j] = x;
        }
        this.board.push(this.firstRow);
    }

    private fillRemainingRows() {
        for(let i = 0; i<8; i++) {
            if (i===2 || i=== 5) { 
                this.board.push(this.shuffle(this.board[i], 1)); // For third and 6th rows, shift previous row elements only once. This is necessary for creating a valid board     
            } else { 
                this.board.push(this.shuffle(this.board[i], 3)); // For all remaining rows, shift previous row element by 3
            }
        }
    }

    private shuffle(row :number[], count: number) {
        const shuffledRow = Array.from(row);
        while(count--) {
            var temp = shuffledRow.shift();
            shuffledRow.push(temp);
        }
        return shuffledRow;
    }

    private generateRandomCellIndices() {
        for(let i = 0; i<81; i++) {
            this.emptyCellIndices.add(Math.floor(Math.random() * 81));
        }
        
        switch(this.difficulty) {
            case DifficultyLevel.Easy: {
                    this.emptyCellIndices.forEach((num: number) => {
                        if (num %2 === 0) {
                            this.emptyCellIndices.delete(num);
                        }
                    });
                break;    
            }
            case DifficultyLevel.Medium: {
                    this.emptyCellIndices.forEach((num: number) => {
                        if (num % 5 === 0) {
                            this.emptyCellIndices.delete(num);
                        }
                    });
                break;    
            }
        }
    }

    private emtpyRequiredCellsToBeFilledByUser() {
        for(const i of Array.from(this.emptyCellIndices.values())) {
            this.board[Math.floor(i/9)][i%9] = 0;
        }
    }
}
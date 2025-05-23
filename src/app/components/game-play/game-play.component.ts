import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GameMenuComponent } from '../common/game-menu/game-menu.component';
import { StartPromptComponent } from '../common/start-prompt/start-prompt.component';

@Component({
	selector: 'app-game-play',
	templateUrl: './game-play.component.html',
	imports: [FormsModule, CommonModule, GameMenuComponent, StartPromptComponent],
	styleUrl: './game-play.component.scss',
})
export class GamePlayComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChildren('inputElement') inputElements!: QueryList<ElementRef>;

	// Init infor
	readonly TIME_COUNTDOWN: number = 30;
	readonly NUM_OF_GET: number = 3;
	readonly DEFAUL_TIME: number = 60; // 60 s / word
	score: string = '2300';
	name: string = 'Haku';
	class: string = 'Class';
	// Game State
	words: string[] = ['hello', 'apple', 'banana'];
	hints: string[] = [
		'Một lời chào cơ bản bằng tiếng Anh.',
		'Một loại trái cây màu đỏ hoặc xanh, giòn.',
		'Trái cây vàng, dài mà khỉ rất thích.',
	];
	revealedIndices: Set<number> = new Set<number>();

	// Word Hint
	hint: string =
		'Đây là một loại trái cây thường có màu vàng, dài, và được khỉ rất thích.';
	currentIndex: number = 0;

	// Countdown & attempts
	timeLeft: number = 0;
	intervalId: any;
	attemptsLeft: number = 3;

	targetWord: string = ''; // Từ cần đoán
	displayedWord: string[] = []; // Giao diện ban đầu

	isGameOver: boolean = false;
	isGameStarted: boolean = false;
	isTransitioningWord: boolean = false;
	showStartPrompt: boolean = false;
	showMenu: boolean = false;

	hasGuessedWrong: boolean = false;

	ngOnInit(): void {
		this.showMenu = true;
		this.isGameStarted = false;
	}

	ngAfterViewInit(): void {}

	ngOnDestroy(): void {}

	//-----------------------------------------------------
	// Summary
	// Tải từ hiện tại vào game
	// Summary
	//-----------------------------------------------------
	loadWord(): void {
		this.targetWord = this.words[this.currentIndex];
		this.displayedWord = Array(this.targetWord.length).fill('_');
		this.hint = this.hints[this.currentIndex];
		this.attemptsLeft = this.NUM_OF_GET;
		this.timeLeft = this.DEFAUL_TIME;
	}

	//-----------------------------------------------------
	// Summary
	// Bắt đầu đếm ngược thời gian
	// Summary
	//-----------------------------------------------------
	startTimer(): void {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(() => {
			if (this.timeLeft > 0) {
				this.timeLeft--;
			} else {
				this.nextWord();
			}
		}, 1000);
	}

	//-----------------------------------------------------
	// Summary
	// Chuyển sang từ mới
	// Summary
	//-----------------------------------------------------
	nextWord(): void {
		this.isTransitioningWord = true;
		this.revealedIndices.clear();
		this.displayedWord = [];
		this.hasGuessedWrong = false;
		if (this.currentIndex === this.words.length - 1) {
			this.gameOver();
			return;
		}
		this.currentIndex = (this.currentIndex + 1) % this.words.length;

		this.loadWord();
		this.startTimer();
		// focus in first element
		setTimeout(() => {
			this.isTransitioningWord = false;
			this.inputElements.first?.nativeElement.select();
		}, 0);
	}

	//-----------------------------------------------------
	// Summary
	// Hàm xử lý khi người dùng nhập ký tự
	// Summary
	// <param> index </param>
	// <param> value </param>
	//-----------------------------------------------------
	onInputChange(i: number, event: Event) {
		const inputElement = event.target as HTMLInputElement;
		const value = inputElement.value;
		if (this.isTransitioningWord || !this.displayedWord.length) return;
		// Kiểm tra xem giá trị nhập vào có hợp lệ không
		if (value.length <= 1) {
			this.displayedWord[i] = value;

			// Chuyển focus sang input tiếp theo khi nhập đủ 1 ký tự
			if (!value) {
				return;
			}

			if (i < this.displayedWord.length - 1) {
				// Chưa phải ô cuối → chuyển focus sang ô tiếp theo
				const nextInput = this.inputElements.toArray()[i + 1]?.nativeElement;
				if (nextInput) {
					nextInput.select();
				}
			} else {
				// Nếu là ô cuối cùng → tự động submit
				this.submitGuess();
			}
		} else {
			this.displayedWord[i] = '_';
		}
	}

	//-----------------------------------------------------
	// Summary
	// Hàm xử lý khi người dùng click vào input
	// để tự động chọn toàn bộ nội dung trong ô input
	// Summary
	// <param> event </param>
	// <param> event.target: HTMLInputElement </param>
	//-----------------------------------------------------
	selectAllText(event: Event): void {
		const input = event.target as HTMLInputElement;
		input.select();
	}

	//-----------------------------------------------------
	// Summary
	// Hàm để xác nhận khi người dùng nhấn "Submit"
	// Summary
	//-----------------------------------------------------
	submitGuess() {
		const guessedWord = this.displayedWord.join('');
		if (guessedWord.toUpperCase() === this.targetWord.toUpperCase()) {
			this.nextWord();
		} else {
			this.attemptsLeft--;
			this.hasGuessedWrong = true;
			if (this.attemptsLeft == 0) {
				this.gameOver();
			}
			this.revealOneLetter();
		}
	}

	//-----------------------------------------------------
	// Summary
	// Gợi ý thêm một ký tự đúng trong từ cần đoán sau mỗi lần đoán sai.
	// Tìm ký tự đầu tiên trong `targetWord` mà người dùng chưa nhập đúng,
	// sau đó hiển thị ký tự đó ở đúng vị trí trong `displayedWord`.
	// Đồng thời đánh dấu vị trí đó trong `revealedIndices` để tránh gợi ý lại.
	// Summary
	//-----------------------------------------------------
	revealOneLetter(): void {
		for (let i = 0; i < this.targetWord.length; i++) {
			if (
				this.displayedWord[i] !== this.targetWord[i] &&
				!this.revealedIndices.has(i)
			) {
				this.displayedWord[i] = this.targetWord[i];
				this.revealedIndices.add(i);
				break;
			}
		}
	}

	gameOver() {
		this.showMenu = true;
		this.isGameStarted = false;
	}

	//-----------------------------------------------------
	// Summary
	// Bắt đầu game mới
	// Summary
	//-----------------------------------------------------
	startNewGame() {
		this.revealedIndices.clear();
		this.currentIndex = 0;
		this.loadWord();
		this.showMenu = false;
		this.isGameStarted = true;
		this.startTimer();
	}

	//-----------------------------------------------------
	// Summary
	// Hàm chạy khi nhần nút start
	// Summary
	//-----------------------------------------------------
	onStartClick() {
		this.showStartPrompt = true;
	}

	//-----------------------------------------------------
	// Summary
	// Tạm dừng game (tắt timer)
	// Summary
	//-----------------------------------------------------
	pauseGame() {
		clearInterval(this.intervalId);
	}

	//-----------------------------------------------------
	// Summary
	// Tiếp tục game
	// Summary
	//-----------------------------------------------------
	resumeGame() {
		this.startTimer();
	}

	handleStartConfirm(confirmed: boolean) {
		this.showStartPrompt = false;
		if (confirmed) {
			this.isGameStarted = true;
			this.timeLeft = this.DEFAUL_TIME;
			this.startNewGame();
		}
	}

	trackByIndex(index: number): number {
		return index;
	}
}

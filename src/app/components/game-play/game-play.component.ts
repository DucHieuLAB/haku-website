import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  imports: [ FormsModule, CommonModule ], 
  styleUrl: './game-play.component.scss'
})
export class GamePlayComponent  implements OnInit, AfterViewInit, OnDestroy{

  @ViewChildren('inputElement') inputElements!: QueryList<ElementRef>;

  // Init infor
  time : string = "3:00";
  numOfGet : string = "3";
  score : string = "2300";
  name : string = "Haku";
  class : string = "Class";
  
  char = ''; 

  // Word Hint
  hint : string = "Đây là một loại trái cây thường có màu vàng, dài, và được khỉ rất thích.";
 
  ngOnInit(): void {
  }
 
  ngAfterViewInit(): void {
  }
 
  ngOnDestroy(): void {
  }

 targetWord: string = 'hello';                              // Từ cần đoán
 displayedWord: string[] = ['_', '_', '_', '_', '_'];       // Giao diện ban đầu
 
 isGameOver: boolean = false;


  //-----------------------------------------------------
  // Summary
  // Hàm xử lý khi người dùng nhập ký tự
  // Summary
  // <param> index </param> 
  // <param> value </param> 
  //-----------------------------------------------------
  onInputChange(i: number, event: Event) {
    const inputElement = event.target as HTMLInputElement; // Chuyển kiểu EventTarget thành HTMLInputElement
    const value = inputElement.value; // Bây giờ có thể truy cập `value` an toàn

    // Kiểm tra xem giá trị nhập vào có hợp lệ không
    if (value.length <= 1) {
    this.displayedWord[i] = value; // Cập nhật giá trị trong mảng `displayedWord`

    // Chuyển focus sang input tiếp theo khi nhập đủ 1 ký tự
    if(value == undefined && value == ""){
      return;
    }
    console.log("value :" + value + "displayedWord: " + this.displayedWord);
    if (value.length === 1 && i < this.displayedWord.length - 1) {
      const nextInput = this.inputElements.toArray()[i + 1]?.nativeElement;
       if (nextInput) {
        nextInput.focus();
      }
      }
    }else{
      this.displayedWord[i] = "_";
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
    input.select(); // Chọn toàn bộ nội dung trong input
  }

  //-----------------------------------------------------
  // Summary
  // Hàm để xác nhận khi người dùng nhấn "Submit"
  // Summary
  // <param> index </param> 
  // <param> value </param> 
  //-----------------------------------------------------
    submitGuess() {
      const guessedWord = this.displayedWord.join('');
      if (guessedWord === this.targetWord) {
        this.isGameOver = true;
        alert('Congratulations! You guessed the word!');
      } else {
        alert('Try again!');
      }
    }
  }


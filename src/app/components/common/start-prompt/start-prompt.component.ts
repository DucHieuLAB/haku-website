import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-start-prompt',
  imports: [],
  templateUrl: './start-prompt.component.html',
  styleUrl: './start-prompt.component.scss'
})
export class StartPromptComponent {

  //-----------------------------------------------------
  // Summary
  // Gửi sự kiện khi người dùng chọn Yes hoặc No
  // Summary
  //-----------------------------------------------------
  @Output() onStartGame = new EventEmitter<boolean>();

  confirmStart(): void {
    this.onStartGame.emit(true);
  }

  cancelStart(): void {
    this.onStartGame.emit(false);
  }
}

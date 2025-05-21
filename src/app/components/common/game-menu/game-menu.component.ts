import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-menu',
  imports: [],
  templateUrl: './game-menu.component.html',
  styleUrl: './game-menu.component.scss'
})
export class GameMenuComponent {
  @Output() onStart = new EventEmitter<void>();
  @Output() onPause = new EventEmitter<void>();
  @Output() onResume = new EventEmitter<void>();

  isPaused = false;

  //-----------------------------------------------------
  // Summary
  // Hàm xử lý khi người dùng nhấn Start Game
  // Summary
  //-----------------------------------------------------
  startGame() {
    this.isPaused = false;
    this.onStart.emit();
  }

  //-----------------------------------------------------
  // Summary
  // Hàm xử lý Pause / Resume
  // Summary
  //-----------------------------------------------------
  togglePause() {
    this.isPaused = !this.isPaused;
    this.isPaused ? this.onPause.emit() : this.onResume.emit();
  }
}

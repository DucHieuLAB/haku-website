import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { GamePlayComponent } from './components/game-play/game-play.component';
import { CommonModule } from '@angular/common';
import { StartPromptComponent } from './components/common/start-prompt/start-prompt.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderComponent, GamePlayComponent, CommonModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
	constructor(private cdr: ChangeDetectorRef) {}

	showStartPrompt: boolean = false;
	isGameStarted: boolean = false;
	title = 'haku-website';
	isGameVisible: boolean = false;

	ngAfterViewInit(): void {
		const wrapper = document.querySelector('.wrapper-scroll');
		let isScrolling = false;

		if (wrapper) {
			wrapper.addEventListener('wheel', (event) => {
				if (isScrolling) return;

				isScrolling = true;
				const currentScroll = wrapper.scrollTop;
				const viewHeight = window.innerHeight;

				// Tìm index section hiện tại
				const currentIndex = Math.round(currentScroll / viewHeight);

				// Cuộn mượt đến section kế tiếp
				wrapper.scrollTo({
					behavior: 'smooth',
				});

				// Thời gian delay cho hiệu ứng mượt
				setTimeout(() => {
					isScrolling = false;
				}, 2000); // ← Điều chỉnh thời gian ở đây (ms)
			});
		}
	}
}

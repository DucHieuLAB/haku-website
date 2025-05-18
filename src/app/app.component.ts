import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { GamePlayComponent } from "./components/game-play/game-play.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, GamePlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements AfterViewInit{

  title = 'haku-website';

    
  ngAfterViewInit(): void {
    const wrapper = document.querySelector('.wrapper-scroll');
    const wheelEvent = event as WheelEvent; 
    let isScrolling = false;

    if (wrapper) {
      wrapper.addEventListener('wheel', (event) => {
        if (isScrolling) return;

        isScrolling = true;
        // const direction = wheelEvent.deltaY > 0 ? 1 : -1;
        const sections = Array.from(wrapper.querySelectorAll('.section'));
        const currentScroll = wrapper.scrollTop;
        const viewHeight = window.innerHeight;

        // Tìm index section hiện tại
        const currentIndex = Math.round(currentScroll / viewHeight);
        // let nextIndex = currentIndex + direction;

        // if (nextIndex < 0) nextIndex = 0;
        // if (nextIndex >= sections.length) nextIndex = sections.length - 1;

        // const targetScroll = nextIndex * viewHeight;

        // Cuộn mượt đến section kế tiếp
        wrapper.scrollTo({
          // top: targetScroll,
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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	imports: [CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	menuActive = false;
	menuOpen: boolean = false;

	toggleMenu() {
		this.menuOpen = !this.menuOpen;
		this.menuActive = !this.menuActive;
	}
}

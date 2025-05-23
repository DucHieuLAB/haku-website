import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Toast, ToasterService } from './toaster.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-toastr',
	imports: [NgClass],
	templateUrl: './toastr.component.html',
	styleUrl: './toastr.component.scss',
	animations: [
		trigger('toastAnimation', [
			transition(':enter', [
				style({ transform: 'translateY(100%)', opacity: 0 }),
				animate(
					'300ms ease-out',
					style({ transform: 'translateY(0)', opacity: 1 })
				),
			]),
			transition(':leave', [
				animate(
					'300ms ease-out',
					style({ transform: 'translateY(100%)', opacity: 0 })
				),
			]),
		]),
	],
})
export class ToastrComponent implements OnInit, OnDestroy {
	private toastService = inject(ToasterService);

	toasts: Toast[] = [];
	private subscription!: Subscription; // sửa Subscribable -> Subscription

	ngOnInit(): void {
		this.subscription = this.toastService.toasts$.subscribe(
			(toasts) => (this.toasts = toasts)
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	removeToast(id: number) {
		this.toastService.remove(id);
	}
}

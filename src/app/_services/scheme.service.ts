import { Injectable } from '@angular/core';

import { LocalStorageService } from './storage/local-storage';

export enum ColorScheme {
	LIGHT = 'light',
	DARK = 'dark',
}

const STORAGE_KEY = 'SCHEME';

@Injectable({providedIn: 'root'})
export class SchemeService {
	private prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	current: ColorScheme = ColorScheme.LIGHT;

	constructor(
		private storageService: LocalStorageService,
	) {
		this.init();
	}

	init() {
		const storageValue = this.getFromStorage();
		if (storageValue) {
			this.current = storageValue;
		} else if (this.prefersDark) {
			this.current = ColorScheme.DARK;
		} else {
			this.current = ColorScheme.LIGHT;
		}
		this.update();
	}

	switch(): void {
		if (this.current === ColorScheme.DARK) {
			this.current = ColorScheme.LIGHT;
		} else {
			this.current = ColorScheme.DARK;
		}
		this.update();
	}

	private getFromStorage(): ColorScheme | null {
		const storageValue = this.storageService.get<string>(STORAGE_KEY);
		if (storageValue && Object.values<string>(ColorScheme).includes(storageValue)) {
			return storageValue as ColorScheme;
		}
		return null
	}

	private update(): void {
		this.updateDocumentScheme();
		this.updateStorage();
	}

	private updateDocumentScheme(): void {
		if (this.current === ColorScheme.DARK) {
			document.body.classList.add(ColorScheme.DARK);
		} else {
			document.body.classList.remove(ColorScheme.DARK);
		}
	}

	private updateStorage(): void {
		if ((this.prefersDark && this.current !== ColorScheme.DARK)
			|| (!this.prefersDark && this.current !== ColorScheme.LIGHT)
		) {
			this.storageService.set(STORAGE_KEY, this.current);
		} else {
			this.storageService.remove(STORAGE_KEY);
		}
	}
}
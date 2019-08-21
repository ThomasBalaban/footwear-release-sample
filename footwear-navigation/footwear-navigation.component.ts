import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FootwearConfigService } from '@app/common/service/footwear-config.service';

@Component({
	selector: 'app-footwear-navigation',
	templateUrl: './footwear-navigation.component.html',
	styleUrls: ['./footwear-navigation.component.scss']
})
export class FootwearNavigationComponent implements OnInit {
	@Input() currentState;
	@Output() currentOption = new EventEmitter<boolean>();
	@Output() currentCategoryFilter = new EventEmitter<string>();
	@Output() currentBrandFilter = new EventEmitter<string>();

	public footwearCategories = [];
	public footwearBrands = [];
	public footwearGenders = [];
	public selectedCategory: string;
	public selectedBrand: string;
	public selectedGender: string;

	activatedUpcoming: boolean;
	activatedLaunched: boolean;

	constructor(
		private footwearFilters: FootwearConfigService
	) {
	}

	ngOnInit() {
		this.selectedCategory = 'defaultCategory';
		this.currentCategoryFilter.emit('defaultCategory');
		this.footwearCategories = this.footwearFilters.brandCategory;

		this.selectedBrand = 'defaultBrand';
		this.currentBrandFilter.emit('defaultBrand');
		this.footwearBrands = this.footwearFilters.brandImages;

		this.selectedGender = 'all';
		this.footwearGenders = this.footwearFilters.genderList;

		if ( this.currentState === 'upcoming' || this.currentState === '' || this.currentState === undefined ) {
			this.activatedUpcoming = true;
			this.activatedLaunched = false;
		} else if ( this.currentState === 'launched' ) {
			this.activatedLaunched = true;
			this.activatedUpcoming = false;
		}
	}

	onChangeCategory(event): void {
		this.currentCategoryFilter.emit(event.value);
	}

	onChangeBrand(event): void {
		this.currentBrandFilter.emit(event.value);
	}

	togglePageToUpcoming() {
		this.currentOption.emit(true);
		this.activatedUpcoming = true;
		this.activatedLaunched = false;
	}

	togglePageToLaunched() {
		this.currentOption.emit(false);
		this.activatedLaunched = true;
		this.activatedUpcoming = false;
	}

}

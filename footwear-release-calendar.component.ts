import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-footwear-release-calendar',
	templateUrl: './footwear-release-calendar.component.html',
	styleUrls: ['./footwear-release-calendar.component.scss']
})
export class FootwearReleaseCalendarComponent implements OnInit {
	public currentOption: boolean;
	public currentBrandFilter: string;
	public currentCategoryFilter: string;
	public option: string;
	public categoryId = '249621';

	constructor( private activatedRoute: ActivatedRoute ) { }

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe( (params) => {
			this.option = params['status'];
			if ( this.option === 'upcoming' || this.option === '' || this.option === undefined ) {
				this.currentOption = true;
			} else if ( this.option === 'launched' ) {
				this.currentOption = false;
			}
		});
	}

	changeOption(currentOption: boolean) {
		this.currentOption = currentOption;
	}

	updateCategoryFilter(currentCategoryFilter: string) {
		this.currentCategoryFilter = currentCategoryFilter;
	}

	updateBrandFilter(currentBrandFilter: string) {
		this.currentBrandFilter = currentBrandFilter;
	}
}

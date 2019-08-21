import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FootwearItem } from '@app/common/model/footwear-item.model';
import { FootwearConfigService } from '@app/common/service/footwear-config.service';
import { UtilityService } from '@app/common/service/utility.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-footwear-shoe-list',
	templateUrl: './footwear-shoe-list.component.html',
	styleUrls: ['./footwear-shoe-list.component.scss']
})

export class FootwearShoeListComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
	@Input() currentOption;
	@Input() currentCategoryFilter;
	@Input() currentBrandFilter;

	shoeContainerClass: string;
	initialPageSetup = false;
	shoesExist = true;

	public footwearItem: FootwearItem[];
	public upcomingShoes: FootwearItem[] = [];
	public launchedShoes: FootwearItem[] = [];
	public scene7service: any;
	private footwearDataSubscription: Subscription;

	public monthsForDisp = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	constructor(
		private footwearRequest: FootwearConfigService,
		private utilityService: UtilityService
	) {
	}

	ngOnInit() {
		this.changeContainerClass();
		this.scene7service = this.utilityService.scene7Url;
		this.footwearDataSubscription = this.footwearRequest.getData$()
				.subscribe((res: FootwearItem[]) => {
					this.footwearItem = res;
					this.funnelShoeData();
					this.sortUpcoming();
					this.sortLaunched();
				}
			);
	}

	filterShoes(shoe: any) {

		if ( this.currentCategoryFilter !== 'defaultCategory' && this.currentBrandFilter !== 'defaultBrand' ) {
			return shoe.category === this.currentCategoryFilter && shoe.brand === this.currentBrandFilter;
		}

		if ( this.currentCategoryFilter !== 'defaultCategory' ) {
			return shoe.category === this.currentCategoryFilter;
		}

		if ( this.currentBrandFilter !== 'defaultBrand') {
			return shoe.brand === this.currentBrandFilter;
		}

		this.initialPageSetup = true;
		return true;
	}

	ngOnChanges(changes: SimpleChanges) {
		this.changeContainerClass();
	}

	ngDoCheck() {
		this.checkIfNoResults();
	}

	ngOnDestroy() {
		if (this.footwearDataSubscription) {
			this.footwearDataSubscription.unsubscribe();
		}
	}

	checkIfNoResults() {
		if ( this.initialPageSetup ) {
			if ( document.querySelectorAll('.shoe-block').length > 0	) {
				this.shoesExist = true;
			} else {
				this.shoesExist = false;
			}
		}
	}

	changeContainerClass() {
		if ( this.currentOption ) {
			this.shoeContainerClass = 'sortedUpcoming';
		} else {
			this.shoeContainerClass = 'sortedLaunched';
		}

		return this.shoeContainerClass;
	}

	getBrandImage(brandToShow) {
		const brandimgobj = this.footwearRequest.brandImages.find((obj) => obj.brand === brandToShow);
		return brandimgobj.image;
	}

	getBrandPriority(brand) {
		const brandobj = this.footwearRequest.brandImages.find((obj) => obj.brand === brand);
		return brandobj.priority;
	}

	getCategoryPriority(category) {
		const catobj = this.footwearRequest.brandCategory.find((obj) => obj.category === category);
		return catobj.priority;
	}

	sortUpcoming() {
		this.upcomingShoes.sort((a, b) => {
			const a_events = a.events;
			const b_events = b.events;
			const a_launchEvent = a_events.find((event) => event.eventTypeId === 1);
			const a_date = new Date(a_launchEvent.startDate);
			const a_sortDate = new Date(a_date.getFullYear(), a_date.getMonth(), a_date.getDate());
			const b_launchEvent = b_events.find((event) => event.eventTypeId === 1);
			const b_date = new Date(b_launchEvent.startDate);
			const b_sortDate = new Date(b_date.getFullYear(), b_date.getMonth(), b_date.getDate());
			const a_priority = this.getBrandPriority(a.brand);
			const b_priority = this.getBrandPriority(b.brand);
			const a_category = this.getCategoryPriority(a.category);
			const b_category = this.getCategoryPriority(b.category);

			// Sort by date
			// If the first item has a higher number, move it down
			// If the first item has a lower number, move it up
			if (a_sortDate > b_sortDate) {
				return 1;
			}

			if (a_sortDate < b_sortDate) {
				return -1;
			}

			// If the date is the same between both items, sort by category
			// If the first item comes first in the alphabet, move it up
			// Otherwise move it down
			if (a_category > b_category) {
				return 1;
			}

			if (a_category < b_category) {
				return -1;
			}

			// If the category is the same between both items, sort by brand priority
			// If the first item comes first in the alphabet, move it up
			// Otherwise move it down
			if (a_priority > b_priority) {
				return 1;
			}

			if (a_priority < b_priority) {
				return -1;
			}
		});

		for (const item of this.upcomingShoes) {
			const itemDateObj = item.events.find( (event) => event.eventTypeId === 1);
			const itemDate = new Date(itemDateObj.startDate);
			const launchDay = itemDate.getDate();
			const launchMonth = this.monthsForDisp[itemDate.getMonth()];
			const comingSoon = 'Coming Soon';
			const comingOnDate = `Coming ${launchMonth} ${launchDay}`;
			item.unavailable = item.unavailable ? comingSoon : comingOnDate;
			item.imageSource = item.imageSource ? item.imageSource : this.getBrandImage(item.brand);
			item.displayDate = comingOnDate;
		}
	}

	sortLaunched() {
		this.launchedShoes.sort((a, b) => {
			const a_events = a.events;
			const b_events = b.events;
			const a_launchEvent = a_events.find((event) => event.eventTypeId === 1);
			const a_date = new Date(a_launchEvent.startDate);
			const a_sortDate = new Date(a_date.getFullYear(), a_date.getMonth(), a_date.getDate());
			const b_launchEvent = b_events.find((event) => event.eventTypeId === 1);
			const b_date = new Date(b_launchEvent.startDate);
			const b_sortDate = new Date(b_date.getFullYear(), b_date.getMonth(), b_date.getDate());
			const a_priority = this.getBrandPriority(a.brand);
			const b_priority = this.getBrandPriority(b.brand);
			const a_category = this.getCategoryPriority(a.category);
			const b_category = this.getCategoryPriority(b.category);

			// Sort by date
			// If the first item has a higher number, move it down
			// If the first item has a lower number, move it up
			if (a_sortDate > b_sortDate) {
				return -1;
			}
			if (a_sortDate < b_sortDate) {
				return 1;
			}
			// If the date is the same between both items, sort by category
			// If the first item comes first in the alphabet, move it up
			// Otherwise move it down
			if (a_category > b_category) {
				return 1;
			}
			if (a_category < b_category) {
				return -1;
			}
			// If the category is the same between both items, sort by category
			// If the first item comes first in the alphabet, move it up
			// Otherwise move it down
			if (a_priority > b_priority) {
				return 1;
			}
			if (a_priority < b_priority) {
				return -1;
			}
		});
		for (const item of this.launchedShoes) {
			const events = item.events;
			const itemDateObj = events.find( (event) => event.eventTypeId === 1);
			const itemDate = new Date(itemDateObj.startDate);
			const launchDay = itemDate.getDate();
			const launchMonth = this.monthsForDisp[itemDate.getMonth()];
			const comingOnDate = `${launchMonth} ${launchDay}`;
			item.cta = item.isSoldOut ? 'Sold Out' : item.isCollection ? 'View Collection' : 'Shop Now';
			item.cssClass = '__' + item.cta.replace(' ', '').toLowerCase();
			item.imageSource = item.imageSource ? item.imageSource : this.getBrandImage(item.brand);
			item.displayDate = comingOnDate;
		}
	}

	dateToUTC(date) {
		return date.getTime();
	}

	isBetween(now, start, end) {
		if (now > start && now < end) {
			return true;
		} else {
			return false;
		}
	}

	funnelShoeData() {
		this.footwearItem.forEach((item) => {
			if (item.events.length > 1) {
				const launchEvent = item.events.find((event) => event.eventTypeId === 1);
				const teaserEvent = item.events.find((event) => event.eventTypeId === 2);
				const launchDate = this.dateToUTC(new Date(launchEvent.startDate));
				const teaserDate = this.dateToUTC(new Date(teaserEvent.startDate));
				if (this.isBetween(this.dateToUTC(new Date()), teaserDate, launchDate)) {
					this.upcomingShoes.push(item);
				} else {
					if (item.unavailable) {
						this.upcomingShoes.push(item);
					} else {
						this.launchedShoes.push(item);
					}
				}
			} else {
				if (item.unavailable) {
					this.upcomingShoes.push(item);
				} else {
					this.launchedShoes.push(item);
				}
			}
		});
	}
}

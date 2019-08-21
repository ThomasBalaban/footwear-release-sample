import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootwearNavigationComponent } from './footwear-navigation.component';

describe('FootwearNavigationComponent', () => {
	let component: FootwearNavigationComponent;
	let fixture: ComponentFixture<FootwearNavigationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FootwearNavigationComponent ]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FootwearNavigationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

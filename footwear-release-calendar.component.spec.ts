import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { FootwearConfigService } from '@app/common/service/footwear-config.service';
import { UtilityService } from '@app/common/service/utility.service';
import { FootwearReleaseCalendarComponent } from './footwear-release-calendar.component';

describe('FootwearReleaseCalendarComponent', () => {
	let component: FootwearReleaseCalendarComponent;
	let fixture: ComponentFixture<FootwearReleaseCalendarComponent>;

	beforeEach(async(() => {
	TestBed.configureTestingModule({
		imports: [
			HttpClientTestingModule
		],
		declarations: [
			FootwearReleaseCalendarComponent
		],
		providers: [
			{
				provide: ActivatedRoute, useValue: {
					snapshot: {
						queryParams: {
							subscribe: (fn: (value: Params) => void) => fn({
								previewDate: '2018/01/08'
							})
						}
					}
				}
			},
			FootwearConfigService,
			TransferState,
			UtilityService
		],
		schemas: [
			NO_ERRORS_SCHEMA
		]
	})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FootwearReleaseCalendarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	xit('should create', () => {
		expect(component).toBeTruthy();
	});
});

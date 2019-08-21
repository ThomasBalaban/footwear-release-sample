import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { UtilityService } from '@app/common/service/utility.service';
import { WINDOW_PROVIDERS } from '@app/common/service/window.service';
import { FootwearConfigService } from '../../../../../../common/service/footwear-config.service';
import { FootwearShoeListComponent } from './footwear-shoe-list.component';

describe('FootwearShoeListComponent', () => {
	let component: FootwearShoeListComponent;
	let fixture: ComponentFixture<FootwearShoeListComponent>;

	beforeEach(async(() => {
	TestBed.configureTestingModule({
		imports: [
			CommonModule,
			HttpClientTestingModule
		],
		declarations: [ FootwearShoeListComponent ],
		providers: [
			UtilityService,
			FootwearConfigService,
			WINDOW_PROVIDERS,
			TransferState
		],
		schemas: [
			NO_ERRORS_SCHEMA
		]
	})
	.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FootwearShoeListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

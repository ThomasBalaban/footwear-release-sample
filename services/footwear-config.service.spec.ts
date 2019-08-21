import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { Logger } from '@app/common/log/logger.service';
import { LoggerMock } from '@mocks/mocks';

import { HttpService } from '@common/service/http.service';
import { FootwearConfigService } from './footwear-config.service';
import { WINDOW_PROVIDERS } from './window.service';

describe('FootwearConfigService', () => {
	let injector: TestBed;
	let service: FootwearConfigService;
	let state: TransferState;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			],
			providers: [
				{
					provide: Logger,
					useClass: LoggerMock
				},
				TransferState,
				FootwearConfigService,
				HttpService,
				WINDOW_PROVIDERS
			],
			schemas: [
				NO_ERRORS_SCHEMA
			]
		});

		injector = getTestBed();
		service = injector.get(FootwearConfigService);
		state = injector.get(TransferState);
		httpMock = injector.get(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

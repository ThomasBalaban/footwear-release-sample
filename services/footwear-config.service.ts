import { isPlatformBrowser } from '@angular/common';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable()
export class FootwearConfigService {
	readonly FOOTWEAR_URL: string;

	public genderList = [
		{
			gender: 'men',
			priority: 1,
			name: 'Men\'s'
		},
		{
			gender: 'women',
			priority: 2,
			name: 'Women\'s'
		},
		{
			gender: 'youth',
			priority: 3,
			name: 'Youth'
		}
	];

	public brandImages = [
		{
			brand: 'Jordan',
			image: 'Jordan_logo',
			priority: 1
		},
		{
			brand: 'Nike',
			image: 'nike_logo',
			priority: 2
		},
		{
			brand: 'Adidas',
			image: 'adidas_logo-1',
			priority: 3
		},
		{
			brand: 'Adidas Originals',
			image: 'adidas_orignals_logo',
			priority: 4
		},
		{
			brand: 'Under Armour',
			image: 'UA_logo',
			priority: 5
		},
		{
			brand: 'Brooks',
			image: 'Brooks_logo',
			priority: 6
		},
		{
			brand: 'ASICS',
			image: 'ASICS_Box',
			priority: 7
		},
		{
			brand: 'Puma',
			image: 'Puma_Box',
			priority: 8
		},
		{
			brand: 'Vans',
			image: 'Vans_Box',
			priority: 9
		},
		{
			brand: 'New Balance',
			image: 'newbalance_box',
			priority: 10
		},
		{
			brand: 'Reebok',
			image: 'Reebok_3',
			priority: 11
		},
		{
			brand: 'Columbia',
			image: 'FTW_3399_FootwearReleaseCalendar_ColumbiaBrandBox',
			priority: 12
		}
	];

	public brandCategory = [
		{
			category: 'basketball',
			display: 'Basketball',
			priority: 3
		},
		{
			category: 'lifestyle',
			display: 'Lifestyle',
			priority: 2
		},
		{
			category: 'running',
			display: 'Running',
			priority: 7
		},
		{
			category: 'training',
			display: 'Training',
			priority: 1
		},
		{
			category: 'soccer',
			display: 'Soccer',
			priority: 5
		},
		{
			category: 'football',
			display: 'Football',
			priority: 6
		},
		{
			category: 'baseball',
			display: 'Baseball',
			priority: 7
		}
	];

	constructor(
		@Inject(PLATFORM_ID) protected platformId: any,
		private http: HttpClient,
		private state: TransferState
	) {
		// Check to see if browser or server for normal homR calls
		if (isPlatformBrowser(this.platformId)) {
			// Set the ESB proxy
			this.FOOTWEAR_URL = environment.api.footwearCalendar.gatewayUrlProxy.browser;
		} else {
			// Set the ESB proxy
			this.FOOTWEAR_URL = environment.api.footwearCalendar.gatewayUrlProxy.server;
		}
	}

	public static handleError(error: HttpErrorResponse | any) {
		// return an ErrorObservable
		return new ErrorObservable(error);
	}

	getFootwearData$(retries = 0): Observable<any> {
		const ELEMENT_KEY = makeStateKey(`footwearreleasedata`);
		const element = this.state.get(ELEMENT_KEY, null);

		if (!element) {
			const httpHeaders = {
				'X-TIMEOUT': '10000',
				'Content-Type': 'application/json'
			};

			const httpOptions = {
				headers: new HttpHeaders(httpHeaders)
			};

			return this.http.get(`${this.FOOTWEAR_URL}item`, httpOptions).pipe(
				map((response: any) => {
					this.state.set(ELEMENT_KEY, response);
					return response;
				}),
				retry(retries),
				catchError(FootwearConfigService.handleError)
			);
		}

		return Observable.create((observer) => {
			observer.next(element);
			observer.complete();
		});
	}

	/**
	 * @description
	 * The main call to retrieve page data from homR
	 *
	 * @param pageName
	 * @param pageType
	 * @param retries
	 * @returns {homR page object}
	 */
	public getData$(retries?: number) {
		return this.getFootwearData$(retries);
	}
}

import { CommonModule } from '@angular/common';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonCoreModule } from '@app/common/common-core.module';
import { FootwearConfigService } from '@app/common/service/footwear-config.service';
import { UtilityService } from '@app/common/service/utility.service';
import { DynamicTemplateLoaderModule } from '../../dynamic-template-loader/dynamic-template-loader.module';
import { FootwearNavigationComponent } from './footwear-navigation/footwear-navigation.component';
import { FootwearReleaseCalendarComponent } from './footwear-release-calendar.component';
import { FootwearShoeListComponent } from './footwear-shoe-list/footwear-shoe-list.component';

@NgModule({
	imports: [
		CommonModule,
		CommonCoreModule,
		DynamicTemplateLoaderModule.forChild(FootwearReleaseCalendarComponent),
		FormsModule,
		MatSelectModule
	],
	declarations: [
		FootwearReleaseCalendarComponent,
		FootwearNavigationComponent,
		FootwearShoeListComponent
	],
	providers: [
		FootwearConfigService,
		UtilityService,
		{ provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
	],
	exports: [
		FootwearReleaseCalendarComponent,
		FootwearNavigationComponent,
		FootwearShoeListComponent
	]
})
export class FootwearReleaseCalendarModule { }

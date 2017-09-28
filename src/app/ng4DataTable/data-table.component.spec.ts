import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
	let fixture: ComponentFixture<DataTableComponent>;
	let component: DataTableComponent;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DataTableComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DataTableComponent);
		component = fixture.componentInstance;
	});

	it('should load without errors', () => {
		fixture.detectChanges();
		expect(component).toBeDefined();
	});
});

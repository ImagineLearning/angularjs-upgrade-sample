import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng4DataTableComponent } from './ng4-data-table.component';

describe('Ng4DataTableComponent', () => {
  let component: Ng4DataTableComponent;
  let fixture: ComponentFixture<Ng4DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng4DataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng4DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

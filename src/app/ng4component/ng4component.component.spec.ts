import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng4componentComponent } from './ng4component.component';

describe('Ng4componentComponent', () => {
  let component: Ng4componentComponent;
  let fixture: ComponentFixture<Ng4componentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng4componentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng4componentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

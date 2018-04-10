import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInnerLayoutComponent } from './dashboard-inner-layout.component';

describe('DashboardInnerLayoutComponent', () => {
  let component: DashboardInnerLayoutComponent;
  let fixture: ComponentFixture<DashboardInnerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInnerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

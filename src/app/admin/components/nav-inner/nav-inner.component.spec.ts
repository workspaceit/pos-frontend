import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavInnerComponent } from './nav-inner.component';

describe('NavInnerComponent', () => {
  let component: NavInnerComponent;
  let fixture: ComponentFixture<NavInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerInfoComponent } from './wholesaler-info.component';

describe('WholesalerInfoComponent', () => {
  let component: WholesalerInfoComponent;
  let fixture: ComponentFixture<WholesalerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholesalerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

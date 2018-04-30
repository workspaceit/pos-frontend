import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerUpdateComponent } from './wholesaler-update.component';

describe('WholesalerUpdateComponent', () => {
  let component: WholesalerUpdateComponent;
  let fixture: ComponentFixture<WholesalerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholesalerUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

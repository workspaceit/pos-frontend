import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellToWholesalerComponent } from './sell-to-wholesaler.component';

describe('SellToWholesalerComponent', () => {
  let component: SellToWholesalerComponent;
  let fixture: ComponentFixture<SellToWholesalerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellToWholesalerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellToWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

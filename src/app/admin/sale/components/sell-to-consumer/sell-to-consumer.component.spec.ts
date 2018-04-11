import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellToConsumerComponent } from './sell-to-consumer.component';

describe('SellToConsumerComponent', () => {
  let component: SellToConsumerComponent;
  let fixture: ComponentFixture<SellToConsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellToConsumerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellToConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerListComponent } from './wholesaler-list.component';

describe('WholesalerListComponent', () => {
  let component: WholesalerListComponent;
  let fixture: ComponentFixture<WholesalerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholesalerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

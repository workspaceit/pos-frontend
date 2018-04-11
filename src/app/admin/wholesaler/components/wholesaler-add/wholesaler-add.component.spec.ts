import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerAddComponent } from './wholesaler-add.component';

describe('WholesalerAddComponent', () => {
  let component: WholesalerAddComponent;
  let fixture: ComponentFixture<WholesalerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholesalerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

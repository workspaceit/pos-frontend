import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAutoCompleteComponent } from './product-auto-complete.component';

describe('ProductAutoCompleteComponent', () => {
  let component: ProductAutoCompleteComponent;
  let fixture: ComponentFixture<ProductAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

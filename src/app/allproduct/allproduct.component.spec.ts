import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllproductComponent } from './allproduct.component';

describe('AllproductComponent', () => {
  let component: AllproductComponent;
  let fixture: ComponentFixture<AllproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllproductComponent]
    });
    fixture = TestBed.createComponent(AllproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

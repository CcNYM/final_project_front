import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCompleteComponent } from './sell-complete.component';

describe('SellCompleteComponent', () => {
  let component: SellCompleteComponent;
  let fixture: ComponentFixture<SellCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellCompleteComponent]
    });
    fixture = TestBed.createComponent(SellCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

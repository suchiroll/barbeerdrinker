import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgPriceComponent } from './AvgPrice.component';

describe('AvgPriceComponent', () => {
  let component: AvgPriceComponent;
  let fixture: ComponentFixture<AvgPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvgPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

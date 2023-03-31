import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidthSliderComponent } from './width-slider.component';

describe('WidthSliderComponent', () => {
  let component: WidthSliderComponent;
  let fixture: ComponentFixture<WidthSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidthSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidthSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

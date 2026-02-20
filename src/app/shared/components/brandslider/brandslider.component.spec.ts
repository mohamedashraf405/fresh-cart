import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsliderComponent } from './brandslider.component';

describe('BrandsliderComponent', () => {
  let component: BrandsliderComponent;
  let fixture: ComponentFixture<BrandsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsliderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeatureCardComponent } from './home-feature-card.component';

describe('HomeFeatureCardComponent', () => {
  let component: HomeFeatureCardComponent;
  let fixture: ComponentFixture<HomeFeatureCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFeatureCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeatureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkitsComponent } from './skits.component';

describe('SkitsComponent', () => {
  let component: SkitsComponent;
  let fixture: ComponentFixture<SkitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSkitComponent } from './new-skit.component';

describe('NewSkitComponent', () => {
  let component: NewSkitComponent;
  let fixture: ComponentFixture<NewSkitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSkitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

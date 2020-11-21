import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmItemComponent } from './alarm-item.component';

describe('AlarmItemComponent', () => {
  let component: AlarmItemComponent;
  let fixture: ComponentFixture<AlarmItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

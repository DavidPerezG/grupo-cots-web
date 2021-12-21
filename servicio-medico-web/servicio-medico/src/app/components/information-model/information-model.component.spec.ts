import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationModelComponent } from './information-model.component';

describe('InformationModelComponent', () => {
  let component: InformationModelComponent;
  let fixture: ComponentFixture<InformationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

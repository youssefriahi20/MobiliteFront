import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePubPopUpComponent } from './create-pub-pop-up.component';

describe('CreatePubPopUpComponent', () => {
  let component: CreatePubPopUpComponent;
  let fixture: ComponentFixture<CreatePubPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePubPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePubPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

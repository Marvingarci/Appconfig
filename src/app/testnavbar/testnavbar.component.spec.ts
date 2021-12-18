import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestnavbarComponent } from './testnavbar.component';

describe('TestnavbarComponent', () => {
  let component: TestnavbarComponent;
  let fixture: ComponentFixture<TestnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestnavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

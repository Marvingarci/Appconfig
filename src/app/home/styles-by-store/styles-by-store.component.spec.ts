import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesByStoreComponent } from './styles-by-store.component';

describe('StylesByStoreComponent', () => {
  let component: StylesByStoreComponent;
  let fixture: ComponentFixture<StylesByStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylesByStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesByStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsDetailsComponent } from './lists-details.component';

describe('ListsDetailsComponent', () => {
  let component: ListsDetailsComponent;
  let fixture: ComponentFixture<ListsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

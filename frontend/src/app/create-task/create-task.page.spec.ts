import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskPage } from './create-task.page';

describe('CreateTaskComponent', () => {
  let component: CreateTaskPage;
  let fixture: ComponentFixture<CreateTaskPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaskPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

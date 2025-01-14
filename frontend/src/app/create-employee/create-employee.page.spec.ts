import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeePage } from './create-employee.page';

describe('CreateEmployeePage', () => {
  let component: CreateEmployeePage;
  let fixture: ComponentFixture<CreateEmployeePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmployeePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

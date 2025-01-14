import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentPage } from './create-department.page';

describe('CreateDepartmentPage', () => {
  let component: CreateDepartmentPage;
  let fixture: ComponentFixture<CreateDepartmentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDepartmentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDepartmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

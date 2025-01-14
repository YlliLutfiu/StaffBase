import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalaryPage } from './create-salary.page';

describe('CreateSalaryPage', () => {
  let component: CreateSalaryPage;
  let fixture: ComponentFixture<CreateSalaryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSalaryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSalaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

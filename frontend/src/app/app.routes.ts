import { Routes } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page';
import { EmployeePage } from './employee/employee.page';
import { SidebarPage } from './sidebar/sidebar.page'
import { NavbarPage } from './navbar/navbar.page';
import { DepartmentPage } from './department/department.page';
import { CompanyPage } from './company/company.page';
import { TasksPage } from './tasks/tasks.page';
import { SalaryPage } from './salary/salary.page';
import { CreateEmployeePage } from './create-employee/create-employee.page';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPage },
    { path: 'employee', component: EmployeePage },
    { path: 'sidebar', component: SidebarPage },
    { path: 'navbar', component: NavbarPage },
    { path: 'department', component: DepartmentPage },
    { path: 'company', component: CompanyPage },
    { path: 'tasks', component: TasksPage },
    { path: 'salary', component: SalaryPage },
    { path: 'create-employee', component: CreateEmployeePage },
    { path: 'create-employee/:employeeId', component: CreateEmployeePage },
];

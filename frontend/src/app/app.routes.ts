import { Routes } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page';
import { EmployeePage } from './employee/employee.page';
import { SidebarPage } from './sidebar/sidebar.page'
import { NavbarPage } from './navbar/navbar.page';
import { DepartmentPage } from './department/department.page';
import { CompanyPage } from './company/company.page';
import { TasksPage } from './tasks/tasks.page';
import { SalaryPage } from './salary/salary.page';

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
];

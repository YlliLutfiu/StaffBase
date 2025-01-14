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
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CreateDepartmentPage } from './create-department/create-department.page';
import { CreateTaskPage } from './create-task/create-task.page';
import { CreateSalaryPage } from './create-salary/create-salary.page';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPage, canActivate:[AuthGuard] },
    { path: 'employee', component: EmployeePage, canActivate:[AuthGuard] },
    { path: 'sidebar', component: SidebarPage, canActivate:[AuthGuard] },
    { path: 'navbar', component: NavbarPage, canActivate:[AuthGuard] },
    { path: 'department', component: DepartmentPage, canActivate:[AuthGuard] },
    { path: 'company', component: CompanyPage, canActivate:[AuthGuard] },
    { path: 'tasks', component: TasksPage, canActivate:[AuthGuard] },
    { path: 'salary', component: SalaryPage, canActivate:[AuthGuard] },
    { path: 'create-employee', component: CreateEmployeePage, canActivate:[AuthGuard] },
    { path: 'create-employee/:employeeId', component: CreateEmployeePage, canActivate:[AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create-department', component: CreateDepartmentPage, canActivate:[AuthGuard] },
    { path: 'create-department/:departmentId', component: CreateDepartmentPage, canActivate:[AuthGuard] },
    { path: 'create-task', component: CreateTaskPage, canActivate:[AuthGuard] },
    { path: 'create-task/:taskId', component: CreateTaskPage, canActivate:[AuthGuard] },
    { path: 'create-salary', component: CreateSalaryPage, canActivate:[AuthGuard] },
    { path: 'create-salary/:salaryId', component: CreateSalaryPage, canActivate:[AuthGuard] },
];

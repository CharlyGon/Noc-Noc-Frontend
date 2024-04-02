import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import DashboardComponent from '../components/DashboardComponent.vue';
import NewAccountComponent from '../components/NewAccountFormComponent.vue';
import ForgotPasswordComponent from '../components/ForgotPasswordComponent.vue';
import ResetPasswordComponent from '../components/ResetPasswordComponent.vue';
import ChangePasswordComponent from '../components/ChangePasswordComponent.vue';
import TasksListComponent from '../components/TasksListComponent.vue';
import NewTaskFormComponent from '../components/NewTaskFormComponent.vue';


const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginComponent
  }, {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPasswordComponent
  }, {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: ResetPasswordComponent,
    props: route => ({
      token: route.query.token,
      email: route.query.email
    })
  }, {
    path: '/changePassword',
    name: 'ChangePassword',
    component: ChangePasswordComponent,
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    children: [//agrgar al padrea a la rutas
      {
        path: '/newAccount',
        name: 'NewAccount',
        component: NewAccountComponent
      }, {
        path: '/tasksList',
        name: 'TasksList',
        component: TasksListComponent
      },
      {
        path: '/create-task',
        name: 'NewTaskForm',
        component: NewTaskFormComponent
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
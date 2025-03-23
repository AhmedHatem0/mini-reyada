import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CreateReyadaRequestComponent } from './components/create-reyada-request/create-reyada-request.component';
import { ListReyadaRequestComponent } from './components/list-reyada-request/list-reyada-request.component';
import { ReyadaRequestDetailsComponent } from './components/reyada-request-details/reyada-request-details.component';
import { AuthGuard } from './services/auth-svc/auth.guard';

export const routes: Routes = [
    {
        path:'',
        component:ListReyadaRequestComponent,
        canActivate: [AuthGuard]
    }
    ,{
        path:"auth",
        component: AuthComponent
    },
    {
        path:"create-request",
        component: CreateReyadaRequestComponent,
        canActivate: [AuthGuard]

    },
    {
        path:"details",
        component:ReyadaRequestDetailsComponent,
        canActivate: [AuthGuard]
    }
];

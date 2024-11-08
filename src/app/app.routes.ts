import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { routes as userRoutes} from "./users/users.routes";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolvetitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router)
    const shouldGetAccess = Math.random();
    if(shouldGetAccess < 0.5) {
        return true;
    } return new RedirectCommand(router.parseUrl('/unauthorized'));

}

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title: 'No task selected'
    },
    {
        path: 'users/:userId',
         component: UserTasksComponent,
        children: userRoutes,
        //canMatch:[dummyCanMatch],
        data: {
            message: 'hallo'
        },
        resolve: {
            userName: resolveUserName
        },
        title:  resolvetitle,
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];

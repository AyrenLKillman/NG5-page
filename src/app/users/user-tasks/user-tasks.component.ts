import { Component, input, inject} from '@angular/core';

import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent{

  userName = input.required<string>();
  message = input.required<string>();
  private activatedRoute = inject(ActivatedRoute)
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: data => {
  //       console.log(data)
  //     }
  //   })
  // }

}


export const resolveUserName: ResolveFn<string> =
 (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find(u => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
}

export const resolvetitle: ResolveFn<string> = 
(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
return resolveUserName(activatedRoute, routerState) + '\'s Tasks'
}
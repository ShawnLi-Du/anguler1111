import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  user: User;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user = new User();
  }
  onSubmit() {
    this.userService.save(this.user).subscribe(() => this.gotoUserList());
  }
  gotoUserList() {
    this.router.navigate(['/users']);
  }
}

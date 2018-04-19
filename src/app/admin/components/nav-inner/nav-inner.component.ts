import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-inner',
  templateUrl: './nav-inner.component.html',
  styleUrls: ['./nav-inner.component.css']
})
export class NavInnerComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.removeLocalData();
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private jwtService:JwtService,
    private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.jwtService.destroyUserDetails();
    this.router.navigate(['']);
  }

}

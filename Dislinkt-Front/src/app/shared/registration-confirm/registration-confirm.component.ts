import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.scss']
})
export class RegistrationConfirmComponent implements OnInit {
  id: string = '';
  sub: any;
  constructor(
    private authService: AuthenticationService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  approveAccount() {
    this.authService.approve(this.id).subscribe(data => {
      this.router.navigate(['/sign-in']);  

    }, error => {
      alert('Error! Try again!')
    })
  }

}

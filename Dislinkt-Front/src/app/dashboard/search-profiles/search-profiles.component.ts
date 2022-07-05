import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Connection } from 'src/app/core/models/connection.model';
import { ChatService } from 'src/app/core/services/chat.service';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { PublicProfilesService } from 'src/app/core/services/public-profiles.service';

@Component({
  selector: 'app-search-profiles',
  templateUrl: './search-profiles.component.html',
  styleUrls: ['./search-profiles.component.scss']
})
export class SearchProfilesComponent implements OnInit {
  experience = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  profiles: any[] = [];
  resultProfile: any;
  searchForm: FormGroup;
  experienceList: string[] = ['No experience', 'One year', 'Two year', 'More than 2 years'];
  industryList: string[] = ['IT', 'Doctor', 'Economist', 'Architect', 'Menager', 'Lawyer'];
  ageList: string[] = ['<18', '18-25', '25-35', '>35']
  noExperienceList: any[] = [];
  userId: any;
  isFollowing: boolean = false;
  connections: any[] = [];
  public circleColor: string | undefined;
  private colors = [
    '#EB71810',
    '#468547',
    '#FFD558',
    '#3670B2',
    '#3670B2',
    '#3480B2',
    '#1670A2'
  ]
  constructor(
    private publicProfilesService: PublicProfilesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private connectionService: ConnectionService,
    private jwtService: JwtService,
    private chatService: ChatService
  ) {
    this.searchForm = this.formBuilder.group({
      inputUser: [''],
    });
  }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.getAllProfiles();
    this.getUserConnections();


  }
  getAllProfiles() {
    this.publicProfilesService.getAllUsers().subscribe((data: any) => {
      this.profiles = data;
      this.profiles.forEach((value, i: any) => {
        
        if (this.profiles[i].id == this.userId) {
          this.profiles.splice(i, 1);
        }
      });
    },
      error => {
        console.log(error.error.message);
      });
  }

  getUserConnections() {
    this.connectionService.getConnections(this.userId).subscribe(data => {
      this.connections = data;
    })
  }
  isConnected(targetId: any): boolean {
    if (this.connections == null)
      return false;
    if (this.connections.indexOf(targetId) !== -1) {
      return true
    }
    return false
  }


  showExperienceFilter() {
    this.profiles.forEach(profile => {

    });
  }

  sarchUserByUsername() {
    let username = this.searchForm.value.inputUser;
    if (username == '') {
      this.getAllProfiles();
    }
    else {
      this.publicProfilesService.searchUser(username).subscribe((data: any) => {
        this.profiles = data;

      },
        error => {
          console.log(error.error.message);
        });
    }
  }

  viewProfile(profile: any) {
    this.router.navigate(['/user-profile'], {
      state: profile,
    });
  }

  follow(profileId: string) {
    let connection: Connection = {
      sourceId: this.userId,
      targetId: profileId,
      connectionName: ''
    }
    this.connectionService.followPublicUser(connection).subscribe(data => {
      alert('Successfully followed!');
      this.chatService.createChat(connection.sourceId, connection.targetId).subscribe(data => {
        window.location.reload()
      }, error => {

      })

    }, error => {
      alert('Error!Try again!')
    });

  }
  sendRequest(profileId: string) {
    let connection: Connection = {
      sourceId: profileId,
      targetId: this.userId,
      connectionName: ''
    }
    this.connectionService.sendRequest(connection).subscribe(data => {
      alert('Successfully send!');
      window.location.reload()
    }, error => {
      alert('Error!Try again!')
    })
  }
  unfollow(profileId: string) {
    let connection: Connection = {
      sourceId: this.userId,
      targetId: profileId,
      connectionName: 'FOLLOWS'
    }
    this.connectionService.unfollowUser(connection).subscribe(data => {
      alert('Successfully unfollowed!');
      window.location.reload()
    }, error => {
      alert('Error!Try again!')
    })

  }

}

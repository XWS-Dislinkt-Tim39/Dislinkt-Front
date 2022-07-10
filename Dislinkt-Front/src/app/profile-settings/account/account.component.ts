import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Connection } from 'src/app/core/models/connection.model';
import { UpdatePrivacyData } from 'src/app/core/models/update-privacy-data';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { PublicProfilesService } from 'src/app/core/services/public-profiles.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  connections: any[] = [];
  userId: any;
  firstName: any;
  lastName: any;
  blocked: any[] = [];
  profiles: any[] = [];
  blockedProfiles: any[] = [];
  searchForm: FormGroup;
  profilePrivacy: boolean = true;
  constructor(private publicProfilesService: PublicProfilesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private connectionService: ConnectionService,
    private profileService: ProfileService,
    private jwtService: JwtService) {
    this.searchForm = this.formBuilder.group({
      inputUser: [''],
    });
  }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.firstName = this.jwtService.getUserDetails();
    this.lastName = this.jwtService.getUserDetails();
    this.getAllProfiles();
    this.getUserConnections();
    this.profileService.getAboutInfo(this.userId).subscribe((data: any) => {
      if (data.status == 0) {
        this.profilePrivacy = false;
      } else {
        this.profilePrivacy = true;
      }
    },
      error => {
        console.log(error.error.message);
      });
    this.getBlockedProfiles();
  }
  changePrivacy() {
    this.profileService.changePrivacy(this.userId, this.profilePrivacy).subscribe((data: any) => {
      alert("Sucessfully changed privacy");
    },
      error => {
        console.log(error.error.message);
      });
  }
  getAllProfiles() {
    this.publicProfilesService.getAllUsers().subscribe((data: any) => {
      this.profiles = data;
      this.profiles.forEach((value, i: any) => {
        if (this.profiles[i].id == this.userId) {
          this.profiles.splice(i,1);
          this.blocked.forEach((value, j: any) => {
            if (this.blocked[j].firstName == this.profiles[i].firstName && this.blocked[j].lastName == this.profiles[i].lastName) {
              this.blockedProfiles.splice(j, 1);
            }
          });
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
  block(profileId: string) {
    let connection: Connection = {
      sourceId: this.userId,
      targetId: profileId,
      connectionName: 'BLOCKS'
    }
    this.connectionService.blockUser(connection).subscribe(data => {
      alert('User is successfully blocked!');
      window.location.reload()
    }, error => {
      alert('Error!Try again!')
    });
  }
  getBlockedProfiles() {
    this.connectionService.getBlocked(this.userId).subscribe(data => {
      if (data != null) {
        data.forEach((element: string) => {
          this.profileService.getAboutInfo(element).subscribe(data1 => {
            this.blocked.push({
              firstName: data1.firstName,
              lastName: data1.lastName,
              gender: data1.gender
            })

          })
        });
      }
    })
  }

  unblock(profileId: string) {
    let connection: Connection = {
      sourceId: profileId,
      targetId: this.userId,
      connectionName: 'BLOCKS'
    }
    this.connectionService.unblockUser(connection).subscribe(data => {
      alert('User is successfully unblocked!');
      window.location.reload()
    }, error => {
      alert('Error!Try again!')
    });
  }
}

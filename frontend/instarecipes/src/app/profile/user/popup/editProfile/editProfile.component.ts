import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Allergen } from 'src/app/Interfaces/allergen.model';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from '../../../../Interfaces/user.model';
import { FormGroup} from '@angular/forms';


@Component({
  selector: 'popup-edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css']
})
export class EditProfileComponent implements OnInit {

  @Input()
  avatar: any;
  @Input()
  background: any;
  @Input()
  user: User;

  @Output()
  refresh_profile = new EventEmitter<any>();

  allAllergens: Allergen[] = [];
  userUpdate: any;
  allergenAux: string = '';
  settingsForm : FormGroup
  name : string;
  surname: string;
  info : string;
  allergens: string;
  loadAPI: any;
  newAvatar: File;
  newBackground: File;

  @ViewChild('closebutton') closebutton: ElementRef;

  constructor(private profileService: ProfileService, public authService: AuthenticationService) {   
    this.userUpdate = { 
      name: authService.user.name,
      surname: authService.user.surname,
      info: authService.user.info,
      allergens: authService.user.allergens
    }
  }  

  ngOnInit() {
    this.loadAPI = new Promise(resolve => {
      console.log("resolving promise...");
      this.loadScript();
    });
    this.loadAllergens();  
  }

  public loadScript() {
    console.log("preparing to load...");
    let node = document.createElement("script");
    node.src = 'assets/js/image_preview.js';
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  editProfile(){
  
    if (this.name != null) {
       this.userUpdate.name = this.name;
    }
    if (this.surname != null) {
      this.userUpdate.surname = this.surname;
    }
    if (this.info != null) {
      this.userUpdate.info = this.info;
    }
    if (this.allergens != null) {
      this.userUpdate.allergens = this.allergens;
    }

    this.profileService.editProfile(this.userUpdate).subscribe(
    _ =>{
      if (this.newAvatar != null){
        this.profileService.updateProfileAvatar(this.newAvatar).subscribe(
          imagen=>{ },
          (error: Error) => console.log("File uploaded!")
         );
       }
    });
    this.closebutton.nativeElement.click();
  }


  loadAllergens(){
    this.profileService.getAllAllergens().subscribe(
      allergens => this.allAllergens = allergens
    )
  }

  update_profile(){
    this.refresh_profile.emit(null);
  }
  
  onFileChanged(event) {
    this.newAvatar = event.target.files[0];
    console.log(this.newAvatar);
  }

  onBackgroundChanged(event) {
    this.newBackground = event.target.files[0];
    console.log(this.newBackground);
  }

}

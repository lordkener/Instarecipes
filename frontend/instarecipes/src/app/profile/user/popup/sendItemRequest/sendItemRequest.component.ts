import { Component, OnInit } from '@angular/core';
import {Request} from '../../../../Interfaces/request.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'popup-send-item-request',
  templateUrl: './sendItemRequest.component.html',
  styleUrls: ['./sendItemRequest.component.css']
})
export class SendItemRequestComponent implements OnInit {
  registerForm: FormGroup;
  request_:Request=null;
  type: string='';
  content: String='';
  constructor (private profileService: ProfileService,
    public authService: AuthenticationService,private formBuilder: FormBuilder,) {
      this.initConstructor();
  }
  initConstructor(){
    this.request_ = { username: null, typeOfRequest: '', ingredientContent: '', cookingStyleContent: '',
    categoryContent: '', itemExists: false, 
    };
    
  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      content: ['', Validators.required],
  });

  }


  sendRequest(){
    console.log(this.request_)
    console.log(this.registerForm.value.content)
    console.log(this.registerForm.value)
    console.log(this.type)
    this.request_.username = this.authService.user;

    //if(this.registerForm.invalid){
      //return;
    //}
    //else{
      this.typeClick();
      console.log(this.request_)
      this.profileService.getRequest(this.request_);
    //}
  }


  typeClick(){
    switch (this.request_.typeOfRequest) {
      case "Ingredient":
        this.request_.typeOfRequest = "Ingredient";
        this.request_.ingredientContent=this.type
        break;
      case "Cooking Style":
        this.request_.typeOfRequest = "Cooking Style";
        this.request_.cookingStyleContent=this.type
        break;
      case "Category":
        this.request_.typeOfRequest = "Category";
        this.request_.categoryContent=this.type

        break;
      default:
        this.request_.typeOfRequest = "";
        break;
    }
  }

}

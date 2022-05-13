import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, 
              public userSerivce:UserService,
              private router:Router
              ) { }

  ngOnInit(): void {
  }

  loginForm=this.fb.group(
    {
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    }
  )


  login(){
    this.userSerivce.getUser(this.loginForm.value.email)
    .then((res: any)=>{
      console.log(res);
      if( res.length ===0 ){
        console.log('Account does not exist');
        
      }else{
        if(res[0].password===this.loginForm.value.password){
          console.log('Its a match');
          this.userSerivce.user=res[0]
          localStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigate(['/posts'])
        }else{
          console.log('Incorrect Password');
          
        }
      }
    }).catch((err)=>{
      console.log(err);
      
    })
  }

}

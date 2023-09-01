import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private http:HttpClient,private router:Router){}
  userData!:userId;
  isLoading:boolean=false;
  onSubmit(emailAndPassword:NgForm){
    this.isLoading=true;
    const el=document.getElementById('wrongEmailOrPasswordMessaage');
        if(el!==null){
          el.style.display='none';
        }
    if(emailAndPassword.form.controls['email']['invalid']){
      const el=document.getElementById('emailMessage');
      if(el!=null){
        el.style.display='block';

      }
      this.isLoading=false;
      return;
    }else if(emailAndPassword.form.controls['email']['valid']){
      const el=document.getElementById('emailMessage');
      if(el!=null){
        el.style.display='none';

      }
 
    }

    if(emailAndPassword.form.controls['password']['invalid']){
      const el=document.getElementById('passwordMessage');
      if(el!=null){
        el.style.display='block';

      }
      this.isLoading=false;
      return;
    }else if(emailAndPassword.form.controls['password']['valid']){
      const el=document.getElementById('passwordMessage');
      if(el!=null){
        el.style.display='none';
      }
    }
    this.http.post<userId>('https://physio-time-2.onrender.com/auth/login',emailAndPassword.value).subscribe({
      next:res=>{
        this.isLoading=false;
        this.userData=res
        this.router.navigate([`/AdminPanel/${res._id}`]);
      },
      error:err=>{
        this.isLoading=false;
        const el=document.getElementById('wrongEmailOrPasswordMessaage');
        if(el!==null){
          el.style.display='block';
        }
      }
    })

  }

}
interface userId{
  _id:string;
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialService } from 'src/app/services/material.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    
    form: FormGroup
    aSub: Subscription


    constructor(private auth: AuthService, private router:Router, private route:ActivatedRoute,  public notificationService: NotificationService) {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        })

        this.route.queryParams.subscribe((params: Params) => {
            if(params['registered']){
               MaterialService.toast('You can enter to system') 
            } else if(params['accessDenied']){
               MaterialService.toast('Firstly you need to enter')
            } else if(params['sessionFailed']){
                MaterialService.toast('Please re-login! You session is finished.')
             }
        })
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe()
        }
    }

    onSubmit() {

        
        this.form.disable()

        this.aSub = this.auth.login(this.form.value).subscribe(
            () => this.router.navigate(['/']),
            error => {
                this.notificationService.error(error);
              this.form.enable()
            }
        )
        


    }
}
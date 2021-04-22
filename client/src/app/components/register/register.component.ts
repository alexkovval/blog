import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/services/material.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

    form: FormGroup
    aSub: Subscription

    constructor(private auth: AuthService, private router:Router, private route:ActivatedRoute,public notificationService: NotificationService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            name: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        })
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe()
        }
    }

    onSubmit() {
        this.form.disable()

        this.aSub = this.auth.register(this.form.value).subscribe(
            () => this.router.navigate(['/login']),
            error => {
                this.notificationService.error(error);
              this.form.enable()
            }
          )
        }

}

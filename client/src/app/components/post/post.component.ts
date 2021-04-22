import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    post$
    email
  
    constructor(
      private postService: PostsService,
      private route: ActivatedRoute,
      private router: Router
    ) { }
  
    ngOnInit(): void {
        this.email = localStorage.getItem("user-email")
      this.post$ = this.route.params
      .pipe(switchMap( (params : Params) => {
        return this.postService.getById(params['id'])
      }))
    }
  
    deletePost() {
        const decision = window.confirm(`Are you sure that you'd like to delete "${this.post$.title}?"`)
    
        if (decision) {
          this.postService.deletePost(this.post$._id)
            .subscribe(
              response => MaterialService.toast(response.message),
              error => MaterialService.toast(error.error.message),
              () => this.router.navigate(['/'])
            )
        }
      }
  
  }
  
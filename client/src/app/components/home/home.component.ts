import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    posts = []
    category
  
    constructor(
      private postsService: PostsService
    ) { }
  
    ngOnInit(): void {
      this.postsService.getAllPosts().subscribe( posts => 
        this.posts = posts,
        (err) => {},
        () => {
          for (let i = 0; i < this.posts.length; i++) {
            this.posts[i].text = this.posts[i].text.substring(0, 250)
            
          }
        }
      )
    }
  
    setCategory(category) {
      this.category = category
    }
  
  }
  
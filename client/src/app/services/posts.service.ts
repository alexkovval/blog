import { Message } from './../models/Message.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) { }

    getAllPosts(): Observable<Post[]> {
        return this.http.get<Post[]>('api/post')
    }
    
      getById(id: string): Observable<Post> {
         return this.http.get<Post>(`api/post/${id}`)
        }

    create(post:Post,image?:File): Observable<Post> {
        const fd = new FormData()
    
        fd.append('image', image, image.name)
        fd.append('title', post.title)
        fd.append('category', post.category)
        fd.append('author', post.author)
        fd.append('text', post.text)
    
        return this.http.post<Post>('api/post/dashboard', fd)
      }

      deletePost(id: string): Observable<Message> {
        return this.http.delete<Message>(`/api/category/${id}`)
      }
    }
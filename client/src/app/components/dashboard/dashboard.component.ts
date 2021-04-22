import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from './../../services/posts.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialService } from 'src/app/services/material.service';
import { Post } from 'src/app/models/Post';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    title: string
    text: string
    image: File;
    form: FormGroup;
    imagePreview: string;
    category: string;

    author;

    constructor(
        private postService: PostsService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    createPost() {
        const post = {
            category: this.category,
            title: this.title,
            text: this.text,
            author: localStorage.getItem("user-email")
        }
        console.log(post);
        this.postService.create(post,this.image)
        .subscribe(
            post => {
                console.log(post)
                MaterialService.toast('Changes are saved')
                this.form.enable()
            },
            error => {
                console.log(error.error.message)
                MaterialService.toast(error.error.message)
                this.form.enable()
            }
        )
    }

    onFileUpload(event: any): void {
        const file = event.target.files[0]
        this.image = file

        const reader = new FileReader()

        reader.onload = args => {
            this.imagePreview = args.target.result.toString();
            console.log(this.imagePreview);
        };
        reader.readAsDataURL(file)
    }
}
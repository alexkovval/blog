import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token = null;
    constructor(private http: HttpClient) { }

    public register(user: User): Observable<User> {
        const observable = this.http.post<User>('api/auth/register', user)
        return observable;
    }

    public login(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('api/auth/login', user)
            .pipe(
                tap(
                    ({ token }) => {
                        localStorage.setItem('auth-token', token)
                        localStorage.setItem('user-email', user.email)
                        this.setToken(token)
                    }
                )
            )
    }
 
    setToken(token: string) {
        this.token = token
    }

    getToken(): string {
        return this.token
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    logout() {
        this.setToken(null) 
        localStorage.clear()
    }
}
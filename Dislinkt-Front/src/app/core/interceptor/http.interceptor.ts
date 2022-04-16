import { UserToken } from '../models/user-token.model';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtService } from "../services/jwt.service";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(
        private jwtService: JwtService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userDetails: UserToken = this.jwtService.getUserDetails();
        if (userDetails) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${userDetails.jwtToken}`
                }
            });
        }
        return next.handle(req);
    }
}
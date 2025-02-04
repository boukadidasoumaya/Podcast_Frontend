import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService,private userService : UserService,private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ userData }) =>
        this.authService.login(userData).pipe(
          map((response) =>{
            if (response.accessToken) {
              localStorage.setItem('authToken', response.accessToken);
            }
            this.router.navigate(['/profil']);
            return AuthActions.loginSuccess({ user: response.user, token: response.accessToken });
          }),
          catchError((error) =>{
            return of(AuthActions.loginFailure({ error: error }));
          }
            
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ userData }) =>
        this.authService.register(userData).pipe(
          map((response) => {
            console.log("Register success:", response);
            return AuthActions.registerSuccess({ user: response });
          }),
          catchError((error) => {
            console.error("Register error:", error);
            return of(AuthActions.registerFailure({ error: error.message })); 
          })
        )
      )
    )
  );

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadCurrentUser), 
      mergeMap(() =>
        this.authService.getCurrentUser().pipe(
          map((user) => {
            return AuthActions.loadCurrentUserSuccess({ user });
          }),
          catchError((error) => {
            console.error("Failed to load current user:", error);
            return of(AuthActions.loadCurrentUserFailure({ error: error.message }));
          })
        )
      )
    )
  );
  
  updateUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.updateUser),
        mergeMap(({ user }) =>
          this.userService.updateUserProfile(user).pipe(
            map((updatedUser) => {
              return AuthActions.updateUserSuccess({ user: updatedUser });
  
            }),
            catchError((error) => {
              console.error("Error updating user:", error);
              return of(AuthActions.updateUserFailure({ error: error.message }));
            })
          )
        )
      )
    );
}
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ userData:any }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; token: string }>() 
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const loadCurrentUser = createAction('[Auth] Load Current User');

export const loadCurrentUserSuccess = createAction(
  '[Auth] Load Current User Success',
  props<{ user: any }>()
);

export const loadCurrentUserFailure = createAction(
  '[Auth] Load Current User Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ userData: any }>() 
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: any }>() 
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const updateEmail = createAction(
  '[Auth] Update Email',
  props<{ newEmail: string }>()
);

export const updateUser = createAction(
  '[Auth] Update User',
  props<{ user: any }>()
);

export const updateUserSuccess = createAction(
  '[Auth] Update User Success',
  props<{ user: any }>()
);

export const updateUserFailure = createAction(
  '[Auth] Update User Failure',
  props<{ error: string }>()
);


import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AuthActions.loadCurrentUserSuccess, (state, { user }) => ({
    ...state,
    user, 
    loading: false,
  })),
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    token: null,
  })),

  on(AuthActions.updateEmail, (state, { newEmail }) => ({
    ...state,
    user: {
      ...state.user,
      email: newEmail,
    },
  })),

  on(AuthActions.updateUserSuccess, (state, { user }) => ({
        ...state,
        user: { ...state.user, ...user }, 
        loading: false,
      })),
      on(AuthActions.updateUserFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
      }))

);
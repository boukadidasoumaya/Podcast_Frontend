import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = (state: { auth: AuthState }) => state.auth;

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);
export interface ISnackbar {
  snackbarOpen: boolean;
  snackbarType: 'success' | 'info' | 'warning' | 'error' | undefined;
  snackbarMessage: string;
  snackbarTime: number;
}

export type snackbarValue<K extends keyof ISnackbar, U = Pick<ISnackbar, K>> = U[keyof U];

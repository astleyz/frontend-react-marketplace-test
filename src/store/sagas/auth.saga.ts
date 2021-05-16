import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { api } from '../../api';
import { AuthorizationAction, setSnackbar, RegistrationAction } from '../actions';

export function* authorizationWorker({ data, formik }: AuthorizationAction): SagaIterator {
  try {
    yield call(api.auth.login, data);
    formik.setSubmitting(false);
    formik.resetForm();
    setTimeout(() => formik.props.onClose(), 100);
  } catch (e) {
    formik.setSubmitting(false);
    yield put(setSnackbar(true, 'error', e.response.data.message, 5000));
  }
}

export function* registrationWorker({ data, formik }: RegistrationAction): SagaIterator {
  try {
    yield call(api.auth.register, data);
    formik.setSubmitting(false);
    formik.resetForm();
    setTimeout(() => formik.props.onClose(), 200);
    yield put(setSnackbar(true, 'success', 'Успешно зарегистрирован'));
  } catch (e) {
    formik.setSubmitting(false);
    yield put(setSnackbar(true, 'error', e.response.data.message, 5000));
  }
}

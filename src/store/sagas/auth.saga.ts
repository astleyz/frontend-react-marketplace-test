import { put, call, delay } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { api } from '../../api';
import { AuthorizationAction, setSnackbar, RegistrationAction, setToken } from '../actions';

export function* authorizationWorker({ data, formik }: AuthorizationAction): SagaIterator {
  try {
    const response = yield call(api.auth.login, data);
    yield put(setToken(response.data.token));
    formik.setSubmitting(false);
    formik.resetForm();
    yield delay(100);
    formik.props.onClose();
  } catch (e) {
    const errText = e.response?.data?.message || e.message || 'Client Error';
    formik.setSubmitting(false);
    yield put(setSnackbar(true, 'error', errText, 5000));
  }
}

export function* registrationWorker({ data, formik }: RegistrationAction): SagaIterator {
  try {
    const response = yield call(api.auth.register, data);
    yield put(setToken(response.data.token));
    formik.setSubmitting(false);
    formik.resetForm();
    yield delay(200);
    formik.props.onClose();
  } catch (e) {
    const errText = e.response?.data?.message || e.message || 'Client Error';
    formik.setSubmitting(false);
    yield put(setSnackbar(true, 'error', errText, 5000));
  }
}

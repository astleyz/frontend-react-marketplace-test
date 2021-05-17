import { useState, useCallback } from 'react';
import { FetchDataType } from '../api';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../store/actions';

const useHttp = <T>() => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const request = useCallback(
    async (request: () => FetchDataType<T>): Promise<void> => {
      setLoading(true);
      try {
        const response = await request();
        setData(response.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        dispatch(setSnackbar(true, 'error', e.response?.data?.message || 'Client Error', 5000));
      }
    },
    [dispatch]
  );

  return { request, loading, data };
};

export default useHttp;

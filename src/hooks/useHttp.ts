import { useState, useCallback } from 'react';
import { FetchDataType } from '../api';
import { useDispatch } from 'react-redux';

const useHttp = <T>() => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  const request = useCallback(async (request: () => FetchDataType<T>): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const response = await request();
      setData(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }, []);

  return { request, loading, data, error, dispatch };
};

export default useHttp;

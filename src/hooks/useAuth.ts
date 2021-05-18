import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../api';
import { setToken } from '../store/actions/auth.action';

const useAuth = () => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tryAuthenticate = async () => {
      try {
        const response = await api.auth.refreshTokens();
        dispatch(setToken(response.data.token));
        setReady(true);
      } catch (e) {
        setReady(true);
      }
    };

    if (!ready) tryAuthenticate();
  }, [dispatch, ready]);

  return { ready };
};

export default useAuth;

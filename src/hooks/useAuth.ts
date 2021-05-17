import { useSelector, useDispatch } from 'react-redux';
import { getAuthStatus } from '../store/selectors';

const useAuth = () => {
  const dispatch = useDispatch();

  const isAuthenticated: boolean = useSelector(getAuthStatus);

  return { isAuthenticated, dispatch };
};

export default useAuth;

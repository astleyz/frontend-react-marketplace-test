import { FC, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Snackbar from './components/Snackbar/Snackbar';
import NotFound from './components/NotFound/NotFound';
import useAuth from './hooks/useAuth';
import HomePage from './pages/HomePage';
import BoundaryRoute from './hocs/BoundaryRoute';

const CoursePage = lazy(() => import('./pages/CoursePage'));
const LessonPage = lazy(() => import('./pages/LessonPage'));

const App: FC = () => {
  const { ready } = useAuth();

  if (!ready) return null;
  return (
    <>
      <Snackbar />
      <BrowserRouter>
        <Switch>
          <Redirect path="/" exact to="/courses" />
          <Route path="/courses" exact component={HomePage} />
          <BoundaryRoute path="/courses/:id" exact suspense component={CoursePage} />
          <BoundaryRoute path="/courses/:id/:lesson" exact suspense component={LessonPage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;

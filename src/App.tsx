import { FC } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Snackbar from './components/Snackbar/Snackbar';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import NotFound from './pages/NotFound';
import useAuth from './hooks/useAuth';
import HomePage from './pages/HomePage';

const App: FC = () => {
  const { ready } = useAuth();

  if (!ready) return null;
  return (
    <>
      <Snackbar />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Redirect path="/courses" exact to="/" />
          <Route path="/courses/:id" exact component={CoursePage} />
          <Route path="/courses/:id/:lesson" exact component={LessonPage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;

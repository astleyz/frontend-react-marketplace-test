import React, { FC } from 'react';
import Header from './components/Header/Header';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Card from './components/Card/Card';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Snackbar from './components/Snackbar/Snackbar';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import NotFound from './pages/NotFound';

const App: FC = () => {
  return (
    <>
      <Snackbar />
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div
                style={{ minHeight: '100%', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}
              >
                <Header />
                <div className="container" style={{ marginTop: '2rem' }}>
                  <Breadcrumbs />
                  <Card />
                </div>
                <Footer />
              </div>
            )}
          />
          <Route path="/courses/:id" exact component={CoursePage} />
          <Route path="/courses/:id/:lesson" exact component={LessonPage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;

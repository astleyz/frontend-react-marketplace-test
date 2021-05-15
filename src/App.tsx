import React, { FC } from 'react';
import Header from './components/Header/Header';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Card from './components/Card/Card';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Route
        path="/"
        exact
        render={() => (
          <>
            <Header />
            <div className="container" style={{ marginTop: '2rem', minHeight: '76.7%' }}>
              <Breadcrumbs />
              <Card />
            </div>
            <Footer />
          </>
        )}
      />
      <Route path="/:id" exact component={CoursePage} />
      <Route path="/:id/:lesson" exact component={LessonPage} />
    </BrowserRouter>
  );
};

export default App;

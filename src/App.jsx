import React, { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Page from './pages/Page';

import Create from './pages/Create';
import FillForm from './pages/FillForm';
import Edit from './pages/formview/Edit';


function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 500,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change


  return (
    <>
      <Routes>
        <Route path="/" element={<Page title="Home Page"><p>Demo</p></Page>} />
        <Route path="/create" element={<Page title="Create Form"><Create /></Page>} />
        <Route path="/forms/edit/:formId" element={<Page title="Edit"><Edit /></Page>} />
				<Route path="/form/:formId" element={<FillForm />} />
      </Routes>
    </>
  );
}

export default App;

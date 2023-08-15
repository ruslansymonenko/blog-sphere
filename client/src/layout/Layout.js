import { Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';
import Header from './Header/Header';

import '../App.css';


const Layout = () => {
  return(
    <React.Fragment>
      <Header/>
      <main className="main mt-4">
          <Suspense fallback={'loading...'}>
            <Outlet/>
        </Suspense>
      </main>
    </React.Fragment>
  )
}

export default Layout;
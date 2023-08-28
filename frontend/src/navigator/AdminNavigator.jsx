import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Actors from '../components/admin/Actors';
import Movies from '../components/admin/Movies';
import Dashboard from '../components/admin/Dashboard';
import NotFound from '../components/pages/NotFound';
import NavBar from '../components/admin/NavBar';
import Header from '../components/admin/Header';

const AdminNavigator = () => {
  return (
    <div className='flex dark:bg-primary bg-white'>
      <NavBar />
      <div className='flex-1 p-2 max-w-screen-xl'>
        <Header
          onAddActorClick={() => {
            console.log('actor add');
          }}
          onAddMovieClick={() => {
            console.log('movie add');
          }}
        />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/actors' element={<Actors />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminNavigator;

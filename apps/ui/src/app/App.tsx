import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PokemonApp from './PokemonApp';
import AuthForm from './AuthForm';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/pokemons?page=1&type=all'} />} />
      <Route
        path="/pokemons"
        element={
          <PrivateRoute>
            <PokemonApp />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<AuthForm isLogin />} />
      <Route path="/signup" element={<AuthForm isLogin={false} />} />
    </Routes>
  );
};

export default App;

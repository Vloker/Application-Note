import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Arsip from './page/Arsip';
import Catatan from './page/Catatan';
import Detail from './page/Detail';
import Register from './page/Register';
import Login from './page/Login';
import NotFound from './page/NotFound';
import { ThemeDarkProvider } from './context/context';
import PrivateRoute from './private/Privateroute';

function App() {
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => {
    setTheme(prevTheme => !prevTheme);
  };
  
  return (
    <Router>
      <ThemeDarkProvider value={{ theme, toggleTheme }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/arsip" element={<PrivateRoute component={Arsip} />} />
          <Route path="/detail/:id" element={<PrivateRoute component={Detail} />} />
          <Route path="/HalamanCatatan" element={<PrivateRoute component={Catatan} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeDarkProvider>
    </Router>
  );
}

export default App;

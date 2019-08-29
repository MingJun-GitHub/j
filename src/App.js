import React from 'react';
import {renderRoutes} from 'react-router-config';
import {HashRouter} from 'react-router-dom';
import routes from '@/routes'
function App() {
  return (
    <div className="App">
      <HashRouter>
        {renderRoutes(routes)}
      </HashRouter>
    </div>
  );
}

export default App;

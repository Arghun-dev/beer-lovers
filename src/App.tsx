import { Route, Routes } from 'react-router-dom';

import Beers from 'components/Beers';
import BeerDetail from 'components/BeerDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Beers />} />
      <Route path="/beers/:id" element={<BeerDetail />} />
    </Routes>
  );
};

export default App;

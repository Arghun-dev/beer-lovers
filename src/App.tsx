import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Beers from 'components/Beers';
import BeerDetail from 'components/BeerDetail';

const App = (): React.ReactNode => {
  return (
    <Router>
      <div>
        <nav>Beer Lovers</nav>

        <Routes>
          <Route path="/" element={<Beers />} />
          <Route path="/beers/:id" element={<BeerDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

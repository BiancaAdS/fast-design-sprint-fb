// import './App.css';

import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer'

import { RoutesPage as Route} from './routes'
import { Page } from './shared/components/Page';


function App() {
  return (
    <>
      <Header />
      <Page>
        <Route />
        

      </Page>
    </>
  );
}

export default App;

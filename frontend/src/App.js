import { Header } from './shared/components/Header';
import { Footers } from './shared/components/Footer';

import { RoutesPage as Route} from './routes'
import { Page } from './shared/components/Page';


function App() {
  return (
    <>
      <Header />
      <Page>
        <Route />
      </Page>
      <Footers></Footers>
    </>
  );
}

export default App;

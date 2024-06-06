import { TitleProvider } from '../context/TitleContext';
import Layout from '../layouts/Layout';

function Landing() {

  return (
    <TitleProvider>
      <Layout />
    </TitleProvider>
  );
}

export default Landing;
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Css
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-medium-image-zoom/dist/styles.css';
import 'swiper/css';
import './assets/css/app.css';
import 'overlayscrollbars/overlayscrollbars.css';

// Layouts
import ClientLayout from './layouts/Client';

// Pages
import Account from './pages/account/Account';
import AccountDetailPage from './pages/account/AccountDetailPage';
import AccountOrderPage from './pages/account/AccountOrderPage';
import AccountPasswordPage from './pages/account/AccountPasswordPage';
import Brand from './pages/Brand';
import Category from './pages/Category';
import Checkout from './pages/Checkout';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import DetailProduct from './pages/DetailProduct';
import Faq from './pages/Faq';
import Home from './pages/Home';
import PaymentReturn from './pages/PaymentReturn';
import Privacy from './pages/Privacy';
import Products from './pages/Products';
import Page404 from './pages/shared/404';
import TrackOrder from './pages/TrackOrder';
import Verify from './pages/Verify';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [title, setTitle] = useState('Artemis Shop');

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* add routes with layouts */}
          <Route element={<ClientLayout />}>
            <Route index path='/' element={<Home setTitle={setTitle} />} />
            <Route
              path='/collections/:slug'
              element={<Collection setTitle={setTitle} />}
            />
            <Route
              path='/category/:slug'
              element={<Category setTitle={setTitle} />}
            />
            <Route
              path='/products'
              element={<Products setTitle={setTitle} />}
            />
            <Route
              path='/products/:slug'
              element={<DetailProduct setTitle={setTitle} />}
            />
            <Route
              path='/account/verify'
              element={<Verify setTitle={setTitle} />}
            />
            <Route
              path='/account/reset-password'
              element={<ResetPassword setTitle={setTitle} />}
            />
            <Route
              path='/checkout'
              element={<Checkout setTitle={setTitle} />}
            />
            <Route
              path='/payment/payment-return'
              element={<PaymentReturn setTitle={setTitle} />}
            />
            <Route
              path='/account/:slug'
              element={<Account setTitle={setTitle} />}
            />
            <Route
              path='/account/:slug/my-orders'
              element={<AccountOrderPage setTitle={setTitle} />}
            />
            <Route
              path='/account/:slug/account-details'
              element={<AccountDetailPage setTitle={setTitle} />}
            />
            <Route
              path='/account/:slug/change-password'
              element={<AccountPasswordPage setTitle={setTitle} />}
            />
            <Route
              path='/account/orders/:slug'
              element={<TrackOrder setTitle={setTitle} />}
            />
            <Route path='/brands' element={<Brand setTitle={setTitle} />} />
            <Route
              path='/pages/contact-us'
              element={<Contact setTitle={setTitle} />}
            />
            <Route path='/pages/faq' element={<Faq setTitle={setTitle} />} />
            <Route
              path='/pages/privacy'
              element={<Privacy setTitle={setTitle} />}
            />
            <Route
              path='/pages/terms'
              element={<Privacy setTitle={setTitle} />}
            />
            <Route
              path='/not-found'
              element={<Page404 setTitle={setTitle} />}
            />
          </Route>

          <Route path='*' element={<Navigate to='/not-found' replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

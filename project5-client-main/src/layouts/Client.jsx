import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router';
import {
  getLocalStorage,
  getSessionStorage,
  removeLocalStorage,
  removeSessionStorage,
} from '../utils/storage/storage';
// Components
import Toast from '../components/shared/Alert/Toast';
import Footer from '../components/shared/footer/Footer';
import Header from '../components/shared/header/Header';
import SearchForm from '../components/shared/header/SearchForm';
import UserForm from '../components/user/UserForm';
// Api
import { searchMenu } from '../services/category';
import {
  getByPath as getByPathCustomer,
  updateInfo,
} from '../services/customer';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

export default function ClientLayout() {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [categories, setCategories] = useState();
  const [user, setUser] = useState();
  const [storage] = useState(() => {
    const local = getLocalStorage('user');
    const session = getSessionStorage('user');

    if (local) return local;
    if (session) return session;
  });

  useEffect(() => {
    searchMenu().then((res) => setCategories(res));
  }, []);

  const handleGetCustomer = useCallback(() => {
    getByPathCustomer(storage.path, storage.token)
      .then((res) => setUser(res))
      .catch((err) => {
        toast.error(err.response.data.message);
        if (err.response.status === 401) handleLogout();
      });
  }, [storage]);

  useEffect(() => {
    if (storage) handleGetCustomer();
  }, [storage, handleGetCustomer]);

  const handleLogout = () => {
    removeLocalStorage('user');
    removeSessionStorage('user');

    toast.warning('Đang đăng xuất', {
      autoClose: 500,
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleUpdateCustomerInfo = async (data) => {
    return await updateInfo(data, storage.token).then((res) => {
      handleGetCustomer();
    });
  };

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header
          setShowDialog={setShowDialog}
          setShowSearchForm={setShowSearchForm}
          categories={categories}
          user={user}
          handleUpdateCustomerInfo={handleUpdateCustomerInfo}
          storage={storage}
          handleLogout={handleLogout}
        />
        <main
          className='relative flex-grow'
          style={{
            minHeight: '-webkit-fill-available',
          }}
        >
          <Outlet context={{ categories, user, handleUpdateCustomerInfo }} />
        </main>
        <Footer />

        <SearchForm
          showSearchForm={showSearchForm}
          setShowSearchForm={setShowSearchForm}
        />
        <UserForm showDialog={showDialog} setShowDialog={setShowDialog} />

        <Toast />
      </div>
    </>
  );
}

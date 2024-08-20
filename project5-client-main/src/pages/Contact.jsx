import { useEffect } from 'react';
import MainContact from '../components/contact/MainContact';
import BannerExplore from '../components/shared/banner/BannerExplore';

export default function Contact({ setTitle }) {
  useEffect(() => {
    setTitle('Liên Hệ Chúng Tôi | Artemis');
  }, [setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BannerExplore title={'Liên hệ'} />

      <MainContact />
    </>
  )
}
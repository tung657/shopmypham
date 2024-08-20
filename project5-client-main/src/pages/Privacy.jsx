import { useEffect } from 'react';
import MainPrivacy from '../components/privacy/MainPrivacy';
import BannerExplore from '../components/shared/banner/BannerExplore';

export default function Privacy({setTitle}) {
  useEffect(() => {
    setTitle('Chính Sách Bảo Mật | Artemis');
  }, [setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BannerExplore title={'Chính Sách Bảo Mật'} />

      <MainPrivacy />
    </>
  )
}
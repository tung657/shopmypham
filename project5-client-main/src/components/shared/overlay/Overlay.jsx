import { useEffect } from 'react';

export default function Overlay({ showOverlay, setShowOverlay, classes }) {
  useEffect(() => {
    if (showOverlay) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [showOverlay]);

  return (
    <>
      <div
        onClick={() => setShowOverlay(false)}
        className={`overlay ${classes} ` + (showOverlay ? 'open' : '')}
        role='button'
      ></div>
    </>
  );
}

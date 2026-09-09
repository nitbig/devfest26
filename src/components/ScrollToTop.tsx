/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
<<<<<<< HEAD
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
=======
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname === '/faq' || hash === '#faq') {
      setTimeout(() => {
        const el = document.getElementById('faq');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 120);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
>>>>>>> update

  return null;
};

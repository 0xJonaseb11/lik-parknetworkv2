import 'jarallax/dist/jarallax.min.css';
import { useEffect } from 'react';

export default function useJarallax() {
  useEffect(() => {
    const loadJarallax = async () => {
        if (typeof window !== 'undefined'){
            const {jarallax} = await Promise.resolve(require('jarallax'));
            
            jarallax(document.querySelectorAll('.jarallax'), {
                speed: 0.2
              });
        }
    }

    loadJarallax();
  }, []);
}

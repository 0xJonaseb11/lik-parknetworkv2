'use client';

import dynamic from 'next/dynamic';
import About from '../../containers/About';

export default dynamic(() => Promise.resolve(About), { ssr: false });

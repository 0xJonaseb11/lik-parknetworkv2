import dynamic from 'next/dynamic';
import Home from '../../containers/Home';

export default dynamic(() => Promise.resolve(Home), { ssr: false });

import { cookies } from 'next/headers';
import DismissButton from './dismiss-button';

export default function Toast() {
  const cookieStore = cookies();
  const isHidden = cookieStore.get('template-banner-hidden');

  return isHidden ? null : (
    <div className="fixed rounded-2xl w-11/12 sm:w-[581px] h-40 sm:h-[80px] p-0.5 z-10 bottom-10 left-0 right-0 mx-auto">
      <div className="rounded-[14px] w-full h-full bg-gray-50 border border-gray-200 flex items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5">
        <p className="text-black text-[13px] font-mono w-[304px] h-10 flex items-center justify-center m-0">
          This web3 website is a proof of concept. Data provided will not be accurate. <DismissButton />
        </p>
      </div>
    </div>
  );
}

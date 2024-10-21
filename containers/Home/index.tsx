'use client';

import { Fragment } from 'react';
import SectionHero from './SectionHero';
import SectionServices from './SectionServices';
import SectionBanner from './SectionBanner';
import SectionBrands from '../About/Section/SectionBrands';
import SectionLocation from '../Contact/SectionLocation';

export default function Home() {
  return (
    <Fragment>
      {/* Hero Image Section */}
      <SectionHero />

      {/* Services Section */}
      <SectionServices />

      {/* Banner Section */}
      <SectionBanner />

      {/* Brands Section */}
      <SectionBrands />

      {/* Map Snippet Section */}
      <SectionLocation />
    </Fragment>
  );
}

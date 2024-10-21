'use client';

import { Fragment } from 'react';

import 'swiper/css';

import ContactForm from '../../components/About/ContactForm';
import HeroJarallax from '../../components/About/HeroJarallax';
import SectionBrands from './Section/SectionBrands';
import SectionGallery from './Section/SectionGallery';
import SectionStats from './Section/SectionStats';
import SectionAbout from './Section/SectionAbout';
import SectionContact from './Section/SectionContact';
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionClients from './Section/SectionClients';

import './styles.css';
import SectionTimeline from './Section/SectionTimeline';

export default function About() {
  return (
    <Fragment>
      {/* Hero section with parallax effect */}
      <HeroJarallax />

      {/* About section */}
      <SectionAbout />

      {/* Statistics Section */}
      <SectionStats />

      {/* Video & Image Gallery */}
      <SectionGallery />

      {/* Timeline Section */}
      <SectionTimeline />


    </Fragment>
  );
}

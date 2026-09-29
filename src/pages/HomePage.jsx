import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedDestinations from '../components/FeaturedDestinations';
import TravelCategories from '../components/TravelCategories';
import StatsBanner from '../components/StatsBanner';
import ValueProposition from '../components/ValueProposition';
import PopularDestinations from '../components/PopularDestinations';
import CuratedExperiences from '../components/CuratedExperiences';
import TravelBlog from '../components/TravelBlog';
import PhotoGallery from '../components/PhotoGallery';
import TravelPackages from '../components/TravelPackages';
import Testimonials from '../components/Testimonials';
import TipsAndFaq from '../components/TipsAndFaq';
import NewsletterCta from '../components/NewsletterCta';
import BottomBanner from '../components/BottomBanner';

export default function HomePage() {
  const { onOpenItinerary, onToast, handleSearchSubmit } = useOutletContext();

  return (
    <>
      <Hero onSearchSubmit={handleSearchSubmit} />

      <FeaturedDestinations />

      <TravelCategories />

      <StatsBanner 
        onExplore={() => {
          const el = document.getElementById('popular');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <ValueProposition />

      <PopularDestinations />

      <CuratedExperiences 
        onOpenItineraryModal={onOpenItinerary}
      />

      <TravelBlog 
        onReadArticle={(post) => onToast(`Opening article: "${post.title}"`)}
      />

      <PhotoGallery />

      <TravelPackages />

      <Testimonials 
        onMoreReviews={() => onToast("Loading verified traveler reviews...")}
      />

      <TipsAndFaq />

      <NewsletterCta />

      <BottomBanner 
        onPlanTrip={onOpenItinerary}
      />
    </>
  );
}

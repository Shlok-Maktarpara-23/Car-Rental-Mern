import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import CTA from '../components/CTA'
import Testimonial from '../components/Testimonial'

const Home = () => {
  return (
    <div>
        <Hero />
        <FeaturedSection />
        <CTA />
        <Testimonial />
    </div>
  )
}

export default Home
import HeroSection from './components/home/HeroSection'
import HowItWorks from './components/home/HowItWorks'
import ServicesGlance from './components/home/ServicesGlance'
import WhyChooseUs from './components/home/WhyChooseUs'
import CTABanner from './components/home/CTABanner'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <ServicesGlance />
      <WhyChooseUs />
      <CTABanner />
    </main>
  )
}

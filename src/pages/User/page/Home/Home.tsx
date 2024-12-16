
import HomeSection from "pages/User/components/HomeSection";
import FeaturedDealsSection from "pages/User/components/FeaturedDealsSection";
import RecentlyVisitedSection from "pages/User/components/RecentlyVisitedSection";
import TrendingDestinationSection from "pages/User/components/TrendingDestinationSection";
import WhyChooseUsSection from "pages/User/components/WhyChooseUsSection";
import Footer from "pages/User/components/Footer";

const Home = () => {
  return (
    <div>
      <div id="home">
        <HomeSection />
      </div>
      <div id="why-choose-us">
        <WhyChooseUsSection />
      </div>
      <div id="featured-deals">
        <FeaturedDealsSection />
      </div>
      <div id="recently-visited">
        <RecentlyVisitedSection />
      </div>
      
      <div id="trending-destination">
        <TrendingDestinationSection />
      </div>
      <Footer/>
      
    </div>
  );
};

export default Home;

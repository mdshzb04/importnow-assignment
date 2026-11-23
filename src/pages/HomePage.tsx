import Services from '../sections/Services';
import Industries from '../sections/Industries';
import ChinaLicence from '../sections/ChinaLicence';
import BusinessTrips from '../sections/BusinessTrips';
import Delivered from '../sections/Delivered';
import ClientStories from '../sections/ClientStories';
import ImportGuides from '../sections/ImportGuides';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';
import Hero from '../sections/Hero';
import RouteTicker from '../sections/RouteTicker';
import ShipmentJourney from '../sections/ShipmentJourney';
export default function HomePage() {
  return <>
    <Hero /><RouteTicker />
    <Services />
    <ShipmentJourney />
    <Industries /><ChinaLicence /><BusinessTrips /><Delivered /><ClientStories /><ImportGuides /><FAQ /><Contact />
  </>;
}

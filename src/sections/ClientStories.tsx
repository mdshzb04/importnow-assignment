import { stories } from '../data/home';
import { HomeCard, SectionHeading } from '../components/home/HomeUI';
export default function ClientStories() {
  return <section id="stories" className="home-section home-stories"><div className="wrap"><SectionHeading eyebrow="Client stories" before="Heard from the people" accent="who made the trip." /><div className="home-grid-three">{stories.map((story, index) => <HomeCard key={story.name} className="home-story" delay={index * .08}><p className="home-story-quote">{story.quote}</p><div className="home-story-who"><span className="home-story-avatar" aria-hidden="true">{story.initials}</span><div><b>{story.name}</b><span>{story.role}</span></div></div></HomeCard>)}</div></div></section>;
}

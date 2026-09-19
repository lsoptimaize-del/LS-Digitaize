'use client';

import { useParams, notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SERVICES } from '../../data/services';
import { SERVICE_CONTENT } from '../../data/serviceContent';
import { SERVICE_HEROES, HERO_CSS } from '../../components/service/ServiceHeroes';
import {
  ServiceUsps,
  ServiceExplainer,
  ServiceCapabilities,
  ServiceTimeline,
  ServiceValue,
  ServiceCta,
} from '../../components/service/ServiceSections';

export default function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === params.slug);
  const content = service ? SERVICE_CONTENT[service.slug] : undefined;

  if (!service || !content) {
    notFound();
    return null;
  }

  const Hero = SERVICE_HEROES[service.slug];

  return (
    <div style={{ minHeight: '100dvh', background: '#FAFAF7', color: '#0A0A0A' }}>
      <style>{HERO_CSS}</style>
      <Navbar />
      {Hero && <Hero service={service} content={content} />}
      <ServiceUsps content={content} />
      <ServiceExplainer content={content} />
      <ServiceCapabilities service={service} />
      <ServiceTimeline service={service} />
      <ServiceValue service={service} />
      <ServiceCta content={content} />
      <Footer />
    </div>
  );
}

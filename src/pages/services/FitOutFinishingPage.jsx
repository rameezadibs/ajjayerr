import React from 'react';
import ServicePageTemplate from '../../components/ServicePageTemplate';
import { getServiceBySlug } from '../../data/servicesData';

export default function FitOutFinishingPage() {
  const service = getServiceBySlug('fit-out-finishing');
  return <ServicePageTemplate service={service} />;
}

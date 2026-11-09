import React from 'react';
import ServicePageTemplate from '../../components/ServicePageTemplate';
import { getServiceBySlug } from '../../data/servicesData';

export default function GeneralConstructionPage() {
  const service = getServiceBySlug('general-construction');
  return <ServicePageTemplate service={service} />;
}

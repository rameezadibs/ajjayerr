import React from 'react';
import ServicePageTemplate from '../../components/ServicePageTemplate';
import { getServiceBySlug } from '../../data/servicesData';

export default function TensileShadeStructuresPage() {
  const service = getServiceBySlug('tensile-shade-structures');
  return <ServicePageTemplate service={service} />;
}

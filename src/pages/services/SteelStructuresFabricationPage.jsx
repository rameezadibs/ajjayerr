import React from 'react';
import ServicePageTemplate from '../../components/ServicePageTemplate';
import { getServiceBySlug } from '../../data/servicesData';

export default function SteelStructuresFabricationPage() {
  const service = getServiceBySlug('steel-structures-fabrication');
  return <ServicePageTemplate service={service} />;
}

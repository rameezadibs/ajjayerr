import React from 'react';
import ServicePageTemplate from '../../components/ServicePageTemplate';
import { getServiceBySlug } from '../../data/servicesData';

export default function CarParkingShadesPergolasPage() {
  const service = getServiceBySlug('car-parking-shades-pergolas');
  return <ServicePageTemplate service={service} />;
}

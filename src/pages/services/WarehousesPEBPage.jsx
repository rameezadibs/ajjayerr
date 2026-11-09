import React from 'react';
import ServicePageTemplate from '../../components/ServicePageTemplate';
import { getServiceBySlug } from '../../data/servicesData';

export default function WarehousesPEBPage() {
  const service = getServiceBySlug('warehouses-pre-engineered-buildings');
  return <ServicePageTemplate service={service} />;
}

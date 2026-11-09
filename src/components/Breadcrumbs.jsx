import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="ajjayer-breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((crumb, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li
              key={crumb.url || crumb.name}
              className={`breadcrumb-item ${isLast ? 'is-current' : ''}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {!isLast ? (
                <Link to={crumb.url} className="breadcrumb-link" itemProp="item">
                  <span itemProp="name">{crumb.name}</span>
                </Link>
              ) : (
                <span className="breadcrumb-current" itemProp="name" aria-current="page">
                  {crumb.name}
                </span>
              )}
              <meta itemProp="position" content={String(idx + 1)} />

              {!isLast && (
                <ChevronRight size={13} className="breadcrumb-separator" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import { lazy } from 'react';

export const clientComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  header: lazy(() => import('./header/Header')),
};
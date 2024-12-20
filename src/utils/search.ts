import { devRoutes } from '../routes/dev.routes';
import { imageRoutes } from '../routes/image.routes';
import { mediaRoutes } from '../routes/media.routes';
import { pdfRoutes } from '../routes/pdf.routes';
import { qrRoutes } from '../routes/qr.routes';
import { textRoutes } from '../routes/text.routes';
import { utilityRoutes } from '../routes/utility.routes';
import { Route } from '../types/routes';

// Combine all routes
const allRoutes: Route[] = [
  ...devRoutes,
  ...imageRoutes,
  ...mediaRoutes,
  ...pdfRoutes,
  ...qrRoutes,
  ...textRoutes,
  ...utilityRoutes,
];

export function searchTools(query: string): Route[] {
  const searchTerms = query.toLowerCase().split(' ');
  
  return allRoutes.filter(route => {
    const titleMatch = route.title.toLowerCase();
    const descriptionMatch = route.description?.toLowerCase() || '';
    
    return searchTerms.every(term => 
      titleMatch.includes(term) || descriptionMatch.includes(term)
    );
  }).slice(0, 10); // Limit to top 10 results
}
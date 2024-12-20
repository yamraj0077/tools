import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tool } from '../types/tools';

export function useToolNavigation() {
  const navigate = useNavigate();

  const handleToolClick = useCallback((tool: Tool) => {
    const routeMap: Record<string, string> = {
      'PDF Tools': '/pdf',
      'Image Tools': '/image',
      'Text Tools': '/text',
      'Media Tools': '/media',
      'Developer Tools': '/dev',
      'QR Tools': '/qr',
      'Utilities': '/utility',
    };

    const route = routeMap[tool.title];
    if (route) {
      navigate(route);
    } else {
      console.log(`Navigation for ${tool.title} not implemented yet`);
    }
  }, [navigate]);

  return { handleToolClick };
}
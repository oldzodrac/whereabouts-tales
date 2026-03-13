import { useEffect, useState } from 'react';
import yaml from 'js-yaml';

const AdminCMS = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initCMS = async () => {
      try {
        // Unregister service workers to prevent auth interception
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            await registration.unregister();
            console.log('Service Worker unregistered to prevent auth interception.');
          }
        }

        const response = await fetch('/admin/config.yml');
        const configText = await response.text();
        const config = yaml.load(configText) as any;
        
        // Dynamically import Decap CMS
        const CMS = (await import('decap-cms-app')).default;
        
        // Initialize CMS with the loaded config
        CMS.init({ config });
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize Decap CMS:', error);
        setLoading(false);
      }
    };

    initCMS();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-medium text-gray-600">Loading Content Manager...</div>
      </div>
    );
  }

  return <div id="nc-root" />;
};

export default AdminCMS;

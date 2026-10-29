import { Facebook, Instagram } from 'lucide-react';
import TikTokIcon from '../components/ui/icons/TikTokIcon';
import { SITE } from '../config/site';

// Íconos de cada red. Solo se muestran las que tienen link en config/site.js.
export const SOCIAL_LINKS = [
  { href: SITE.social.instagram, label: 'Instagram', icon: Instagram },
  { href: SITE.social.facebook, label: 'Facebook', icon: Facebook },
  { href: SITE.social.tiktok, label: 'TikTok', icon: TikTokIcon },
].filter((link) => link.href);

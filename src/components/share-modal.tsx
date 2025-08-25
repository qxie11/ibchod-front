'use client';

import { Facebook, Link, Linkedin, Mail, Share2, Twitter } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  excerpt?: string;
}

export function ShareModal({ isOpen, onClose, title, url, excerpt }: ShareModalProps) {
  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'bg-black hover:bg-gray-800',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(excerpt || '')}%0A%0A${encodeURIComponent(url)}`,
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (_err) {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Odkaz byl zkopírován do schránky!');
    }
  };

  const handleShare = (href: string) => {
    window.open(href, '_blank', 'width=600,height=400');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Sdílet článek
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {shareLinks.map((link) => (
              <Button
                key={link.name}
                variant="outline"
                className={`${link.color} text-white border-0 hover:scale-105 transition-transform`}
                onClick={() => handleShare(link.href)}
              >
                <link.icon className="w-4 h-4 mr-2" />
                {link.name}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={copyToClipboard}>
              <Link className="w-4 h-4 mr-2" />
              Zkopírovat odkaz
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

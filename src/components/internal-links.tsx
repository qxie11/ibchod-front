'use client';

import { ArrowRight, ExternalLink } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

interface InternalLink {
  title: string;
  description: string;
  url: string;
  category: string;
  isExternal?: boolean;
}

interface InternalLinksProps {
  links: InternalLink[];
  title?: string;
  description?: string;
}

export function InternalLinks({
  links,
  title = 'Užitečné odkazy',
  description = 'Další články a informace, které by vás mohly zajímat',
}: InternalLinksProps) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200" aria-labelledby="internal-links">
      <Title variant="h2" id="internal-links" className="text-2xl font-bold mb-2">
        {title}
      </Title>
      <Text className="text-gray-600 mb-6">{description}</Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link, index) => (
          <article
            key={index}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {link.category}
                  </Badge>
                  {link.isExternal && <ExternalLink className="w-3 h-3 text-gray-400" />}
                </div>

                <Title variant="h3" className="text-lg font-semibold mb-2">
                  {link.title}
                </Title>

                <Text className="text-gray-600 text-sm mb-3">{link.description}</Text>

                <Button
                  variant="ghost"
                  size="sm"
                  href={link.url}
                  className="flex items-center gap-1 text-sm"
                  target={link.isExternal ? '_blank' : '_self'}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                >
                  Přečíst více
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

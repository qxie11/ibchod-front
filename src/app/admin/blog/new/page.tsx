import type { Metadata } from 'next';

import CreateBlogArticlePage from '@/pages-components/admin/blog/new/page';

export const metadata: Metadata = {
  title: 'Nový článek | Admin Panel',
  description: 'Vytvoření nového článku',
};

export default function Page() {
  return <CreateBlogArticlePage />;
}

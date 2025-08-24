import type { Metadata } from 'next';

import AdminBlogPage from '@/pages-components/admin/blog/page';

export const metadata: Metadata = {
  title: 'Správa blogu | Admin Panel',
  description: 'Správa článků blogu',
};

export default async function Page() {
  return <AdminBlogPage />;
}

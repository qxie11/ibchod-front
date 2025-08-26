export const SEO_CONSTANTS = {
  SITE_NAME: 'IObchod',
  SITE_URL: 'https://iobchod.cz',
  SITE_DESCRIPTION:
    'Specializujeme se na prodej repasovaných iPhone a Apple zařízení. Kvalitní produkty za dostupné ceny s kompletní zárukou.',
  SITE_KEYWORDS: [
    'iPhone',
    'Apple',
    'repasované telefony',
    'mobilní telefony',
    'smartphone',
    'iOS',
    'Apple zařízení',
    'udržitelnost',
    'ekologie',
    'technologie',
    'IObchod',
    'Česká republika',
  ],

  KEYWORDS: {
    IPHONE: [
      'iPhone 15',
      'iPhone 15 Pro',
      'iPhone 15 Pro Max',
      'iPhone 14',
      'iPhone 13',
      'iPhone 12',
      'iPhone 11',
      'iPhone SE',
      'iOS 17',
      'Apple iPhone',
      'iPhone recenze',
      'iPhone porovnání',
      'iPhone nákup',
      'iPhone tipy',
      'iPhone příslušenství',
    ],
    APPLE: [
      'Apple',
      'Apple Store',
      'Apple ekosystém',
      'Apple Watch',
      'AirPods',
      'iPad',
      'Mac',
      'Apple Music',
      'iCloud',
      'Apple ID',
      'Face ID',
      'Touch ID',
      'Siri',
    ],
    SUSTAINABILITY: [
      'udržitelnost',
      'ekologie',
      'repasované',
      'recyklace',
      'zelené technologie',
      'environmentální dopad',
      'udržitelný rozvoj',
      'ekologické produkty',
      'zelené nakupování',
    ],
    TECHNOLOGY: [
      'technologie',
      'mobilní technologie',
      'smartphone',
      'mobilní telefony',
      'digitální technologie',
      'inovace',
      'budoucnost technologií',
      'AI',
      'umělá inteligence',
      '5G',
      '6G',
    ],
  },

  STRUCTURED_DATA: {
    ORGANIZATION: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'IObchod',
      url: 'https://iobchod.cz',
      logo: 'https://iobchod.cz/logo.png',
      description: 'Specializujeme se na prodej repasovaných iPhone a Apple zařízení.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CZ',
        addressLocality: 'Praha',
        addressRegion: 'Praha',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@iobchod.cz',
      },
      sameAs: [
        'https://facebook.com/iobchod',
        'https://instagram.com/iobchod',
        'https://twitter.com/iobchod',
      ],
    },
    WEBSITE: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'IObchod',
      url: 'https://iobchod.cz',
      description: 'Specializujeme se na prodej repasovaných iPhone a Apple zařízení.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://iobchod.cz/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  },

  // Open Graph настройки
  OPEN_GRAPH: {
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'IObchod',
    images: [
      {
        url: 'https://iobchod.cz/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IObchod - Repasované iPhone a Apple zařízení',
      },
    ],
  },

  // Twitter Card настройки
  TWITTER: {
    card: 'summary_large_image',
    site: '@iobchod',
    creator: '@iobchod',
  },

  // Настройки для роботов
  ROBOTS: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Внутренние ссылки для SEO
  INTERNAL_LINKS: {
    BLOG: [
      {
        title: 'Blog o iPhone a technologiích',
        description: 'Nejnovější články, tipy a recenze',
        url: '/blog',
        category: 'Blog',
      },
    ],
    PRODUCTS: [
      {
        title: 'Repasované iPhone',
        description: 'Kvalitní repasované telefony s zárukou',
        url: '/products',
        category: 'Produkty',
      },
    ],
    SUPPORT: [
      {
        title: 'Podpora a záruka',
        description: 'Informace o záruce a podpoře',
        url: '/support',
        category: 'Podpora',
      },
    ],
  },
};

// Функции для генерации SEO метаданных
export const generateSEOMetadata = (page: string, customData?: any) => {
  const baseMetadata = {
    title: `${page} | ${SEO_CONSTANTS.SITE_NAME}`,
    description: SEO_CONSTANTS.SITE_DESCRIPTION,
    keywords: SEO_CONSTANTS.SITE_KEYWORDS.join(', '),
    openGraph: {
      ...SEO_CONSTANTS.OPEN_GRAPH,
      title: `${page} | ${SEO_CONSTANTS.SITE_NAME}`,
      description: SEO_CONSTANTS.SITE_DESCRIPTION,
    },
    twitter: {
      ...SEO_CONSTANTS.TWITTER,
      title: `${page} | ${SEO_CONSTANTS.SITE_NAME}`,
      description: SEO_CONSTANTS.SITE_DESCRIPTION,
    },
    robots: SEO_CONSTANTS.ROBOTS,
  };

  return customData ? { ...baseMetadata, ...customData } : baseMetadata;
};

// Функция для генерации структурированных данных
export const generateStructuredData = (
  type: 'organization' | 'website' | 'article',
  data?: any
) => {
  const baseData =
    SEO_CONSTANTS.STRUCTURED_DATA[type.toUpperCase() as keyof typeof SEO_CONSTANTS.STRUCTURED_DATA];

  if (data) {
    return { ...baseData, ...data };
  }

  return baseData;
};

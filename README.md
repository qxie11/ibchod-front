# IObchod - iPhone Store

Moderní Next.js e-commerce aplikace pro prodej iPhone s dynamickým sitemapem a kompletním českým překladem.

## Funkce

- Dynamické generování sitemap s produktovými stránkami
- Komplexní české SEO metadata pro všechny stránky
- SEO optimalizovaný robots.txt
- Katalog produktů s filtrováním a vyhledáváním
- Funkce nákupního košíku
- Administrační panel pro správu produktů
- Responzivní design
- Kompletní český překlad celého rozhraní

## SEO Implementation

### Sitemap Implementation

The application includes a dynamic sitemap that automatically generates URLs for:

- **Static Routes**: Homepage, cart, checkout pages
- **Dynamic Product Routes**: Individual product pages based on your product database

### Sitemap Features

- **Automatic Generation**: Sitemap is generated at build time and on-demand
- **Daily Revalidation**: Automatically updates every 24 hours to include new products
- **Product Integration**: Fetches all products from your API to create product URLs
- **SEO Optimized**: Includes proper priorities and change frequencies
- **Error Handling**: Gracefully handles API failures
- **Environment Aware**: Adapts to different environments (development/production)
- **Caching**: Optimized with Next.js caching for better performance

### České SEO Metadata

Všechny stránky obsahují komplexní české SEO metadata:

- **Hlavní stránka**: Úvodní stránka s katalogem produktů
- **Produktové stránky**: Dynamická metadata založená na informacích o produktu
- **Stránka košíku**: Nákupní košík s no-index pro soukromí
- **Stránka pokladny**: Dokončení objednávky s no-index pro soukromí
- **Administrační stránky**: Administrační panel s no-index pro bezpečnost

#### Funkce Metadata

- **Český jazyk**: Všechny titulky, popisy a klíčová slova v češtině
- **Open Graph**: Optimalizace pro sdílení na sociálních sítích
- **Twitter Cards**: Optimalizace pro sdílení na Twitteru
- **Canonical URLs**: Správná struktura canonical URL
- **Robots Control**: Vhodné indexování pro veřejné/soukromé stránky
- **Obrázky produktů**: Dynamické obrázky produktů pro sociální sdílení

### Accessing the Sitemap

- **Sitemap**: `https://your-domain.com/sitemap.xml`
- **Robots.txt**: `https://your-domain.com/robots.txt`

### Configuration

Update the base URL in `src/app/sitemap.ts` and `src/app/robots.ts`:

```typescript
const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://your-actual-domain.com' // Replace this
    : 'http://localhost:3000');
```

### Revalidation Settings

The sitemap and robots.txt are configured to revalidate every 24 hours:

```typescript
// In src/app/sitemap.ts and src/app/robots.ts
export const revalidate = 86400; // 24 hours in seconds
```

You can adjust the revalidation frequency by changing this value:

- `3600` = 1 hour
- `86400` = 24 hours (current setting)
- `604800` = 1 week

## Začínáme

1. Instalace závislostí:

   ```bash
   npm install
   ```

2. Nastavení proměnných prostředí:

   ```bash
   NEXT_PUBLIC_API_URL=your-api-base-url
   ```

3. Spuštění vývojového serveru:

   ```bash
   npm run dev
   ```

4. Přístup k sitemap na `http://localhost:3000/sitemap.xml`

## Build a Deploy

Sitemap bude automaticky vygenerován během procesu build a bude dostupný na `/sitemap.xml` na vašem nasazeném webu.

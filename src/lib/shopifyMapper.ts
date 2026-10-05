import type { Book, Language, CategoryId } from '@/types';
import type { ShopifyProductNode } from './shopify';

// Fallback cover colors used when no real image is available
const COVER_COLORS = [
  { color: '#3D2B1F', accent: '#B8860B' },
  { color: '#6B4A2F', accent: '#C9A227' },
  { color: '#4A3526', accent: '#C0AB8E' },
  { color: '#8B4513', accent: '#D4AF37' },
  { color: '#9A5A12', accent: '#E0C560' },
  { color: '#8B7355', accent: '#D4AF37' },
  { color: '#2A1B12', accent: '#B8860B' },
  { color: '#6B4A2F', accent: '#E0C560' },
];

function pickCoverColors(handle: string): { color: string; accent: string } {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 5) - hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % COVER_COLORS.length;
  return COVER_COLORS[idx];
}

function parseLanguageFromVariant(variantTitle: string): Language {
  const v = variantTitle.toUpperCase().trim();
  if (v.startsWith('MAR') || v.includes('MARATHI')) return 'Marathi';
  if (v.startsWith('HIN') || v.includes('HINDI')) return 'Hindi';
  if (v.startsWith('SAN') || v.includes('SANSKRIT')) return 'Sanskrit';
  if (v.startsWith('ENG')) return 'English';
  return 'Marathi';
}

function parseAuthorFromDescription(description: string): string {
  const trimmed = description.trim();
  const match = trimmed.match(/^(?:WRITTEN BY|BY)\s+(.+)$/i);
  if (match) {
    return match[1].trim();
  }
  return '';
}

function guessCategoryFromTitle(title: string): CategoryId {
  const t = title.toLowerCase();
  if (t.includes('गीता') || t.includes('gita') || t.includes('bhagavad')) return 'bhagavad-gita';
  if (t.includes('वेद') || t.includes('veda')) return 'vedas';
  if (t.includes('उपनिषद') || t.includes('upanishad')) return 'upanishads';
  if (t.includes('पुराण') || t.includes('puran')) return 'puranas';
  if (t.includes('रामायण') || t.includes('ramayan')) return 'ramayana';
  if (t.includes('महाभारत') || t.includes('mahabharat')) return 'mahabharata';
  if (t.includes('दुर्गा') || t.includes('durga') || t.includes('देवी') || t.includes('माहात्म्य')) return 'puranas';
  if (t.includes('गणेश') || t.includes('ganesh')) return 'mantras-stotras';
  if (t.includes('यंत्र') || t.includes('yantra') || t.includes('श्रीविद्या') || t.includes('चक्र')) return 'mantras-stotras';
  if (t.includes('मंत्र') || t.includes('mantra') || t.includes('सूक्त') || t.includes('पुरुष')) return 'mantras-stotras';
  if (t.includes('अमृतानुभव') || t.includes('amrutanubhav')) return 'spirituality';
  if (t.includes('ज्योत') || t.includes('आत्म')) return 'spirituality';
  return 'spirituality';
}

export function mapShopifyProductToBook(node: ShopifyProductNode): Book {
  const firstVariant = node.variants.edges[0]?.node;
  const price = firstVariant ? parseFloat(firstVariant.price.amount) : 0;
  const firstImage = node.images.edges[0]?.node;

  const coverColors = pickCoverColors(node.handle);

  const language = firstVariant
    ? parseLanguageFromVariant(firstVariant.title)
    : 'Marathi';

  const author = parseAuthorFromDescription(node.description) || 'Unknown Author';

  return {
    id: node.handle,
    title: node.title,
    author,
    publication: 'Pradnyesh Prakashan',
    language,
    price,
    category: guessCategoryFromTitle(node.title),
    coverColor: coverColors.color,
    coverAccent: coverColors.accent,
    description: node.description,
    pages: 0,
    format: 'Paperback',
    featured: false,
    imageUrl: firstImage?.url,
    onlineStoreUrl: node.onlineStoreUrl || undefined,
    availableForSale: firstVariant?.availableForSale ?? true,
    variantId: firstVariant?.id,
  };
}

export function mapShopifyProductsToBooks(nodes: ShopifyProductNode[]): Book[] {
  return nodes.map(mapShopifyProductToBook);
}

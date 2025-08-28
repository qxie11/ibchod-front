import { Clock, Heart, Mail, MapPin, Shield, Truck } from 'lucide-react';

import React from 'react';

import Link from 'next/link';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import Container from '@/shared/ui/container';

export function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white">
      {/* Main Footer Content */}
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍎</span>
              <span className="text-xl font-bold">IObchod</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Váš spolehlivý partner pro kvalitní repasované iPhony. Udržitelná volba s plnou
              zárukou a rychlým doručením.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-blue-600 text-white">
                <Shield className="w-3 h-3 mr-1" />3 měsíců záruka
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Rychlé odkazy</h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                O nás
              </Link>
              <a
                href="/products"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Produkty
              </a>
              <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/cart" className="block text-gray-300 hover:text-white transition-colors">
                Košík
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Zákaznický servis</h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Jak to funguje
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Obchodní podmínky
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Reklamace a vrácení
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Ochrana osobních údajů
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <Link href="mailto:info@iobchod.cz" className="hover:text-white transition-colors">
                  info@iobchod.cz
                </Link>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <a
                  href="https://wa.me/420722179379"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-green-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <span>+420 722 179 379</span>
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Praha, Česká republika</span>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Váš email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm focus:outline-none focus:border-blue-500"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Odeslat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Features Bar */}
      <div className="border-t border-gray-800">
        <Container>
          <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 text-center md:text-left">
              <Truck className="w-6 h-6 text-blue-400" />
              <div>
                <div className="font-medium">Rychlé doručení</div>
                <div className="text-sm text-gray-400">24-48 hodin</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <Shield className="w-6 h-6 text-green-400" />
              <div>
                <div className="font-medium">Plná záruka</div>
                <div className="text-sm text-gray-400">3 měsíců</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <Clock className="w-6 h-6 text-purple-400" />
              <div>
                <div className="font-medium">Podpora 24/7</div>
                <div className="text-sm text-gray-400">Vždy k dispozici</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <Heart className="w-6 h-6 text-red-400" />
              <div>
                <div className="font-medium">Udržitelnost</div>
                <div className="text-sm text-gray-400">Šetříme planetu</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <Container>
          <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} IObchod. Všechna práva vyhrazena.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <span>Vyrobeno s ❤️ v České republice</span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

import { Clock, Heart, Mail, MapPin, Phone, Shield, Truck } from 'lucide-react';

import React from 'react';

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
                <Shield className="w-3 h-3 mr-1" />
                12 měsíců záruka
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Rychlé odkazy</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                O nás
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Jak to funguje
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Často kladené otázky
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Blog
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Zákaznický servis</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Obchodní podmínky
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Reklamace a vrácení
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Ochrana osobních údajů
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@iobchod.cz" className="hover:text-white transition-colors">
                  info@iobchod.cz
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+420 123 456 789</span>
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
                <div className="text-sm text-gray-400">12 měsíců</div>
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

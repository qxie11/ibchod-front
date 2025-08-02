import React from 'react';

import Container from '@/shared/ui/container';

export function Footer() {
  return (
    <footer className="w-full bg-muted border-t mt-16">
      <Container>
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold text-primary mb-2">IObchod.cz</span>
            <span className="text-sm text-muted-foreground">Repasované iPhony se zárukou</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-semibold text-sm">Kontakt</span>
            <a
              href="mailto:info@iobchod.cz"
              className="text-sm text-muted-foreground hover:underline"
            >
              info@iobchod.cz
            </a>
            <a href="tel:+420123456789" className="text-sm text-muted-foreground hover:underline">
              +420 123 456 789
            </a>
          </div>
          <div className="flex flex-col items-center gap-1">
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Obchodní podmínky
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Reklamace
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Kontakt
            </a>
          </div>
        </div>
      </Container>
      <div className="text-center text-xs text-muted-foreground py-2 border-t">
        © {new Date().getFullYear()} IObchod.cz. Všechna práva vyhrazena.
      </div>
    </footer>
  );
}

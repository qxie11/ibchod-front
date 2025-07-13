import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-muted border-t mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-bold text-primary mb-2">iPhony.cz</span>
          <span className="text-sm text-muted-foreground">Repasované iPhony se zárukou</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-semibold text-sm">Kontakt</span>
          <a href="mailto:info@iphony.cz" className="text-sm text-muted-foreground hover:underline">
            info@iphony.cz
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
      <div className="text-center text-xs text-muted-foreground py-2 border-t">
        © {new Date().getFullYear()} iPhony.cz. Všechna práva vyhrazena.
      </div>
    </footer>
  );
}

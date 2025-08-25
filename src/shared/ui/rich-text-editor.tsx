'use client';

import dynamic from 'next/dynamic';

import { Label } from './label';

const TipTapEditor = dynamic(() => import('./tiptap-editor').then((mod) => mod.TipTapEditor), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-md" />,
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Zadejte obsah...',
  label,
  required = false,
  className = '',
  disabled = false,
}: RichTextEditorProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label className={disabled ? 'text-gray-400' : ''}>
          {label} {required && '*'}
        </Label>
      )}

      <TipTapEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />

      <p className="text-sm text-gray-500">
        Použijte panel nástrojů pro formátování textu. Podporované formáty: nadpisy, tučné, kurzíva,
        podtržené, přeškrtnuté, seznamy, odkazy, citace, bloky kódu, zvýraznění, barvy textu a
        zarovnání.
      </p>
    </div>
  );
}

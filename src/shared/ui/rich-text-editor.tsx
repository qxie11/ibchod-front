'use client';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Eye,
  Heading2,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Underline,
} from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import { Button } from './button';
import { HtmlContent } from './html-content';
import { Label } from './label';
import { Separator } from './separator';
import { Textarea } from './textarea';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Zadejte obsah...',
  label,
  required = false,
  className = '',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    if (editorRef.current && !isHtmlMode && !isPreviewMode) {
      editorRef.current.innerHTML = value || '';
      // Убеждаемся, что направление текста правильное
      editorRef.current.style.direction = 'ltr';
      editorRef.current.style.textAlign = 'left';
    }
  }, [value, isHtmlMode, isPreviewMode]);

  const execCommand = (command: string, value?: string) => {
    if (isHtmlMode || isPreviewMode) return;

    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateValue();
  };

  const updateValue = () => {
    if (editorRef.current && !isHtmlMode && !isPreviewMode) {
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  const handleEditorInput = () => {
    updateValue();
  };

  const handleEditorBlur = () => {
    updateValue();
  };

  const handleEditorPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const insertLink = () => {
    if (isHtmlMode || isPreviewMode) return;

    const url = prompt('Zadejte URL odkazu:');
    if (url) {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        execCommand('createLink', url);
      } else {
        execCommand(
          'insertHTML',
          `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
        );
      }
    }
  };

  const insertList = (ordered: boolean) => {
    if (isHtmlMode || isPreviewMode) return;

    const tag = ordered ? 'ol' : 'ul';
    execCommand('insertHTML', `<${tag}><li></li></${tag}>`);
  };

  const insertHeading = () => {
    if (isHtmlMode || isPreviewMode) return;

    execCommand('insertHTML', '<h2></h2>');
  };

  const insertQuote = () => {
    if (isHtmlMode || isPreviewMode) return;

    execCommand('insertHTML', '<blockquote></blockquote>');
  };

  const toolbarButtons = [
    {
      icon: Bold,
      label: 'Tučné',
      action: () => execCommand('bold'),
    },
    {
      icon: Italic,
      label: 'Kurzíva',
      action: () => execCommand('italic'),
    },
    {
      icon: Underline,
      label: 'Podtržené',
      action: () => execCommand('underline'),
    },
    {
      icon: Heading2,
      label: 'Nadpis',
      action: insertHeading,
    },
    {
      icon: List,
      label: 'Seznam',
      action: () => insertList(false),
    },
    {
      icon: ListOrdered,
      label: 'Číslovaný seznam',
      action: () => insertList(true),
    },
    {
      icon: Quote,
      label: 'Citace',
      action: insertQuote,
    },
    {
      icon: Link,
      label: 'Odkaz',
      action: insertLink,
    },
    {
      icon: AlignLeft,
      label: 'Vlevo',
      action: () => execCommand('justifyLeft'),
    },
    {
      icon: AlignCenter,
      label: 'Na střed',
      action: () => execCommand('justifyCenter'),
    },
    {
      icon: AlignRight,
      label: 'Vpravo',
      action: () => execCommand('justifyRight'),
    },
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor="rich-text-editor">
          {label} {required && '*'}
        </Label>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border border-gray-200 rounded-t-md bg-gray-50">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
            disabled={isHtmlMode || isPreviewMode}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}

        <Separator orientation="vertical" className="h-6" />

        <Button
          type="button"
          variant={isHtmlMode ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            setIsHtmlMode(!isHtmlMode);
            setIsPreviewMode(false);
          }}
          title={isHtmlMode ? 'Přepnout na WYSIWYG' : 'HTML režim'}
          className="h-8 px-2"
        >
          <Code className="h-4 w-4" />
          <span className="ml-1 text-xs">HTML</span>
        </Button>

        <Button
          type="button"
          variant={isPreviewMode ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            setIsPreviewMode(!isPreviewMode);
            setIsHtmlMode(false);
          }}
          title={isPreviewMode ? 'Přepnout na editaci' : 'Náhled'}
          className="h-8 px-2"
        >
          <Eye className="h-4 w-4" />
          <span className="ml-1 text-xs">Náhled</span>
        </Button>
      </div>

      {/* Content Area */}
      {isPreviewMode ? (
        <div className="border border-gray-200 rounded-b-md min-h-[200px] p-4 bg-white">
          {value ? (
            <HtmlContent content={value} />
          ) : (
            <p className="text-gray-400 italic">{placeholder}</p>
          )}
        </div>
      ) : isHtmlMode ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-t-none min-h-[200px] font-mono text-sm"
          required={required}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleEditorInput}
          onBlur={handleEditorBlur}
          onPaste={handleEditorPaste}
          className="border border-gray-200 rounded-b-md min-h-[200px] p-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent prose prose-sm max-w-none [direction:ltr] [text-align:left]"
          style={{
            minHeight: '200px',
            overflowY: 'auto',
            direction: 'ltr',
            textAlign: 'left',
          }}
          suppressContentEditableWarning
        >
          {!value && <span className="text-gray-400">{placeholder}</span>}
        </div>
      )}

      {/* Help text */}
      <p className="text-sm text-gray-500">
        {isHtmlMode
          ? 'Zadejte HTML kód přímo. Použijte tlačítko HTML pro přepnutí zpět na WYSIWYG editor.'
          : isPreviewMode
            ? "Náhled formátovaného obsahu. Klikněte na 'Náhled' pro návrat k editaci."
            : "Použijte tlačítka v liště pro formátování textu. Klikněte na 'HTML' pro přepnutí do HTML režimu nebo 'Náhled' pro zobrazení výsledku."}
      </p>
    </div>
  );
}

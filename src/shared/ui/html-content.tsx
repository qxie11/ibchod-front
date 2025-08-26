'use client';

import DOMPurify from 'dompurify';

import { useMemo } from 'react';

interface HtmlContentProps {
  content: string;
  className?: string;
}

export function HtmlContent({ content, className = '' }: HtmlContentProps) {
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'br',
        'div',
        'span',
        'strong',
        'b',
        'em',
        'i',
        'u',
        's',
        'ul',
        'ol',
        'li',
        'blockquote',
        'pre',
        'code',
        'a',
        'img',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'hr',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'class', 'id', 'style'],
      ALLOW_DATA_ATTR: false,
    });
  }, [content]);

  return (
    <div
      className={`
        prose prose-lg max-w-none
        prose-headings:text-gray-900 prose-headings:font-bold
        prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-2
        prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:text-gray-800
        prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5 prose-h3:text-gray-800
        prose-h4:text-lg prose-h4:mb-3 prose-h4:mt-4 prose-h4:text-gray-800
        prose-h5:text-base prose-h5:mb-2 prose-h5:mt-3 prose-h5:text-gray-800
        prose-h6:text-sm prose-h6:mb-2 prose-h6:mt-3 prose-h6:text-gray-800
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium hover:prose-a:text-blue-800 hover:prose-a:underline
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-em:text-gray-800 prose-em:italic
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:rounded-r-lg
        prose-blockquote p:text-gray-700 prose-blockquote p:mb-0
        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
        prose-li:text-gray-700 prose-li:leading-relaxed
        prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
        prose-pre code:bg-transparent prose-pre code:text-gray-100 prose-pre code:p-0
        prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
        prose-table:border-collapse prose-table:w-full prose-table:my-6
        prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900
        prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-3 prose-td:text-gray-700
        prose-hr:border-gray-300 prose-hr:my-8
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}

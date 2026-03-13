import { PortableText, PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-serif font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-serif font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-serif font-bold mt-6 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-white/70">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-gold pl-4 italic my-6 text-brand-gold">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
  },
};

interface ContentRendererProps {
  value: any;
}

export default function ContentRenderer({ value }: ContentRendererProps) {
  return (
    <div className="prose prose-invert prose-gold max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}

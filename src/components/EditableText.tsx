import { useEffect, useRef, useState, type ReactNode } from 'react';

type EditableTextProps = {
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'li';
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
};

export default function EditableText({
  as: Tag = 'p',
  value,
  onChange,
  className = '',
  placeholder = 'Click to edit...',
  multiline = false,
}: EditableTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
    if (ref.current) {
      const newText = ref.current.innerText.trim();
      if (newText !== value) {
        onChange(newText);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      if (ref.current) ref.current.innerText = value;
      (e.target as HTMLElement).blur();
    }
  };

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement & HTMLLIElement>}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onFocus={() => setEditing(true)}
      onKeyDown={handleKeyDown}
      className={`cursor-text transition-colors ${className}`}
      data-placeholder={placeholder}
    >
      {value}
    </Tag>
  );
}

export type { EditableTextProps, ReactNode };

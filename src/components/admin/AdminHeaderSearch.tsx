import { useState, useEffect, useRef } from "preact/hooks";
import { Search } from "lucide-preact";

export interface AdminHeaderSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  shortcut?: string;
}

/** Ctrl+K 対応のヘッダー検索コンポーネント */
export function AdminHeaderSearch({
  placeholder = "検索...",
  onSearch,
  shortcut = "Ctrl+K",
}: AdminHeaderSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSearch?.(query);
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        class="sc-admin-header-action"
        onClick={() => setOpen(true)}
        type="button"
        title={`検索 (${shortcut})`}
      >
        <Search size={18} />
        <span class="sc-admin-header-action__shortcut">{shortcut}</span>
      </button>
      {open && (
        <>
          <div class="sc-admin-search-overlay" onClick={() => setOpen(false)} />
          <div class="sc-admin-search-modal">
            <form onSubmit={handleSubmit}>
              <div class="sc-admin-search-modal__input-wrap">
                <Search size={18} />
                <input
                  ref={inputRef}
                  type="text"
                  class="sc-admin-search-modal__input"
                  placeholder={placeholder}
                  value={query}
                  onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
                />
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

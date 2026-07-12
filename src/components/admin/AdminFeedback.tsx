import { useState, useRef } from "preact/hooks";
import { MessageSquare, ImagePlus } from "lucide-preact";

export interface AdminFeedbackProps {
  /** 現在のページタイトル（自動表示） */
  pageTitle?: string;
  /** 送信コールバック */
  onSubmit?: (data: {
    message: string;
    type: "bug" | "feature" | "other";
    screenshot?: File;
  }) => void | Promise<void>;
  /** プレースホルダー */
  placeholder?: string;
}

/** Feedback Popover フォームコンポーネント */
export function AdminFeedback({
  pageTitle,
  onSubmit,
  placeholder = "フィードバックを入力...",
}: AdminFeedbackProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"bug" | "feature" | "other">("other");
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const types = [
    { value: "bug" as const, label: "🐛 バグ報告" },
    { value: "feature" as const, label: "💡 機能要望" },
    { value: "other" as const, label: "💬 その他" },
  ];

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    try {
      await onSubmit?.({
        message,
        type,
        screenshot: file ?? undefined,
      });
      setMessage("");
      setFile(null);
      setType("other");
      setOpen(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <div class="sc-admin-feedback" ref={ref}>
      <button
        class="sc-admin-header-action sc-admin-header-action--label"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <MessageSquare size={16} />
        <span>Feedback</span>
      </button>
      {open && (
        <div class="sc-admin-feedback__popover">
          <form onSubmit={handleSubmit}>
            {pageTitle && (
              <div class="sc-admin-feedback__page-title">
                📄 {pageTitle}
              </div>
            )}
            <div class="sc-admin-feedback__types">
              {types.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  class={`sc-admin-feedback__type-btn${type === t.value ? " sc-admin-feedback__type-btn--active" : ""}`}
                  onClick={() => setType(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <textarea
              class="sc-admin-feedback__textarea"
              placeholder={placeholder}
              value={message}
              onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
              rows={4}
            />
            <div class="sc-admin-feedback__actions">
              <button
                type="button"
                class="sc-admin-feedback__attach-btn"
                onClick={() => fileRef.current?.click()}
                title="画像を添付"
              >
                <ImagePlus size={16} />
                {file && <span class="sc-admin-feedback__file-name">{file.name}</span>}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style="display:none"
                onChange={(e) => {
                  const f = (e.target as HTMLInputElement).files?.[0];
                  if (f) setFile(f);
                }}
              />
              <button
                type="submit"
                class="sc-admin-feedback__submit-btn"
                disabled={!message.trim() || sending}
              >
                {sending ? "送信中..." : "送信"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

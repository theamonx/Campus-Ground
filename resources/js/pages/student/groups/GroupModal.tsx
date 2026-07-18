import { useEffect, useRef, type ChangeEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import { CreateGroupInput, GroupCategory, GroupPrivacy } from "../../../types";

type GroupModalProps = {
  open: boolean;
  onClose: () => void;
  form: CreateGroupInput;
  onChange: (next: Partial<CreateGroupInput>) => void;
  categories: GroupCategory[];
  creating: boolean;
  error: string;
  coverPreview: string;
  onCoverPreviewChange: (value: string) => void;
  onSubmit: () => void | Promise<boolean>;
};

const privacyOptions: { value: GroupPrivacy; label: string; description: string }[] = [
  { value: "public", label: "Public", description: "Visible to everyone on campus" },
  { value: "private", label: "Private", description: "Only members can view the group" },
];

export function GroupModal({
  open,
  onClose,
  form,
  onChange,
  categories,
  creating,
  error,
  coverPreview,
  onCoverPreviewChange,
  onSubmit,
}: GroupModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => fileInputRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleCoverUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onCoverPreviewChange(previewUrl);
    onChange({ coverImage: previewUrl });
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Create Group
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Build a new campus community space.</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary/60 transition-colors" aria-label="Close group modal">
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-4 p-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Group Name *</label>
              <input
                value={form.name}
                onChange={(event) => onChange({ name: event.target.value })}
                placeholder="e.g. AI Study Circle"
                className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Group Description</label>
              <textarea
                value={form.description}
                onChange={(event) => onChange({ description: event.target.value })}
                placeholder="What is this group about?"
                rows={4}
                className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary/50 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Group Category *</label>
              <select
                value={form.category}
                onChange={(event) => onChange({ category: event.target.value as GroupCategory })}
                className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary/50"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Privacy *</label>
              <div className="grid gap-2 sm:grid-cols-2">
                {privacyOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange({ privacy: option.value })}
                    className={`rounded-xl border p-3 text-left transition-colors ${form.privacy === option.value ? "border-primary/40 bg-primary/10" : "border-border hover:bg-secondary/50"}`}
                  >
                    <p className="text-sm font-semibold">{option.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Group Icon / Cover Image</label>
              <label className="border-2 border-dashed border-border rounded-2xl overflow-hidden h-72 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors bg-background/50" htmlFor="group-cover-upload">
                {coverPreview ? (
                  <img src={coverPreview} alt="Group cover preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImagePlus size={34} />
                    <p className="mt-3 text-sm font-medium">Upload cover image</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG</p>
                  </>
                )}
              </label>
              <input
                id="group-cover-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverUpload}
              />
            </div>

            <div className="rounded-2xl border border-border bg-secondary/20 p-4 text-sm text-muted-foreground">
              The current user will automatically become the owner and first member of the group.
            </div>
          </div>
        </div>

        {error && <div className="px-5 pb-2 text-sm text-red-400">{error}</div>}

        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border bg-secondary/10">
          <button onClick={onClose} className="px-5 py-2 rounded-xl border border-border text-sm font-medium hover:bg-secondary/60 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => void onSubmit()}
            disabled={creating || !form.name.trim()}
            className="px-5 py-2 rounded-xl bg-primary text-background text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? "Creating..." : "Create Group"}
          </button>
        </div>
      </div>
    </div>
  );
}

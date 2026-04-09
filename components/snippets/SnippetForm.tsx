"use client";

import { useState, KeyboardEvent } from "react";
import { SUPPORTED_LANGUAGES, type SnippetWithTags } from "@/types";

interface Props {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: SnippetWithTags;
}

const inputClass =
  "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all";

const labelClass = "block text-sm font-medium text-zinc-300 mb-1.5";

export function SnippetForm({ action, defaultValues }: Props) {
  const [tags, setTags] = useState<string[]>(
    defaultValues?.tags.map((t) => t.name) ?? []
  );
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const isEditing = !!defaultValues;

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />

      <div>
        <label htmlFor="title" className={labelClass}>
          Title <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={defaultValues?.title}
          placeholder="e.g. Debounce hook"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="language" className={labelClass}>
          Language <span className="text-red-400">*</span>
        </label>
        <select
          id="language"
          name="language"
          required
          defaultValue={defaultValues?.language ?? "typescript"}
          className={`${inputClass} bg-zinc-900`}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          defaultValue={defaultValues?.description ?? ""}
          placeholder="What does this snippet do?"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="code" className={labelClass}>
          Code <span className="text-red-400">*</span>
        </label>
        <textarea
          id="code"
          name="code"
          required
          rows={14}
          defaultValue={defaultValues?.code}
          placeholder="Paste your code here..."
          className={`${inputClass} font-mono resize-y leading-relaxed`}
        />
      </div>

      <div>
        <label className={labelClass}>Tags</label>
        <div className="flex flex-wrap gap-2 p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg min-h-[44px] focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-transparent transition-all">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-zinc-700 text-zinc-300 text-xs px-2.5 py-1 rounded-md"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-zinc-500 hover:text-zinc-200 transition-colors ml-0.5"
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={addTag}
            placeholder={tags.length === 0 ? "Type a tag, press Enter" : ""}
            className="flex-1 min-w-[140px] text-sm bg-transparent text-zinc-100 placeholder:text-zinc-600 outline-none"
          />
        </div>
        <p className="text-xs text-zinc-600 mt-1.5">Enter or comma to add · Backspace to remove</p>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {isEditing ? "Save changes" : "Create snippet"}
        </button>
        <a
          href={isEditing ? `/snippets/${defaultValues.id}` : "/snippets"}
          className="px-5 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

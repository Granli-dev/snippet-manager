"use client";

interface Props {
  action: (formData: FormData) => Promise<void>;
}

export function DeleteButton({ action }: Props) {
  return (
    <form action={action}>
      <button
        type="submit"
        className="text-sm text-red-500 hover:text-red-400 transition-colors"
        onClick={(e) => {
          if (!confirm("Delete this snippet?")) e.preventDefault();
        }}
      >
        Delete
      </button>
    </form>
  );
}

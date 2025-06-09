import { useState } from "react";

export default function SummaryForm() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSummary("");

    const res = await fetch("http://localhost:8000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setSummary((prev) => prev + chunk);
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        rows={10}
        className="w-full border p-2"
        required
      />
      <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Summarize
      </button>

      {loading && <p className="mt-4">Summarizing...</p>}
      {summary && (
        <div className="mt-4 p-4 border bg-gray-100 whitespace-pre-wrap">
          {summary}
        </div>
      )}
    </form>
  );
}

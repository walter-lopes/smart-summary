import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setSummary("");

    const response = await fetch("http://localhost:8000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (reader) {
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
        setSummary((prev) => prev + decoder.decode(value));
      }
    }

    setLoading(false);
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>🧠 Smart Summary App</h1>

        <textarea
          className={styles.textarea}
          placeholder="Paste your article, notes, or email here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || input.trim().length === 0}
          className={styles.button}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {summary && (
          <div className={styles.summarySection}>
            <h2 className={styles.summaryTitle}>📝 Summary:</h2>
            <div className={styles.summaryText}>{summary}</div>
          </div>
        )}
      </div>
    </main>
  );
}

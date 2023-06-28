import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [companyDescription, setCompanyDescription] = useState("");
  const [result, setResult] = useState();

  const [numWords, setNumWords] = useState(1);
  const [maxNumSyllables, setMaxNumSyllables] = useState(2);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: companyDescription, numWords: numWords, maxNumSyllables: maxNumSyllables }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      // setCompanyDescription("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Name My Company</title>
        <link rel="icon" href="/rocket.png" />
      </Head>

      <main className={styles.main}>
        <img src="/rocket.png" className={styles.icon} />
        <h3>Name My Company</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="company"
            placeholder="What does your company do?"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
          />


          <div># of words: {numWords}</div>
          <input
            type="range"
            min={1}
            max={3}
            value={numWords}
            onChange={(e) => setNumWords(e.target.value)}
          />
          <br />

          <div>Max. # of syllables per word: {maxNumSyllables}</div>
          <input
            type="range"
            min={1}
            max={4}
            value={maxNumSyllables}
            onChange={(e) => setMaxNumSyllables(e.target.value)}
          />
          <br />

          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

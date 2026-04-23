"use client";
import React, { useMemo } from "react";
import "./NorrisText.css";

interface NorrisTextProps {
  text: string;
  className?: string;
}

export default function NorrisText({ text, className = "" }: NorrisTextProps) {
  const words = useMemo(() => {
    // Split by words to allow natural line breaking
    return text.split(/(\s+)/);
  }, [text]);

  let globalCharIndex = 0;

  return (
    <span className={`norris-container ${className}`}>
      {words.map((word, wordIndex) => {
        if (word.trim() === "") {
          // This is a space or sequence of spaces
          globalCharIndex += word.length;
          // Use a non-breaking space if it's a single space, or use white-space: pre
          return <span key={wordIndex} style={{ whiteSpace: "pre" }}>{word}</span>;
        }

        // It's a word
        const chars = Array.from(word);
        
        return (
          <span key={wordIndex} className="norris-word">
            {chars.map((char, charIndex) => {
              const currentIndex = globalCharIndex++;
              return (
                <span
                  key={charIndex}
                  className="norris-char"
                  data-char={char}
                  style={{ "--index": currentIndex } as React.CSSProperties}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

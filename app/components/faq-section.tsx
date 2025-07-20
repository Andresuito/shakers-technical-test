"use client";

import { useState } from "react";
import { Card, Title, Stack, Collapse } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import type { FAQ, FAQSectionProps } from "../types";

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <div
      style={{
        border: "2px solid #edf7f6",
        borderRadius: "8px",
        marginBottom: "8px",
      }}
    >
      <button
        onClick={() => setOpened(!opened)}
        style={{
          width: "100%",
          padding: "12px 16px",
          backgroundColor: opened ? "#edf7f6" : "#ffffff",
          fontStyle: opened ? "italic" : "normal",
          border: "none",
          borderRadius: "8px",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 500,
          color: "#2c3e50",
        }}
      >
        <span>{question}</span>
        <IconChevronDown
          size={16}
          style={{
            transform: opened ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>
      <Collapse in={opened}>
        <div
          style={{
            backgroundColor: "#edf7f6",
            padding: "0px 16px 16px 16px",
            color: "#555e5c",
          }}
        >
          {answer}
        </div>
      </Collapse>
    </div>
  );
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <Card style={{ padding: 0 }}>
      <Title
        fw={400}
        order={3}
        style={{ color: "#033028", marginBottom: "12px", marginTop: "40px" }}
      >
        FAQ
      </Title>
      <Stack gap="xs">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            index={index}
          />
        ))}
      </Stack>
    </Card>
  );
}

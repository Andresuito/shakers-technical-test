"use client";

import { useState } from "react";
import { Card, Text, Badge, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import styles from "../style/TeamPositions.module.css";
import type { TeamPositionsProps } from "../types";

export default function TeamPositions({ positions }: TeamPositionsProps) {
  const [appliedPositions, setAppliedPositions] = useState<Set<number>>(
    new Set()
  );

  const handleApplyToggle = (positionId: number) => {
    const isCurrentlyApplied = appliedPositions.has(positionId);

    setAppliedPositions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(positionId)) {
        newSet.delete(positionId);
      } else {
        newSet.add(positionId);
      }
      return newSet;
    });

    if (isCurrentlyApplied) {
      notifications.show({
        withCloseButton: false,
        message: "Successfully withdrawn",
        color: "transparent",
        style: {
          borderRadius: "6px",
          backgroundColor: "#edf7f6",
          color: "#033028",
        },
      });
    } else {
      notifications.show({
        withCloseButton: false,
        message: "Successfully applied",
        color: "transparent",
        style: {
          borderRadius: "6px",
          backgroundColor: "#edf7f6",
          color: "#033028",
        },
      });
    }
  };

  if (!positions || positions.length === 0) {
    return (
      <Card padding="lg" radius="md">
        <Text className={styles.noPositionsText}>No positions available</Text>
      </Card>
    );
  }

  return (
    <div className={styles.positionsContainer}>
      {positions.map((position) => {
        const isApplied = appliedPositions.has(position.id);

        return (
          <Card
            key={position.id}
            padding="lg"
            radius="md"
            withBorder
            className={styles.positionCard}
          >
            {isApplied && (
              <div className={styles.appliedBadge}>
                <div className={styles.appliedBadgeContent}>
                  <IconCheck size={16} />
                  Applied
                </div>
              </div>
            )}

            <Text className={styles.positionTitle} fw={400}>
              {position.title}
            </Text>

            {position.skillNames.length > 0 && (
              <div className={styles.skillsContainer}>
                {position.skillNames.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <Button
              onClick={() => handleApplyToggle(position.id)}
              className={`${styles.applyButton} ${
                isApplied
                  ? styles.applyButtonApplied
                  : styles.applyButtonDefault
              }`}
            >
              {isApplied ? "Withdraw Application" : "Apply"}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}

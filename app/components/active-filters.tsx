"use client";

import { Button, Group, Stack } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useFilters } from "../hooks";
import styles from "./styles/ActiveFilters.module.css";

const FILTER_LABELS: Record<string, string> = {
  specialties: "Specialties",
  skills: "Skills",
  projectType: "Project Type",
  industries: "Industries",
  sortOrder: "Sort Order",
};

const VALUE_LABELS: Record<string, string> = {
  asc: "Ascending",
  desc: "Descending",
};

export default function ActiveFilters() {
  const { urlFilters: filters, removeFilter, hasActiveFilters } = useFilters();

  return (
    <div
      className={`${styles.container} ${
        hasActiveFilters ? styles.visible : styles.hidden
      }`}
    >
      <h3 className={styles.title}>Applied Filters</h3>

      <Stack gap="md">
        {Object.entries(FILTER_LABELS).map(([filterKey, label]) => {
          const value = filters[filterKey as keyof typeof filters];

          if (Array.isArray(value) && value.length === 0) return null;
          if (!Array.isArray(value) && !value) return null;

          const valuesToRender = Array.isArray(value) ? value : [value];

          return (
            <div key={filterKey}>
              <span className={styles.categoryLabel}>{label}:</span>
              <Group gap="xs" className={styles.filtersGroup}>
                {valuesToRender.map((item) => (
                  <Button
                    key={item}
                    variant="light"
                    size="sm"
                    rightSection={
                      <IconX
                        size={14}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFilter(filterKey as keyof typeof filters, item);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    }
                    className={styles.filterButton}
                    onClick={() =>
                      removeFilter(filterKey as keyof typeof filters, item)
                    }
                  >
                    {VALUE_LABELS[item] ?? item}
                  </Button>
                ))}
              </Group>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}

"use client";

import { Button, Group, Stack } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useFilters } from "../hooks";
import styles from "./styles/ActiveFilters.module.css";

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
        {filters.specialties && filters.specialties.length > 0 && (
          <div>
            <span className={styles.categoryLabel}>Specialties:</span>
            <Group gap="xs" className={styles.filtersGroup}>
              {filters.specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant="light"
                  size="sm"
                  rightSection={
                    <IconX
                      size={14}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFilter("specialties", specialty);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  }
                  className={styles.filterButton}
                  onClick={() => removeFilter("specialties", specialty)}
                >
                  {specialty}
                </Button>
              ))}
            </Group>
          </div>
        )}

        {filters.skills && filters.skills.length > 0 && (
          <div>
            <span className={styles.categoryLabel}>Skills:</span>
            <Group gap="xs" className={styles.filtersGroup}>
              {filters.skills.map((skill) => (
                <Button
                  key={skill}
                  variant="light"
                  size="sm"
                  rightSection={
                    <IconX
                      size={14}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFilter("skills", skill);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  }
                  className={styles.filterButton}
                  onClick={() => removeFilter("skills", skill)}
                >
                  {skill}
                </Button>
              ))}
            </Group>
          </div>
        )}

        {filters.projectType && filters.projectType.length > 0 && (
          <div>
            <span className={styles.categoryLabel}>Project Type:</span>
            <Group gap="xs" className={styles.filtersGroup}>
              {filters.projectType.map((type) => (
                <Button
                  key={type}
                  variant="light"
                  size="sm"
                  rightSection={
                    <IconX
                      size={14}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFilter("projectType", type);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  }
                  className={styles.filterButton}
                  onClick={() => removeFilter("projectType", type)}
                >
                  {type}
                </Button>
              ))}
            </Group>
          </div>
        )}
      </Stack>
    </div>
  );
}

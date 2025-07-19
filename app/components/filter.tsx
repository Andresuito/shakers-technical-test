"use client";

import {
  Button,
  Modal,
  Stack,
  MultiSelect,
  Grid,
  Text,
  Group,
  Checkbox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useFilterOptions, useFilters } from "../hooks";
import styles from "./styles/Filter.module.css";
import { IconFilter } from "@tabler/icons-react";

export default function Filter() {
  const icon = <IconFilter fill="#033028" size={16} />;
  const [opened, { open, close }] = useDisclosure(false);
  
  const { filterOptions, loading } = useFilterOptions();
  const { localFilters, setLocalFilters, clearFilters, applyFilters } = useFilters();

  const handleApplyFilters = () => {
    applyFilters();
    close();
  };

  return (
    <>
      <Button
        onClick={open}
        variant="transparent"
        size="md"
        leftSection={icon}
        className={styles.filterButton}
      >
        Filter
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Filter Projects"
        size="lg"
        centered
        overlayProps={{
          color: "#e4e7e7",
          backgroundOpacity: 0.5,
          blur: 2,
        }}
        classNames={{
          header: styles.modalHeader,
          title: styles.modalTitle,
          body: styles.modalBody,
        }}
      >
        <Stack gap="lg">
          <Grid gutter={24}>
            <Grid.Col span={12}>
              <MultiSelect
                label="Specialties"
                placeholder="Select specialties"
                data={filterOptions.specialties}
                value={localFilters.specialties}
                onChange={(value) =>
                  setLocalFilters({ ...localFilters, specialties: value })
                }
                searchable
                clearable
                disabled={loading}
                classNames={{
                  label: styles.label,
                  input: styles.pillInput,
                  pill: styles.pill,
                }}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <MultiSelect
                label="Skills"
                placeholder="Select skills"
                data={filterOptions.skills}
                value={localFilters.skills}
                onChange={(value) =>
                  setLocalFilters({ ...localFilters, skills: value })
                }
                searchable
                clearable
                disabled={loading}
                classNames={{
                  label: styles.label,
                  input: styles.pillInput,
                  pill: styles.pill,
                }}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <MultiSelect
                label="Project Type"
                placeholder="Select project types"
                data={filterOptions.projectType}
                value={localFilters.projectType}
                onChange={(value) =>
                  setLocalFilters({ ...localFilters, projectType: value })
                }
                searchable
                clearable
                disabled={loading}
                classNames={{
                  label: styles.label,
                  input: styles.pillInput,
                  pill: styles.pill,
                }}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <MultiSelect
                label="Industries"
                placeholder="Select industries"
                data={filterOptions.industries}
                value={localFilters.industries}
                onChange={(value) =>
                  setLocalFilters({ ...localFilters, industries: value })
                }
                searchable
                clearable
                disabled={loading}
                classNames={{
                  label: styles.label,
                  input: styles.pillInput,
                  pill: styles.pill,
                }}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Group>
                <div>
                  <Text className={styles.orderTitle}>Sort by</Text>
                  <Stack gap="xs">
                    <Checkbox
                      label="Publication date (Most recent first)"
                      checked={localFilters.sortOrder === "desc"}
                      onChange={(event) => {
                        setLocalFilters({
                          ...localFilters,
                          sortOrder: event.currentTarget.checked ? "desc" : "",
                        });
                      }}
                      classNames={{
                        root: styles.checkboxRoot,
                        label: styles.checkboxLabel,
                        input: styles.checkboxInput,
                      }}
                    />
                    <Checkbox
                      label="Publication date (Oldest first)"
                      checked={localFilters.sortOrder === "asc"}
                      onChange={(event) => {
                        setLocalFilters({
                          ...localFilters,
                          sortOrder: event.currentTarget.checked ? "asc" : "",
                        });
                      }}
                      classNames={{
                        root: styles.checkboxRoot,
                        label: styles.checkboxLabel,
                        input: styles.checkboxInput,
                      }}
                    />
                  </Stack>
                </div>
              </Group>
            </Grid.Col>
          </Grid>

          <div className={styles.buttonContainer}>
            <Button
              onClick={clearFilters}
              className={styles.clearButton}
              variant="outline"
              size="md"
            >
              Clear Filters
            </Button>
            <Button
              onClick={handleApplyFilters}
              className={styles.applyButton}
              variant="filled"
              size="md"
            >
              Apply Filters
            </Button>
          </div>
        </Stack>
      </Modal>
    </>
  );
}

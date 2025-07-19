"use client";

import { useState, useEffect } from "react";
import { useQueryStates, parseAsArrayOf, parseAsString } from "nuqs";
import type { FilterState } from "../types";

export const useFilters = () => {
  const [urlFilters, setUrlFilters] = useQueryStates(
    {
      specialties: parseAsArrayOf(parseAsString).withDefault([]),
      skills: parseAsArrayOf(parseAsString).withDefault([]),
      projectType: parseAsArrayOf(parseAsString).withDefault([]),
      industries: parseAsArrayOf(parseAsString).withDefault([]),
      sortOrder: parseAsString.withDefault(""),
    },
    {
      shallow: false,
    }
  );

  const [localFilters, setLocalFilters] = useState<FilterState>({
    specialties: [],
    skills: [],
    projectType: [],
    industries: [],
    sortOrder: "",
  });

  useEffect(() => {
    setLocalFilters({
      specialties: urlFilters.specialties,
      skills: urlFilters.skills,
      projectType: urlFilters.projectType,
      industries: urlFilters.industries,
      sortOrder: urlFilters.sortOrder,
    });
  }, [urlFilters]);

  const clearFilters = () => {
    setLocalFilters({
      specialties: [],
      skills: [],
      projectType: [],
      industries: [],
      sortOrder: "",
    });
  };

  const applyFilters = () => {
    setUrlFilters({
      specialties: localFilters.specialties,
      skills: localFilters.skills,
      projectType: localFilters.projectType,
      industries: localFilters.industries,
      sortOrder: localFilters.sortOrder,
    });
  };

  const removeFilter = (filterType: keyof FilterState, valueToRemove: string) => {
    if (Array.isArray(urlFilters[filterType])) {
      setUrlFilters({
        [filterType]: (urlFilters[filterType] as string[]).filter(
          (value) => value !== valueToRemove
        ),
      });
    }
  };

  const hasActiveFilters = 
    urlFilters.specialties.length > 0 ||
    urlFilters.skills.length > 0 ||
    urlFilters.projectType.length > 0 ||
    urlFilters.industries.length > 0;

  return {
    urlFilters,
    localFilters,
    setLocalFilters,
    clearFilters,
    applyFilters,
    removeFilter,
    hasActiveFilters,
  };
};
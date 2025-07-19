"use client";

import { useState, useEffect } from "react";
import type { ApiData, FilterOptions } from "../types";

export const useFilterOptions = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    specialties: [],
    skills: [],
    projectType: [],
    industries: [],
  });
  const [loading, setLoading] = useState(false);

  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_BACKEND_URL
      : "";

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      try {
        const [specialties, skills, categories, industries] = await Promise.all([
          fetch(`${BASE_URL}/api/specialties`).then((res) => res.json()),
          fetch(`${BASE_URL}/api/skills`).then((res) => res.json()),
          fetch(`${BASE_URL}/api/categories`).then((res) => res.json()),
          fetch(`${BASE_URL}/api/industries`).then((res) => res.json()),
        ]);

        setFilterOptions({
          specialties: specialties.map((item: ApiData) => ({
            value: item.name,
            label: item.name,
          })),
          skills: skills.map((item: ApiData) => ({
            value: item.name,
            label: item.name,
          })),
          projectType: categories.map((item: ApiData) => ({
            value: item.name,
            label: item.name,
          })),
          industries: industries.map((item: ApiData) => ({
            value: item.name,
            label: item.name,
          })),
        });
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, [BASE_URL]);

  return { filterOptions, loading };
};

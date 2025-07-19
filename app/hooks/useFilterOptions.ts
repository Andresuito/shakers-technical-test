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
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFilterOptions = async () => {
      setLoading(true);
      setError(null);

      try {
        const [specialties, skills, categories, industries] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/specialties`, {
            signal: controller.signal
          }).then((res) => res.json()),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skills`, {
            signal: controller.signal
          }).then((res) => res.json()),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
            signal: controller.signal
          }).then((res) => res.json()),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/industries`, {
            signal: controller.signal
          }).then((res) => res.json()),
        ]);


        if (!Array.isArray(specialties) || !Array.isArray(skills) || 
            !Array.isArray(categories) || !Array.isArray(industries)) {
          throw new Error('Invalid API response format');
        }

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
        if ((error as Error).name === 'AbortError') return;
        console.error("Error fetching filter options:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();

    return () => controller.abort();
  }, []);

  return { filterOptions, loading, error };
};
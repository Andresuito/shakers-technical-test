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

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      try {
        const [specialties, skills, categories, industries] = await Promise.all([
          fetch("http://localhost:3001/api/specialties").then((res) =>
            res.json()
          ),
          fetch("http://localhost:3001/api/skills").then((res) => res.json()),
          fetch("http://localhost:3001/api/categories").then((res) =>
            res.json()
          ),
          fetch("http://localhost:3001/api/industries").then((res) =>
            res.json()
          ),
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
  }, []);

  return { filterOptions, loading };
};
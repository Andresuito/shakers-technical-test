import { Container, Grid, GridCol, Badge } from "@mantine/core";
import Link from "next/link";
import type { Project, SearchParams } from "./types";
import styles from "./style/Home.module.css";
import Filter from "./components/filter";
import ActiveFilters from "./components/active-filters";

async function fetchProjects(searchParams: SearchParams): Promise<Project[]> {
  const params = new URLSearchParams();

  if (searchParams.specialties) {
    const specialties = Array.isArray(searchParams.specialties)
      ? searchParams.specialties.join(",")
      : searchParams.specialties;
    params.append("specialties", specialties);
  }

  if (searchParams.skills) {
    const skills = Array.isArray(searchParams.skills)
      ? searchParams.skills.join(",")
      : searchParams.skills;
    params.append("skills", skills);
  }

  if (searchParams.projectType) {
    const projectType = Array.isArray(searchParams.projectType)
      ? searchParams.projectType.join(",")
      : searchParams.projectType;
    params.append("projectType", projectType);
  }

  if (searchParams.industries) {
    const industries = Array.isArray(searchParams.industries)
      ? searchParams.industries.join(",")
      : searchParams.industries;
    params.append("industries", industries);
  }

  if (searchParams.sortOrder) {
    const sortOrder = Array.isArray(searchParams.sortOrder)
      ? searchParams.sortOrder[0]
      : searchParams.sortOrder;
    params.append("sortOrder", sortOrder);
  }

  const queryString = params.toString();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects${
    queryString ? `?${queryString}` : ""
  }`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const projects = await fetchProjects(resolvedSearchParams);

  return (
    <Container size={1360}>
      <div className={styles.filterContainer}>
        <Filter />
      </div>
      <ActiveFilters />

      <p className={styles.referralBanner}>Earn 1500€ for referring!</p>

      <Grid gutter={40}>
        {projects.map((project: Project, index: number) => {
          const skillNames = project.skillNames || [];
          const categoryName = project.categoryName;
          const industryName = project.industryName;

          let budgetInfo = "";
          if (project.budget) {
            if (
              project.budget.total !== null &&
              project.budget.total !== undefined
            ) {
              budgetInfo = `${project.budget.total.toLocaleString()}€`;
            } else if (
              project.budget.hourFrom !== null &&
              project.budget.hourTo !== null
            ) {
              budgetInfo = `${project.budget.hourFrom} - ${project.budget.hourTo} €/h`;
            }
          }

          const categoryIndustryBudgetInfo = [
            categoryName,
            industryName,
            budgetInfo,
          ]
            .filter(Boolean)
            .join(" | ");

          return (
            <GridCol key={project.id} span={12}>
              <Link
                href={`/projects/${project.id}`}
                className={styles.projectLink}
              >
                <div
                  className={`${styles.projectCard} ${styles.projectCardAnimated}`}
                  style={{
                    animationDelay: `${index * 0.02}s`,
                  }}
                >
                  <div className={styles.projectCardContainer}>
                    <div className={styles.logoContainer}>
                      <img
                        src={project.organization.logo}
                        alt={project.organization.name}
                        className={styles.logoImage}
                      />
                      <p
                        className={styles.organizationName}
                        title={project.organization.name}
                      >
                        {project.organization.name}
                      </p>
                    </div>
                    <div className={styles.contentContainer}>
                      <p className={styles.projectTitle}>{project.title}</p>

                      {categoryIndustryBudgetInfo && (
                        <p className={styles.categoryInfo}>
                          {categoryIndustryBudgetInfo}
                        </p>
                      )}

                      {skillNames.length > 0 && (
                        <div className={styles.skillsContainer}>
                          {skillNames.map((skill: any) => (
                            <div key={skill} className={styles.customBadge}>
                              {skill}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </GridCol>
          );
        })}
      </Grid>
    </Container>
  );
}

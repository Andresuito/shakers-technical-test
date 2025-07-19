import { Container, Grid, GridCol, Badge } from "@mantine/core";
import Link from "next/link";
import type { Project, SearchParams } from "./types";
import styles from "./style/Home.module.css";
import projectStyles from "./style/Home.module.css";
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
  const url = `http://localhost:3001/api/projects${
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
                style={{ textDecoration: "none" }}
              >
                <div
                  className={`${projectStyles.projectCard} ${projectStyles.projectCardAnimated}`}
                  style={{
                    animationDelay: `${index * 0.02}s`,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "16px",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={project.organization.logo}
                        alt={project.organization.name}
                        style={{
                          width: "82px",
                          height: "82px",
                          borderRadius: "6px",
                          objectFit: "contain",
                          marginBottom: "6px",
                        }}
                      />
                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#AEB7B4",
                          maxWidth: "82px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          userSelect: "none",
                        }}
                        title={project.organization.name}
                      >
                        {project.organization.name}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "18px",
                          fontWeight: "400",
                          color: "#2c3e50",
                        }}
                      >
                        {project.title}
                      </p>

                      {categoryIndustryBudgetInfo && (
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#0B5A4C",
                          }}
                        >
                          {categoryIndustryBudgetInfo}
                        </p>
                      )}

                      {skillNames.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                          }}
                        >
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

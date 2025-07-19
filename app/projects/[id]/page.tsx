import {
  Container,
  Title,
  Text,
  Stack,
  Card,
  Group,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconCalendar,
  IconClock,
  IconCurrencyEuro,
  IconUsers,
} from "@tabler/icons-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import FAQSection from "../../components/faq-section";
import TeamPositions from "../../components/team-positions";
import Image from "next/image";
import styles from "../../style/ProjectDetail.module.css";
import type { ProjectDetail } from "../../types";

async function fetchProject(id: string): Promise<ProjectDetail | null> {
  try {
    const response = await fetch(`http://localhost:3001/api/projects/${id}`);
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = await fetchProject(resolvedParams.id);

  if (!project) {
    notFound();
  }

  const budgetInfo = project.budget?.total
    ? `${project.budget.total.toLocaleString()}€`
    : project.budget?.hourFrom && project.budget?.hourTo
    ? `${project.budget.hourFrom} - ${project.budget.hourTo} €/h`
    : "Budget not specified";

  return (
    <Container size={1360} style={{ marginBottom: "40px" }}>
      <Group gap="xs" className={styles.breadcrumbContainer}>
        <Anchor component={Link} href="/" className={styles.backLink}>
          <IconArrowLeft size={16} className={styles.backIcon} />
          <span>Back</span>
        </Anchor>
        <Breadcrumbs>
          <Text fw={400} className={styles.breadcrumbText}>
            Search Projects
          </Text>
          <Text fw={700} className={styles.breadcrumbTitle}>
            {project.title}
          </Text>
        </Breadcrumbs>
      </Group>

      <div className={styles.heroSection}>
        <div className={styles.heroHeader}>
          <Title fw={400} order={1} className={styles.heroTitle}>
            {project.title}
          </Title>
          <Group className={styles.industryBadge}>
            <Text size="sm" className={styles.industryText}>
              {project.industryName}
            </Text>
          </Group>
        </div>

        <Text size="lg" fw={400} className={styles.categoryText}>
          {project.categoryName}
        </Text>

        <Group gap="lg">
          <Group className={styles.infoBadge}>
            <IconCalendar size={16} />
            <Text size="sm" className={styles.infoText}>
              {new Date(project.startDate).toLocaleDateString()}
            </Text>
          </Group>

          {project.totalHours && (
            <Group className={styles.infoBadge}>
              <IconClock size={16} />
              <Text size="sm" className={styles.infoText}>
                {project.totalHours} hours
              </Text>
            </Group>
          )}

          <Group className={styles.infoBadge}>
            <IconCurrencyEuro size={16} />
            <Text size="sm" className={styles.infoText}>
              {budgetInfo}
            </Text>
          </Group>

          <Group className={styles.infoBadge}>
            <IconUsers size={16} />
            <Text size="sm" className={styles.infoText}>
              {project.positions?.length || 0} positions
            </Text>
          </Group>
        </Group>
      </div>

      <Stack gap="md">
        <Card className={styles.descriptionCard}>
          <Title fw={400} order={3} className={styles.sectionTitle}>
            Project Description
          </Title>
          <Text className={styles.descriptionText}>{project.description}</Text>
        </Card>

        {project.goals && project.goals.length > 0 && (
          <Card className={styles.descriptionCard}>
            <Title fw={400} order={3} className={styles.sectionTitle}>
              What are the objectives and tasks to be completed?
            </Title>
            <Stack gap="sm">
              {project.goals.map((goal, index) => (
                <Text key={index} className={styles.goalText}>
                  • {goal}
                </Text>
              ))}
            </Stack>
          </Card>
        )}
      </Stack>

      <FAQSection faqs={project.faqs} />

      <div className={styles.teamSection}>
        <div className={styles.responsibleSection}>
          <Title fw={400} order={3} className={styles.responsibleTitle}>
            Responsible
          </Title>
          <Card padding="lg" radius="md" withBorder>
            <div className={styles.organizationInfo}>
              <Image
                src={project.organization.logo}
                alt={project.organization.name}
                width={24}
                height={24}
                className={styles.organizationLogo}
              />
              <Text className={styles.organizationName}>
                {project.organization.name}
              </Text>
            </div>
            <Image
              src="/images/avatarBig.png"
              alt="Avatar"
              width={252}
              height={252}
              className={styles.avatarImage}
            />

            <div>
              <Text size="sm" className={styles.leaderName}>
                {project.projectLeader.name} {project.projectLeader.lastName}
              </Text>
              <Text className={styles.leaderTitle}>Project Owner</Text>
            </div>
          </Card>
        </div>

        <div className={styles.teamContainer}>
          <Title fw={400} order={3} className={styles.teamTitle}>
            Team
          </Title>
          <TeamPositions positions={project.positions} />
        </div>
      </div>
    </Container>
  );
}

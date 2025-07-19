import { Container, Title, Text, Button } from "@mantine/core";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <Container size={1360}>
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <Title order={1} style={{ color: "#2c3e50", marginBottom: "16px" }}>
          Project Not Found
        </Title>
        <Text style={{ color: "#666", marginBottom: "32px", fontSize: "18px" }}>
          The project you're looking for doesn't exist or has been removed.
        </Text>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button
            variant="filled"
            leftSection={<IconArrowLeft size={16} />}
            style={{ backgroundColor: "#033028" }}
          >
            Back to Projects
          </Button>
        </Link>
      </div>
    </Container>
  );
}
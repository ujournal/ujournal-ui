import { Container, Card } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { PostEditForm } from "features/post-edit/components/PostEditForm";
import { SitePage } from "types";

const CreatePostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });

  return (
    <Container size={690} p={0}>
      <Card
        p={largerThanSm ? "xl" : "sm"}
        sx={{ overflow: "visible" }}
        radius="md"
      >
        <PostEditForm
          values={{
            community_id: 3,
            body: `Фільм "На Західному фронті без змін" (All Quiet on the Western Front) розповідає захоплюючу історію молодого німецького солдата на Західному фронті Першої світової війни. Пауль та його товариші на власному досвіді переконуються, як первісна ейфорія війни змінюється розпачем та страхом, коли вони в окопах борються за своє життя та один одного. Фільм режисера Едварда Бергера заснований на однойменному всесвітньо відомому бестселері Еріха Марії Ремарка.

Реліз: 28 жовтня

![](https://ujournal.com.ua/pictrs/image/0c148ddc-d712-48e6-8f62-fc2fdebcd2a9.png)`,
            name: "Трейлер На Західному фронті без змін від Netflix",
            url: "https://www.youtube.com/watch?v=qFqgmaO15x4",
            nsfw: true,
          }}
          onSubmit={console.log}
        />
      </Card>
    </Container>
  );
};

export default CreatePostPage;

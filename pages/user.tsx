import { SitePage } from "types";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { usePersonViewSafe } from "features/user/hooks/userPersonViewSafe";
import { DateFormatted } from "baza/components/DeteFormatted";
import { Container, Card } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";

const UserPage: SitePage = () => {
  const { userId: _userId } = useRouterQuery<{ userId: number }>({
    userId: -1,
  });

  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  const personViewSafe = usePersonViewSafe({
    creatorId: _userId,
  });

  return (
    <>
      <Container px={0} mx={largerThanSm ? undefined : "-md"}>
        <Card radius={smallerThanSm ? 0 : "md"}>
          <h2>{personViewSafe.data?.person.name}</h2>
          <h4>Зареєстрований</h4>
          <DateFormatted
            date={
              new Date(
                personViewSafe.data?.person?.published ?? new Date() + "Z"
              )
            }
          />
          <p>Загальний рейтинг: {personViewSafe.data?.totalScore}</p>
          <p>Рейтинг постів: {personViewSafe.data?.postScore}</p>
          <p>Рейтинг коментарів: {personViewSafe.data?.commentScore}</p>
          <p>Кількість постів: {personViewSafe.data?.postCount}</p>
          <p>Кількість коментарів: {personViewSafe.data?.commentCount}</p>
        </Card>
      </Container>
    </>
  );
};

export default UserPage;

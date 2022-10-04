import { Container, Stack, Title } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { AppAside } from "features/app/components/AppAside";
import { AppNavbar } from "features/app/components/AppNavbar";
import { useSiteUser } from "features/app/hooks/useSiteUser";
import { Post } from "features/post/components/Post";
import { PostListLoader } from "features/post/components/PostListLoader";
import { usePersonDetails } from "features/user/hooks/usePersonDetails";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SitePage } from "types";

const SavedPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const smallerThanMd = useBreakpoint({ smallerThan: "md" });
  const { q } = useRouterQuery<{
    q: string | undefined;
  }>({
    q: undefined,
  });
  const user = useSiteUser();
  const personDetails = usePersonDetails({
    personId: user.myUserInfo
      ?.map((myUserInfo) => myUserInfo.local_user_view.person.id)
      .unwrapOr(-1),
    savedOnly: true,
  });
  const { t } = useTranslation();

  const posts = useMemo(() => {
    return {
      ...personDetails,
      data: personDetails.data?.posts || [],
    };
  }, [personDetails]);

  return (
    <Container
      size={smallerThanMd ? undefined : 690}
      px={0}
      mx={largerThanSm ? undefined : "-md"}
    >
      <Stack spacing="md">
        <Title>{t("saved")}</Title>
        <DataList
          {...posts}
          itemComponent={Post}
          itemKey="post.id"
          loaderComponent={PostListLoader}
        />
      </Stack>
    </Container>
  );
};

SavedPage.Navbar = AppNavbar;
SavedPage.Aside = AppAside;

export default SavedPage;

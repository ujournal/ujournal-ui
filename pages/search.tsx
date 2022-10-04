import { Container, Stack, Title } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { AppAside } from "features/app/components/AppAside";
import { AppNavbar } from "features/app/components/AppNavbar";
import { Post } from "features/post/components/Post";
import { PostListLoader } from "features/post/components/PostListLoader";
import { useSearch } from "features/search/hooks/useSearch";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SitePage } from "types";

const SearchPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const smallerThanMd = useBreakpoint({ smallerThan: "md" });
  const { q } = useRouterQuery<{
    q: string | undefined;
  }>({
    q: undefined,
  });
  const search = useSearch({ q, limit: 100 });
  const { t } = useTranslation();

  const posts = useMemo(() => {
    return {
      ...search,
      data: search.data?.posts || [],
    };
  }, [search]);

  return (
    <Container
      size={smallerThanMd ? undefined : 690}
      px={0}
      mx={largerThanSm ? undefined : "-md"}
    >
      <Stack spacing="md">
        <Title>{`${t("search")} ${q || ""}`}</Title>
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

SearchPage.Navbar = AppNavbar;
SearchPage.Aside = AppAside;

export default SearchPage;

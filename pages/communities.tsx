import { Box, Button, Container, Grid, Group, Stack } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconCirclePlus } from "@tabler/icons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { AppNavbar } from "features/app/components/AppNavbar";
import { CommunityItemWithCol } from "features/community/components/CommunityItem";
import { CommunityList } from "features/community/components/CommunityList";
import { CommunityListGridLoader } from "features/community/components/CommunityListGridLoader";
import { CommunityMoreLoaderWithRef } from "features/community/components/CommunityMoreLoader";
import {
  CommunitySearchForm,
  Values as CommunitySearchValues,
} from "features/community/forms/CommunitySearchForm";
import { useCommunityList } from "features/community/hooks/useCommunityList";
import { useSearch } from "features/search/hooks/useSearch";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SitePage } from "types";
import { SortType } from "ujournal-lemmy-js-client";

const CommunitiesPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const { t } = useTranslation();
  const [values, setValues] = useDebouncedState<CommunitySearchValues>(
    { query: "" },
    800,
    { leading: false }
  );
  const communityList = useCommunityList({ sort: SortType.TopAll, limit: 18 });
  const searchList = useSearch({
    q: values.query,
  });

  const datList = useMemo(() => {
    if (values.query) {
      return {
        ...searchList,
        data: searchList.data?.communities || [],
      };
    }

    return communityList;
  }, [communityList, values, searchList]);

  return (
    <>
      <Head>
        <title>{t("communities")} - UJournal</title>
      </Head>

      <Container size={1400} p={0}>
        <Stack>
          <Group noWrap>
            <Box sx={{ flex: "1 1 0" }}>
              <CommunitySearchForm onSubmit={setValues} />
            </Box>
            <Link href={{ pathname: "/create-community" }}>
              <Button
                component="a"
                size="lg"
                radius="md"
                variant="white"
                leftIcon={<IconCirclePlus stroke={1.5} />}
                pr={largerThanSm ? undefined : "xs"}
              >
                {largerThanSm ? t("create_community") : undefined}
              </Button>
            </Link>
          </Group>
          <Grid>
            <CommunityList
              {...datList}
              itemComponent={CommunityItemWithCol}
              itemKey="community.id"
              loaderComponent={CommunityMoreLoaderWithRef}
              listLoaderComponent={CommunityListGridLoader}
            />
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

CommunitiesPage.Navbar = AppNavbar;

export default CommunitiesPage;

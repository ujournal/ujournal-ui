import { Container, Grid, Stack } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
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
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SitePage } from "types";

const CommunitiesPage: SitePage = () => {
  const { t } = useTranslation();
  const [values, setValues] = useDebouncedState<CommunitySearchValues>(
    { query: "" },
    800,
    { leading: false }
  );
  const communityList = useCommunityList({ limit: 18 });
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
          <CommunitySearchForm onSubmit={setValues} />
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

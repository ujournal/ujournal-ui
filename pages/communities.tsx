import { Container, Grid } from "@mantine/core";
import { AppNavbar } from "features/app/components/AppNavbar";
import { CommunityItemWithCol } from "features/community/components/CommunityItem";
import { CommunityList } from "features/community/components/CommunityList";
import { CommunityListGridLoader } from "features/community/components/CommunityListGridLoader";
import { CommunityMoreLoaderWithRef } from "features/community/components/CommunityMoreLoader";
import { useCommunityList } from "features/community/hooks/useCommunityList";
import { SitePage } from "types";

const CommunitiesPage: SitePage = () => {
  const communityList = useCommunityList({ limit: 18 });

  return (
    <Container size={1400} p={0}>
      <Grid>
        <CommunityList
          {...communityList}
          itemComponent={CommunityItemWithCol}
          itemKey="community.id"
          loaderComponent={CommunityMoreLoaderWithRef}
          listLoaderComponent={CommunityListGridLoader}
        />
      </Grid>
    </Container>
  );
};

CommunitiesPage.Navbar = AppNavbar;

export default CommunitiesPage;

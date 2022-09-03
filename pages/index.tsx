import { Box } from "@mantine/core";
import { SitePage } from "types";
import { PostList } from "features/post/components/PostList";
import { CommunityList } from "features/community/components/CommunityList";
import { PostFilter } from "features/post/components/PostFilter";

const Home: SitePage = () => {
  return <PostList />;
};

const HomeNavbar = () => {
  return (
    <>
      <Box mb="lg">
        <PostFilter />
      </Box>

      <CommunityList />
    </>
  );
};

Home.Navbar = HomeNavbar;
export default Home;

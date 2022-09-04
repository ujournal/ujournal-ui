import { Box } from "@mantine/core";
import { SitePage } from "types";
import { PostList } from "features/post/components/PostList";
import { CommunityList } from "features/community/components/CommunityList";
import { LinksList } from "baza/components/LinksList";
import { IconTrendingUp } from "@tabler/icons";
import { useMemo } from "react";
import { IconFlame } from "@tabler/icons";

const Home: SitePage = () => {
  return <PostList />;
};

const HomeNavbar = () => {
  const links = useMemo(
    () => [
      {
        url: "/?order=tranding",
        label: "Популярне",
        icon: IconFlame,
      },
      {
        url: "/?order=active",
        label: "Активні",
        icon: IconTrendingUp,
      },
    ],
    []
  );

  return (
    <>
      <Box mb="lg">
        <LinksList items={links} />
      </Box>

      <CommunityList />
    </>
  );
};

Home.Navbar = HomeNavbar;
export default Home;

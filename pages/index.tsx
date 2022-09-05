import { Box } from "@mantine/core";
import { SitePage } from "types";
import { PostList } from "features/post/components/PostList";
import { CommunityList } from "features/community/components/CommunityList";
import { LinksList } from "baza/components/LinksList";
import { IconMessageCircle2, IconTrendingUp } from "@tabler/icons";
import { useMemo } from "react";
import { IconFlame } from "@tabler/icons";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { IconBolt } from "@tabler/icons";
import { SortType } from "ujournal-lemmy-js-client";
import { Embed } from "features/embed/components/Embed";

const Home: SitePage = () => {
  return (
    <>
      <PostList />
    </>
  );
};

const HomeNavbar = () => {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      {
        url: `/?sort=${SortType.Hot}`,
        label: capitalize(t("hot")),
        icon: IconFlame,
        active: true,
      },
      {
        url: `/?sort=${SortType.Active}`,
        label: capitalize(t("active")),
        icon: IconTrendingUp,
      },
      {
        url: `/?sort=${SortType.New}`,
        label: capitalize(t("new")),
        icon: IconBolt,
      },
      {
        url: `/?sort=${SortType.MostComments}`,
        label: capitalize(t("most_comments")),
        icon: IconMessageCircle2,
      },
      {
        url: `/?sort=${SortType.NewComments}`,
        label: capitalize(t("new_comments")),
        icon: IconMessageCircle2,
      },
    ],
    [t]
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

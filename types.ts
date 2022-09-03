import { NextComponentType } from "next";
import { NextPageContext } from "next";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { FC } from "react";

type Navbar = FC;

export type SitePage<SitePageProps = {}> = NextPage<SitePageProps> & {
  Navbar?: Navbar;
};

export type SiteAppProps = Omit<AppProps, "Component"> & {
  Component: NextComponentType<NextPageContext, any, {}> & {
    Navbar?: Navbar;
  };
};

import { useAuth } from "features/app/hooks/useAuth";
import { NextComponentType } from "next";
import { NextPageContext } from "next";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { FC } from "react";

type Navbar = FC;
type Aside = FC;

export type SiteExtraProps = {
  Navbar?: Navbar;
  Aside?: Aside;
  authRedirect?: (auth: SiteAuth) => string | undefined;
};

export type SitePage<SitePageProps = {}> = NextPage<SitePageProps> &
  SiteExtraProps;

export type SiteAuth = ReturnType<typeof useAuth>;

export type SiteComponent = NextComponentType<NextPageContext, any, {}> &
  SiteExtraProps;

export type SiteAppProps = Omit<AppProps, "Component"> & {
  Component: SiteComponent;
};

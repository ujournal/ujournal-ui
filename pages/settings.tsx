import { SitePage } from "types";

const SettingsPage: SitePage = () => {
  return <>Setings</>;
};

export default SettingsPage;

export function isBrowser() {
  return typeof window !== "undefined";
}

import {
  CommunityModeratorView,
  PersonViewSafe,
} from "ujournal-lemmy-js-client";
import { useSite } from "./useSite";
import { Option, None } from "@sniptt/monads";
import { useCallback, useMemo } from "react";

export const useSiteUser = () => {
  const { data, isLoading } = useSite();

  const myUserInfo = data?.my_user;

  const canMod = useCallback(
    (
      mods: Option<CommunityModeratorView[]>,
      admins: Option<PersonViewSafe[]>,
      creator_id: number,
      onSelf = false
    ) => {
      // You can do moderator actions only on the mods added after you.
      let adminsThenMods = admins
        .unwrapOr([])
        .map((a) => a.person.id)
        .concat(mods.unwrapOr([]).map((m) => m.moderator.id));

      return myUserInfo?.match({
        some: (me) => {
          const myIndex = adminsThenMods.findIndex(
            (id) => id == me.local_user_view.person.id
          );

          if (myIndex == -1) {
            return false;
          } else {
            // onSelf +1 on mod actions not for yourself, IE ban, remove, etc
            adminsThenMods = adminsThenMods.slice(
              0,
              myIndex + (onSelf ? 0 : 1)
            );
            return !adminsThenMods.includes(creator_id);
          }
        },
        none: false,
      });
    },
    [myUserInfo]
  );

  const canAdmin = useCallback(
    (admins: Option<PersonViewSafe[]>, creator_id: number, onSelf = false) => {
      return canMod(None, admins, creator_id, onSelf);
    },
    [canMod]
  );

  const isMod = useCallback(
    (mods: Option<CommunityModeratorView[]>, creator_id: number) => {
      return mods.match({
        some: (mods) => mods.map((m) => m.moderator.id).includes(creator_id),
        none: false,
      });
    },
    []
  );

  const amMod = useCallback(
    (mods: Option<CommunityModeratorView[]>) => {
      return myUserInfo?.match({
        some: (muUserInfo) => isMod(mods, muUserInfo.local_user_view.person.id),
        none: false,
      });
    },
    [isMod, myUserInfo]
  );

  const isAdmin = useCallback(
    (admins: Option<PersonViewSafe[]>, creator_id: number): boolean => {
      return admins.match({
        some: (admins) => admins.map((a) => a.person.id).includes(creator_id),
        none: false,
      });
    },
    []
  );

  const amAdmin = useCallback(
    (admins: Option<PersonViewSafe[]>): boolean => {
      if (!myUserInfo) {
        return false;
      }

      return myUserInfo.match({
        some: (mui) => isAdmin(admins, mui.local_user_view.person.id),
        none: false,
      });
    },
    [isAdmin, myUserInfo]
  );

  const amCommunityCreator = useCallback(
    (mods: Option<CommunityModeratorView[]>, creator_id: number): boolean => {
      if (!myUserInfo) {
        return false;
      }

      return mods.match({
        some: (mods) =>
          myUserInfo
            .map((mui) => mui.local_user_view.person.id)
            .match({
              some: (myId) =>
                myId == mods[0].moderator.id &&
                // Don't allow mod actions on yourself
                myId != creator_id,
              none: false,
            }),
        none: false,
      });
    },
    [myUserInfo]
  );

  const amSiteCreator = useCallback(
    (admins: Option<PersonViewSafe[]>, creator_id: number): boolean => {
      if (!myUserInfo) {
        return false;
      }

      return admins.match({
        some: (admins) =>
          myUserInfo
            .map((mui) => mui.local_user_view.person.id)
            .match({
              some: (myId) =>
                myId == admins[0].person.id &&
                // Don't allow mod actions on yourself
                myId != creator_id,
              none: false,
            }),
        none: false,
      });
    },
    [myUserInfo]
  );

  const amTopMod = useCallback(
    (mods: Option<CommunityModeratorView[]>): boolean => {
      if (!myUserInfo) {
        return false;
      }

      return mods.match({
        some: (mods) =>
          myUserInfo.match({
            some: (mui) =>
              mods[0].moderator.id == mui.local_user_view.person.id,
            none: false,
          }),
        none: false,
      });
    },
    [myUserInfo]
  );

  const localUserView = useMemo(() => {
    if (myUserInfo?.isSome() && myUserInfo?.unwrap().local_user_view) {
      return myUserInfo?.unwrap().local_user_view;
    }
    return undefined;
  }, [myUserInfo]);

  return {
    isLoading,
    myUserInfo,
    localUserView,
    canMod,
    canAdmin,
    isMod,
    amMod,
    isAdmin,
    amAdmin,
    amCommunityCreator,
    amSiteCreator,
    amTopMod,
  };
};

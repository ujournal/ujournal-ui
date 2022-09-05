import { None, Option } from "@sniptt/monads";
import {
  CommunityModeratorView,
  MyUserInfo,
  PersonViewSafe,
} from "ujournal-lemmy-js-client";

export const canMod = (
  mods: Option<CommunityModeratorView[]>,
  admins: Option<PersonViewSafe[]>,
  creator_id: number,
  myUserInfo: Option<MyUserInfo>,
  onSelf = false
): boolean => {
  // You can do moderator actions only on the mods added after you.
  let adminsThenMods = admins
    .unwrapOr([])
    .map((a) => a.person.id)
    .concat(mods.unwrapOr([]).map((m) => m.moderator.id));

  return myUserInfo.match({
    some: (me) => {
      const myIndex = adminsThenMods.findIndex(
        (id) => id == me.local_user_view.person.id
      );

      if (myIndex == -1) {
        return false;
      } else {
        // onSelf +1 on mod actions not for yourself, IE ban, remove, etc
        adminsThenMods = adminsThenMods.slice(0, myIndex + (onSelf ? 0 : 1));
        return !adminsThenMods.includes(creator_id);
      }
    },
    none: false,
  });
};

export const canAdmin = (
  admins: Option<PersonViewSafe[]>,
  creator_id: number,
  myUserInfo: Option<MyUserInfo>,
  onSelf = false
): boolean => {
  return canMod(None, admins, creator_id, myUserInfo, onSelf);
};

export const isMod = (
  mods: Option<CommunityModeratorView[]>,
  creator_id: number
): boolean => {
  return mods.match({
    some: (mods) => mods.map((m) => m.moderator.id).includes(creator_id),
    none: false,
  });
};

export const amMod = (
  mods: Option<CommunityModeratorView[]>,
  myUserInfo: Option<MyUserInfo>
): boolean => {
  return myUserInfo.match({
    some: (mui) => isMod(mods, mui.local_user_view.person.id),
    none: false,
  });
};

export const isAdmin = (
  admins: Option<PersonViewSafe[]>,
  creator_id: number
): boolean => {
  return admins.match({
    some: (admins) => admins.map((a) => a.person.id).includes(creator_id),
    none: false,
  });
};

export const amAdmin = (
  admins: Option<PersonViewSafe[]>,
  myUserInfo: Option<MyUserInfo>
): boolean => {
  return myUserInfo.match({
    some: (mui) => isAdmin(admins, mui.local_user_view.person.id),
    none: false,
  });
};

export const amCommunityCreator = (
  mods: Option<CommunityModeratorView[]>,
  creator_id: number,
  myUserInfo: Option<MyUserInfo>
): boolean => {
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
};

export const amSiteCreator = (
  admins: Option<PersonViewSafe[]>,
  creator_id: number,
  myUserInfo: Option<MyUserInfo>
): boolean => {
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
};

export const amTopMod = (
  mods: Option<CommunityModeratorView[]>,
  myUserInfo: Option<MyUserInfo>
): boolean => {
  return mods.match({
    some: (mods) =>
      myUserInfo.match({
        some: (mui) => mods[0].moderator.id == mui.local_user_view.person.id,
        none: false,
      }),
    none: false,
  });
};

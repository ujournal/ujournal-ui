import { PostView } from "ujournal-lemmy-js-client";

const duplicatesMap = new Map<number, PostView[]>();

export const removePostDuplicates = (posts: PostView[]): PostView[] => {
  // A map from post url to list of posts (dupes)
  let urlMap = new Map<string, PostView[]>();

  // Loop over the posts, find ones with same urls
  for (let pv of posts) {
    !pv.post.deleted &&
      !pv.post.removed &&
      !pv.community.deleted &&
      !pv.community.removed &&
      pv.post.url.match({
        some: (url) => {
          const urlMapItem = urlMap.get(url);
          if (urlMapItem) {
            urlMapItem.push(pv);
          } else {
            urlMap.set(url, [pv]);
          }
        },
        none: void 0,
      });
  }

  // Sort by oldest
  // Remove the ones that have no length
  for (let entry of urlMap.entries()) {
    if (entry[1].length == 1) {
      urlMap.delete(entry[0]);
    } else {
      entry[1].sort((a, b) => a.post.published.localeCompare(b.post.published));
    }
  }

  for (let i = 0; i < posts.length; i++) {
    let pv = posts[i];
    pv.post.url.match({
      some: (url) => {
        let found = urlMap.get(url);
        if (found) {
          // If its the oldest, add
          if (pv.post.id == found[0].post.id) {
            duplicatesMap.set(pv.post.id, found.slice(1));
          }
          // Otherwise, delete it
          else {
            posts.splice(i--, 1);
          }
        }
      },
      none: void 0,
    });
  }

  return posts;
};

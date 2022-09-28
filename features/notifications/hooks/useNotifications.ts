import { merge, orderBy } from "lodash";
import { useMemo } from "react";
import {
  CommentReplyView,
  CommentSortType,
  PersonMentionView,
} from "ujournal-lemmy-js-client";
import { useMentions } from "./useMentions";
import { useReplies } from "./useReplies";

export enum NotificationType {
  Mention = "mention",
  Reply = "reply",
}

export type NotificationParams = {
  sort: CommentSortType;
  page: number;
  limit: number;
  unread_only: boolean;
};

export const useNotifications = (params: Partial<NotificationParams> = {}) => {
  const _params = merge(
    {
      sort: CommentSortType.New,
      page: 1,
      limit: 20,
      unread_only: true,
    },
    params
  );

  const replies = useReplies(_params);
  const mentions = useMentions(_params);

  const data = useMemo(() => {
    const results: {
      type: NotificationType;
      reply?: CommentReplyView;
      mention?: PersonMentionView;
      published: string;
    }[] = [];

    if (replies.data?.replies) {
      replies.data?.replies.map((reply) => {
        results.push({
          type: NotificationType.Reply,
          reply,
          published: reply.comment.published,
        });
      });
    }

    if (mentions.data?.mentions) {
      mentions.data?.mentions.map((mention) => {
        results.push({
          type: NotificationType.Mention,
          mention,
          published: mention.person_mention.published,
        });
      });
    }

    return orderBy(results, (a) => new Date(a.published), ["desc"]);
  }, [mentions.data?.mentions, replies.data?.replies]);

  return {
    data,
    isLoading: mentions.isLoading || replies.isLoading,
  };
};

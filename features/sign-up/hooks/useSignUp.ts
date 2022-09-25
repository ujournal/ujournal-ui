import { None } from "@sniptt/monads";
import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { Register } from "ujournal-lemmy-js-client";
import { Values as SignUpFormValues } from "../forms/SignUpForm";

export const useSignUp = () => {
  const lemmyClient = useLemmyClient();

  return useMutation(
    ["signUp"],
    async (values: SignUpFormValues) =>
      await lemmyClient.register(
        new Register({
          ...values,
          show_nsfw: false,
          captcha_uuid: None,
          captcha_answer: None,
          honeypot: None,
          answer: None,
          email: None,
        })
      )
  );
};

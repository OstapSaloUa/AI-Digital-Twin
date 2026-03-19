"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { isEmail } from "../lib/utils/validation";
import { postEmail } from "../lib/api";
import { useToast } from "../lib/toast";
import { getErrorMessage } from "../lib/errors";

/**
 * Manages email form state and submission. Redirects to /customizing on success.
 * @returns email, setEmail, valid, submitting, error, onSubmit
 */
export function useEmail() {
  const router = useRouter();
  const { showError } = useToast();
  const [email, setEmail] = useState("");

  const valid = useMemo(() => isEmail(email.trim()), [email]);

  const {
    mutateAsync: submitEmail,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: () => postEmail(email.trim()),
    onSuccess: () => router.push("/customizing"),
  });

  async function onSubmit() {
    reset();
    if (!valid) return;
    try {
      await submitEmail();
    } catch (e) {
      showError(getErrorMessage(e));
    }
  }

  const errorMessage = error ? getErrorMessage(error) : null;

  return {
    email,
    setEmail,
    valid,
    submitting: isPending,
    error: errorMessage,
    onSubmit,
  };
}

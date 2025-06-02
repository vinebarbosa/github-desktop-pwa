'use server';

import { ROUTES } from "@/modules/shared/routes";
import { signIn } from "..";

export async function signInAction() {
  await signIn('github', { redirect: true, redirectTo: ROUTES.repositories });
}

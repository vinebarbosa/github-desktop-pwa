'use server';

import { ROUTES } from "@/modules/shared/routes";
import { signOut } from "..";

export async function signOutAction() {
  await signOut({ redirectTo: ROUTES.signIn });
}

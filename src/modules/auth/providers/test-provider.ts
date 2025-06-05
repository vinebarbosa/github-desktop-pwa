import { USER_MOCK } from "@/mocks/user-mock";
import Credentials from "next-auth/providers/credentials"

export const TestProvider = Credentials({
  name: "Credentials",
  credentials: {
    password: {},
  },
  authorize: async (credentials) => {
    if (credentials.password === process.env.TEST_PASSWORD) {
      return USER_MOCK;
    }
    return null;
  },
})

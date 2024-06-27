import Router from "koa-router";
import { Client, UserRole } from "@shared/types";
import { Team, User } from "@server/models";
import { APIContext } from "@server/types";
import { signIn } from "@server/utils/authentication";
import * as T from "../../../email/server/auth/schema";

const router = new Router();

router.get("mock", async (ctx: APIContext<T.EmailCallbackReq>) => {
  const [user] = await User.findOrCreate({
    where: {},
    defaults: {
      name: "Dummy",
      email: "dummy@email.net",
      role: UserRole.Admin,
      lastSignedInAt: null,
      suspendedAt: null,
    },
  });

  const team = await Team.findByPk(user.teamId);

  await signIn(ctx, "mock", {
    user,
    team: team || user.team,
    isNewTeam: true,
    isNewUser: true,
    client: Client.Web,
  });

  ctx.redirect("/auth/redirect");
});

export default router;

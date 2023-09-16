import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { subredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { subredditId } = subredditSubscriptionValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new NextResponse("You are not subscribed to this subreddit", {
        status: 400,
      });
    }

    // check if user is creator of the subreddit

    const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
        creatorId: session.user.id,
      },
    });

    if (subreddit) {
      return new NextResponse(
        "You cannot unsubscribe from a subreddit you created",
        {
          status: 400,
        }
      );
    }

    await db.subscription.delete({
      where: {
        userId_subredditId: {
          subredditId,
          userId: session.user.id,
        },
      },
    });

    return new NextResponse(subredditId);
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    }

    return new NextResponse("Could not unsusbcribe. Please try again later", {
      status: 500,
    });
  }
}

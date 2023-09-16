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

    if (subscriptionExists) {
      return new NextResponse("You are already subscribed to this subreddit", {
        status: 400,
      });
    }

    await db.subscription.create({
      data: {
        subredditId,
        userId: session.user.id,
      },
    });

    return new NextResponse(subredditId);
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    }

    return new NextResponse("Could not susbcribe. Please try again later", {
      status: 500,
    });
  }
}

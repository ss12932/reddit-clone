import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { subredditValidator } from "@/lib/validators/subreddit";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = subredditValidator.parse(body);

    const subredditExists = await db.subreddit.findFirst({
      where: {
        name,
      },
    });

    if (subredditExists) {
      return new NextResponse("subreddit already exists", { status: 409 });
    }

    const subreddit = await db.subreddit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: subreddit.id,
      },
    });

    return NextResponse.json(subreddit.name);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse(err.message, { status: 422 });
    }

    return new NextResponse("Could not create subreddit", { status: 500 });
  }
}

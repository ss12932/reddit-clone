import { Post, User, Vote } from "@prisma/client";
import { formatTimeToNow } from "@/lib/utils";

interface PostProps {
  subredditName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
}

const Post: React.FC<PostProps> = ({ subredditName, post }) => {
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        {/* TODO: Post Votes */}
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {subredditName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/r/${subredditName}`}
                >
                  r/{subredditName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.name}</span>
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

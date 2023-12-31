import { fetchUsers } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";

import UserCard from "../cards/UserCard";
import { currentUser } from "@clerk/nextjs";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const similarMinds = await fetchUsers({ userId: user.id, pageSize: 4 });
  const suggestedCommunities = await fetchCommunities({ pageSize: 4 });

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Communities</h3>
        <div className="mt-7 flex flex-col w-[350px] gap-9">
          {suggestedCommunities.communities.length > 0 ? (
            <>
              {suggestedCommunities.communities.map((community) => (
                <UserCard key={community.id} id={community.id} name={community.name} username={community.username} imgUrl={community.image} personType="Community" />
              ))}
            </>
          ) : (
            <p className="text-base-regular text-light-3">
              No Communities yet!
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Similar Minds</h3>
        <div className="mt-7 flex flex-col w-[350px] gap-9">
          {suggestedCommunities.communities.length > 0 ? (
            <>
              {similarMinds.users.map((community) => (
                <UserCard key={community.id} id={community.id} name={community.name} username={community.username} imgUrl={community.image} personType="User" />
              ))}
            </>
          ) : (
            <p className="text-base-regular text-light-3">
              No Users yet!
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default RightSidebar;
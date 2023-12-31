import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import { fetchUsers, fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";


async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined}}) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect('/onboarding');

  // Fetch users
  const result = await fetchUsers({ userId: user.id, searchString: searchParams.query, pageNumber: 1, pageSize: 25 });
   
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* Search Bar */}
      <Searchbar routeType="search" placeholder="Search users" />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard key={person.id} id={person.id} name={person.name} username={person.username} imgUrl={person.image} personType="User" />
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default Page;
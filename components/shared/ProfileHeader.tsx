// import { clerkClient } from "@clerk/nextjs";
// import { OrganizationMembership } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string; 
  bio: string;
  type?: 'User' | 'Community';
}



const ProfileHeader = ({accountId, authUserId, name, username, imgUrl, bio, type }: Props) => {
  // let organization: OrganizationMembership[] = [];
  // if (type === 'Community') {
  //   organization = await clerkClient.organizations.getOrganizationMembershipList({ organizationId: accountId });
  // }

  // const isAdmin = (userId: string) => {
  //   return organization.find((membership) => membership.publicUserData?.userId === userId && membership.role === 'admin') ? true : false;
  // }

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image src={imgUrl} alt="Profile Image" fill className="rounded-full object-cover shadow-2xl" />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
        {accountId === authUserId && type !== 'Community' && (
          <Link href="/profile/edit">
            <div className="flex gap-3 bg-dark-3 rounded-lg py-2 px-4">
              <Image src="/assets/edit.svg" alt="edit" width={16} height={16} />
              <p className="text-light-2">Edit</p>
            </div>
          </Link>
        )}
      </div>
      
      {/* TODO: Community */}

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  )
}

export default ProfileHeader
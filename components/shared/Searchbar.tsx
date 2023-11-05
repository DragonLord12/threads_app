"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  routeType: string;
  placeholder: string;
}

const Searchbar = ({ routeType, placeholder }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?query=${search}`);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, routeType]);
  return (
    <div className="searchbar">
      <Image src="./assets/search-gray.svg" alt="search" width={24} height={24} />
      <Input placeholder={placeholder} onChange={(e) => setSearch(e.target.value)} className="searchbar_input no-focus"/>
    </div>
  )
}

export default Searchbar;
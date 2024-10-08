"use client";
import { useSanitizeInput } from "@/utils/useSanitizeInput";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";

const ContactsBody = memo(({ contactsData }: { contactsData: string[] }) => {
  const [search, setSearch] = useState<string>("");
  const [showContacts, setShowContacts] = useState<string[]>([]);

  useEffect(() => {
    setShowContacts(contactsData);
  }, []);

  useEffect(() => {
    const contactArray = contactsData.filter((item) =>
      item.trim().toLowerCase().includes(search.trim().toLowerCase())
    );
    setShowContacts(contactArray);
  }, [search]);

  return (
    <div className="w-full min-h-screen px-8 py-8 pt-20 flex flex-col gap-4">
      <div className="w-full h-20 bg-black/5 rounded-xl flex items-center justify-between gap-4 px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-10 stroke-white active:scale-95"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(useSanitizeInput(e.target.value))}
          placeholder="نام کاربریه کاربر مورد نظر خود را بنویسید"
          className="w-full h-full text-xl font-bold text-first/80 bg-transparent p-0 rtl"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-4 child:text-first/80 child:text-2xl">
        {showContacts?.length
          ? showContacts.map((item, index) => (
              <Link
                href={`/chat/${item}`}
                key={index}
                className="w-full h-16 bg-black/20 rounded-lg bg-20 shadow-md active:scale-95 flex items-center justify-between px-5"
              >
                <div className="w-20 center gap-2">
                  <Image
                    src="/images/star.svg"
                    width={50}
                    height={50}
                    alt="star"
                    className="size-8"
                  />
                  <Image
                    src="/images/star.svg"
                    width={50}
                    height={50}
                    alt="star"
                    className="size-5"
                  />
                </div>
                {item}
                <div className="w-20 center gap-2">
                  <Image
                    src="/images/star.svg"
                    width={50}
                    height={50}
                    alt="star"
                    className="size-5"
                  />
                  <Image
                    src="/images/star.svg"
                    width={50}
                    height={50}
                    alt="star"
                    className="size-8"
                  />
                </div>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
});

export default ContactsBody;

import Image from "next/image";
import Link from "next/link";
import React, { memo, useState } from "react";

const Offline = memo(() => {
  const [category, setCategory] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col gap-9 items-center justify-between">
      <p className="text-first/60 font-bold text-2xl">
        یکی از موضوعات را انتخاب کرده و بازی را شروع کنید
      </p>
      <div className="w-full flex items-center justify-center">
        <div className="grid grid-cols-2 gap-6">
          <div
            onClick={() => setCategory("ریاضی")}
            className={`${
              category === "ریاضی" && "borderSelectCategory"
            } size-48 bg-first/10 rounded-2xl flex flex-col items-center justify-center gap-2`}
          >
            <Image
              src="/images/math.svg"
              width={0}
              height={0}
              alt="ریاضی"
              className="size-24"
            />
            <span className="text-2xl text-first font-bold">ریاضی</span>
          </div>
          <div
            onClick={() => setCategory("ورزش")}
            className={`${
              category === "ورزش" && "borderSelectCategory"
            } size-48 bg-first/10 rounded-2xl flex flex-col items-center justify-center gap-2`}
          >
            <Image
              src="/images/exercise.svg"
              width={0}
              height={0}
              alt="ورزش"
              className="size-24"
            />
            <span className="text-2xl text-first font-bold">ورزش</span>
          </div>
          <div
            onClick={() => setCategory("حیوانات")}
            className={`${
              category === "حیوانات" && "borderSelectCategory"
            } size-48 bg-first/10 rounded-2xl flex flex-col items-center justify-center gap-2`}
          >
            <Image
              src="/images/animal.svg"
              width={0}
              height={0}
              alt="حیوانات"
              className="size-24"
            />
            <span className="text-2xl text-first font-bold">حیوانات</span>
          </div>
          <div
            onClick={() => setCategory("غذا و خوراکی")}
            className={`${
              category === "غذا و خوراکی" && "borderSelectCategory"
            } size-48 bg-first/10 rounded-2xl flex flex-col items-center justify-center gap-2`}
          >
            <Image
              src="/images/food.svg"
              width={0}
              height={0}
              alt="غذا و خوراکی"
              className="size-24"
            />
            <span className="text-2xl text-first font-bold">غذا و خوراکی</span>
          </div>
          <div
            onClick={() => setCategory("بازی های یارانه ای")}
            className={`${
              category === "بازی های یارانه ای" && "borderSelectCategory"
            } size-48 bg-first/10 rounded-2xl flex flex-col items-center justify-center gap-2`}
          >
            <Image
              src="/images/game.svg"
              width={0}
              height={0}
              alt="بازی های یارانه ای"
              className="size-24"
            />
            <span className="text-2xl text-first font-bold">
              بازی های یارانه ای
            </span>
          </div>
          <div
            onClick={() => setCategory("زبان انگیلیسی")}
            className={`${
              category === "زبان انگیلیسی" && "borderSelectCategory"
            } size-48 bg-first/10 rounded-2xl flex flex-col items-center justify-center gap-2`}
          >
            <Image
              src="/images/language.svg"
              width={0}
              height={0}
              alt="زبان انگیلیسی"
              className="size-24"
            />
            <span className="text-2xl text-first font-bold">زبان انگیلیسی</span>
          </div>
        </div>
      </div>
      <Link
        href={`/startGame/${category}`}
        className="w-full h-20 rounded-2xl bg-green-500 text-first font-bold text-3xl flex items-center justify-center tracking-wider active:scale-[99%] active:border-0"
      >
        شروع بازی
      </Link>
    </div>
  );
});

export default Offline;

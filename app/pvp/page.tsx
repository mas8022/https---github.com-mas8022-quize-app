"use client";
import React, { memo, useEffect, useState } from "react";
import QuizPVP from "@/app/components/template/QuizPVP";

const page = memo(() => {
  const [gameTime, setGameTime] = useState(70);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));

    if (gameTime >= 1) {
      const intervalGameTimer = setInterval(() => {
        setGameTime((p) => p - 1);
      }, 1000);

      return () => {
        clearInterval(intervalGameTimer);
      };
    }
  }, []);

  return (
    <div>
      {gameTime < 60 ? (
        <QuizPVP questionsData={JSON.parse(JSON.stringify(questions))} />
      ) : (
        <div className="w-full h-screen center flex-col gap-8">
          <span className="text-[20rem] font-bold text-first/80">
            {gameTime - 60}
          </span>
          <span className="text-5xl font-bold text-first/50">تا شروع بازی</span>
        </div>
      )}
    </div>
  );
});

export default page;

"use client";
import { useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import swal from "sweetalert";
import { QuestionType } from "@/types";

const Quiz = memo(({ questionsData }: { questionsData: [QuestionType] }) => {
  const router = useRouter();
  const [question, setQuestion] = useState<string>(questionsData[0].question);
  const [turn, setTurn] = useState(0);
  const [time, setTime] = useState(45); // The duration of the game
  const [score, setScore] = useState(0);
  const [answerOne, setAnswerOne] = useState<string>(
    questionsData[turn].answerOne
  );
  const [answerTwo, setAnswerTwo] = useState<string>(
    questionsData[turn].answerTwo
  );
  const [answerThree, setAnswerThree] = useState<string>(
    questionsData[turn].answerThree
  );
  const [answerFour, setAnswerFour] = useState<string>(
    questionsData[turn].answerFour
  );
  const [correctAnswer, setCorrectAnswer] = useState<string>(
    questionsData[turn].correctAnswer
  );

  const selectAnswer = async (answer: string) => {
    if (turn !== questionsData?.length - 1) {
      setTurn((p) => p + 1);
    }
    if (answer === correctAnswer) {
      await setScore((p) => p + 25);
    }

    if (turn === questionsData?.length - 1) {
      swal({
        icon: "success",
        title: "پایان بازی",
        text: `مقدار سوالی که درست جواب دادید: %${score}`,
        closeOnClickOutside: false,
      }).then(async () => {
        await fetch("/api/calcScore", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score }),
        });
        location.replace("/");
      });
    }
  };

  const exist = () => {
    router.replace("/");
  };

  useEffect(() => {
    if (!!questionsData[turn]) {
      setQuestion(questionsData[turn].question);
      setAnswerOne(questionsData[turn].answerOne);
      setAnswerTwo(questionsData[turn].answerTwo);
      setAnswerThree(questionsData[turn].answerThree);
      setAnswerFour(questionsData[turn].answerFour);
      setCorrectAnswer(questionsData[turn].correctAnswer);
    }
  }, [turn]);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      swal({
        icon: "success",
        title: "پایان بازی",
        text: `مقدار سوالی که درست جواب دادید: %${score}`,
        closeOnClickOutside: false,
      }).then(() => router.replace("/"));
    }
  }, [time]);

  return (
    <>
      <div
        className={`w-full h-screen bg-[url(/images/bg-question.png)] object-cover startGameContainer ${
          time <= 10 ? "startGameContainer--alert" : ""
        }`}
      >
        <div className="w-full min-h-56 center p-12 bg-first shadow-lg text-black/70 text-3xl rounded-lg text-center font-bold">
          {question}
        </div>
        <div className="size-52 text-[5rem] center text-first/90 bg-black/20 rounded-full">
          {time}s
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <div
            onClick={() => selectAnswer(answerOne)}
            className="w-full h-16 center rounded-lg text-first text-2xl font-bold active:scale-[99%] shadow-md bg-orange-400"
          >
            {answerOne}
          </div>
          <div
            onClick={() => selectAnswer(answerTwo)}
            className="w-full h-16 center rounded-lg text-first text-2xl font-bold active:scale-[99%] shadow-md bg-orange-400"
          >
            {answerTwo}
          </div>
          <div
            onClick={() => selectAnswer(answerThree)}
            className="w-full h-16 center rounded-lg text-first text-2xl font-bold active:scale-[99%] shadow-md bg-orange-400"
          >
            {answerThree}
          </div>
          <div
            onClick={() => selectAnswer(answerFour)}
            className="w-full h-16 center rounded-lg text-first text-2xl font-bold active:scale-[99%] shadow-md bg-orange-400"
          >
            {answerFour}
          </div>
        </div>
        <div
          onClick={exist}
          className="w-full h-16 center bg-red-500 rounded-lg text-first text-3xl font-bold active:scale-[99%] shadow-lg"
        >
          پایان بازی
        </div>
      </div>
      <div className="w-full h-full px-8 py-8 flex flex-col items-center justify-between backdrop-blur-sm"></div>
    </>
  );
});

export default Quiz;

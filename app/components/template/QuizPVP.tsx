"use client";
import { useRouter } from "next/navigation";
import React, { memo, useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { QuestionType } from "@/types";
import { getSocketConnection } from "@/app/socket";
import { context } from "@/utils/context";

const QuizPVP = memo(({ questionsData }: { questionsData: [QuestionType] }) => {
  const contextQuizPVP = useContext<any>(context);
  const socket = getSocketConnection();
  const router = useRouter();
  const [question, setQuestion] = useState<string>(questionsData[0].question);
  const [turn, setTurn] = useState(0);
  const [time, setTime] = useState(10); // The duration of the game
  const [score, setScore] = useState(0);
  const [myRealId, setMyRealId] = useState("");

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
  };

  useEffect(() => {
    console.log("score: ", score);
  }, [score]);

  useEffect(() => {
    fetch("/api/setPlayerStatusPlay", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contextQuizPVP.playersId),
    });
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => setMyRealId(data._id));

    socket.on("result-game", async (resultGame: Boolean) => {
      if (resultGame) {
        swal({
          icon: "success",
          title: "پایان بازی",
          text: "شما در این مسابقه بردید",

          closeOnClickOutside: false,
        }).then(() => location.replace("/"));
      } else {
        swal({
          icon: "error",
          title: "پایان بازی",
          text: "شما در این مسابقه باختید",
          closeOnClickOutside: false,
        }).then(() => router.replace("/"));
      }
    });
  }, []);

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
      fetch("/api/setTemporaryScore", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          myScore: score,
          myRealId,
        }),
      }).then(() => {
        socket.emit("finish-game", {
          playerOneId: contextQuizPVP.playersId.playerOneId,
          playerTwoId: contextQuizPVP.playersId.playerTwoId,
          myRealId,
        });
        setScore(0);
      });
    }
  }, [time]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-screen p-7 bg-[url(/images/bg-question.png)] object-cover startGameContainer flex flex-col items-center gap-12 ${
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
      </div>
    </>
  );
});

export default QuizPVP;

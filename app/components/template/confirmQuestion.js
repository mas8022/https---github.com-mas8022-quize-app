"use client";
import React, { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
const ConfirmQuestion = memo(({ questionsData }) => {
  const [turn, setTurn] = useState(0);
  const [questions, setQuestions] = useState(questionsData);
  const [question, setQuestion] = useState(questions[turn]?.question);
  const [answerOne, setAnswerOne] = useState(questions[turn]?.answerOne);
  const [answerTwo, setAnswerTwo] = useState(questions[turn]?.answerTwo);
  const [answerThree, setAnswerThree] = useState(questions[turn]?.answerThree);
  const [answerFour, setAnswerFour] = useState(questions[turn]?.answerFour);
  const [category, setCategory] = useState(questions[turn]?.category);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    if (!!questions[turn]) {
      setQuestion(questions[turn].question);
      setAnswerOne(questions[turn].answerOne);
      setAnswerTwo(questions[turn].answerTwo);
      setAnswerThree(questions[turn].answerThree);
      setAnswerFour(questions[turn].answerFour);
      setCategory(questions[turn].category);
      setCorrectAnswer(questions[turn].correctAnswer);
    }
  }, [turn]);

  const confirmQuestion = async () => {
    await fetch("/api/confirmQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: questions[turn]._id,
        question,
        answerOne,
        answerTwo,
        answerThree,
        answerFour,
        category,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.message);
          setTurn((p) => p + 1);
        } else if (result.status === 400) {
          toast.error(result.message);
        } else {
          toast.error(result.message);
        }
      });
  };

  const deleteQuestion = async () => {
    await fetch("/api/confirmQuestion", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: questions[turn]._id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.message);
          setTurn((p) => p + 1);
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <>
      {questions?.length && questions.length !== turn ? (
        <div className="w-full h-screen px-8 py-8 flex flex-col items-center justify-between">
          <div className="w-full flex flex-col items-center gap-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full min-h-52 py-4 px-6 rounded-2xl mb-6 rtl text-3xl text-black/60 font-bold text-center"
              placeholder="متن سوال"
            />

            <input
              value={answerOne}
              onChange={(e) => setAnswerOne(e.target.value)}
              type="text"
              className="w-full h-16 rounded-2xl rtl text-2xl text-black/60 font-bold"
              placeholder="جواب یک"
            />
            <input
              value={answerTwo}
              onChange={(e) => setAnswerTwo(e.target.value)}
              type="text"
              className="w-full h-16 rounded-2xl rtl text-2xl text-black/60 font-bold"
              placeholder="جواب دو"
            />
            <input
              value={answerThree}
              onChange={(e) => setAnswerThree(e.target.value)}
              type="text"
              className="w-full h-16 rounded-2xl rtl text-2xl text-black/60 font-bold"
              placeholder="جواب سه"
            />
            <input
              value={answerFour}
              onChange={(e) => setAnswerFour(e.target.value)}
              type="text"
              className="w-full h-16 rounded-2xl rtl text-2xl text-black/60 font-bold mb-6"
              placeholder="جواب چهار"
            />
            <input
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              type="text"
              className="w-full h-16 rounded-2xl rtl text-2xl text-black/60 font-bold"
              placeholder="جواب درست"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="w-full h-12 flex items-center justify-center bg-red-600/10 text-first text-xl rounded-lg">
              حتما دسته بندی سوال تان را مشخص کنید
            </p>
            <div className="w-full flex justify-center">
              <div className="grid grid-cols-3 gap-2">
                <div
                  onClick={() => setCategory("ریاضی")}
                  className={`w-40 h-12 bg-first/5 text-first/70 text-[1.3rem] rounded-lg flex items-center justify-center active:scale-[99%] ${
                    category === "ریاضی" && "borderSelectCategory"
                  }`}
                >
                  ریاضی
                </div>
                <div
                  onClick={() => setCategory("ورزش")}
                  className={`w-40 h-12 bg-first/5 text-first/70 text-[1.3rem] rounded-lg flex items-center justify-center active:scale-[99%] ${
                    category === "ورزش" && "borderSelectCategory"
                  }`}
                >
                  ورزش
                </div>
                <div
                  onClick={() => setCategory("غذا و خوراکی")}
                  className={`w-40 h-12 bg-first/5 text-first/70 text-[1.3rem] rounded-lg flex items-center justify-center active:scale-[99%] ${
                    category === "غذا و خوراکی" && "borderSelectCategory"
                  }`}
                >
                  غذا و خوراکی
                </div>
                <div
                  onClick={() => setCategory("حیوانات")}
                  className={`w-40 h-12 bg-first/5 text-first/70 text-[1.3rem] rounded-lg flex items-center justify-center active:scale-[99%] ${
                    category === "حیوانات" && "borderSelectCategory"
                  }`}
                >
                  حیوانات
                </div>
                <div
                  onClick={() => setCategory("زبان انگیلیسی")}
                  className={`w-40 h-12 bg-first/5 text-first/70 text-[1.3rem] rounded-lg flex items-center justify-center active:scale-[99%] ${
                    category === "زبان انگیلیسی" && "borderSelectCategory"
                  }`}
                >
                  زبان انگیلیسی
                </div>
                <div
                  onClick={() => setCategory("بازی های یارانه ای")}
                  className={`w-40 h-12 bg-first/5 text-first/70 text-[1.3rem] rounded-lg flex items-center justify-center active:scale-[99%] ${
                    category === "بازی های یارانه ای" && "borderSelectCategory"
                  }`}
                >
                  بازی های یارانه ای
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <div
              onClick={confirmQuestion}
              className="w-full h-16 rounded-2xl bg-green-500 text-first font-bold text-2xl flex items-center justify-center tracking-wider active:scale-[99%] active:border-0"
            >
              ثبت سوال
            </div>
            <div
              onClick={deleteQuestion}
              className="w-full h-16 rounded-2xl bg-rose-500 text-first font-bold text-2xl flex items-center justify-center tracking-wider active:scale-[99%] active:border-0"
            >
              حذف سوال
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="w-52 h-[50rem] text-7xl font-bold text-first/40 text-center tracking-widest">
            تمام سوالات بررسی شد
          </span>
        </div>
      )}
    </>
  );
});

export default ConfirmQuestion;

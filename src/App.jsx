import React, { useState, useEffect } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import './task';

const App = () => {
  const [name, setName] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [attempts, setAttempts] = useState();
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [danger, setDanger] = useState("");
  const [success, setSuccess] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [compNumber, setCompNumber] = useState(null);
  const [guess, setGuess] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !min.trim() || !max.trim() || attempts <= 1) {
      setDanger("Maʼlumotlar to‘liq kiritilmagan");
      setTimeout(() => {
        setDanger("");
      }, 3000);
    } else {
      setTimeout(() => {
        setSuccess("O'yinga muaffaqiyatli kirildi");
      }, 500);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setStartGame(true);
    }
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    setCompNumber(randomNum);
  };

  useEffect(() => {
    if (min && max && Number(max) > Number(min)) {
      const range = Number(max) - Number(min) + 1;
      const calcAttempts = Math.ceil(Math.log2(range));
      setAttempts(calcAttempts);
      setTotalAttempts(calcAttempts);
    } else {
      setAttempts("");
    }
  }, [min, max]);

  const gameOver = () => {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    if (attempts <= 0) {
      setDanger(`${formattedName}, afsuski siz yutqazdingiz`);
      setGuess("");
      setTimeout(() => setDanger(""), 3000);
      setTimeout(() => {
        const repeat = confirm("Yana o‘ynashni xohlaysizmi?");
        if (repeat) {
          setStartGame(false);
          setMin("");
          setMax("");
        } else {
          window.location.reload();
        }
      }, 3500);
    }
    if (guess === "" || Number(guess) <= 0) {
      setDanger(`${formattedName}, iltimos taxminingizni tog'ri kiriting`);
      setGuess("");
      setTimeout(() => {
        setDanger("");
      }, 3500);
    } else if (guess > compNumber) {
      setDanger(
        `${formattedName}, kiritgan ${guess} raqamingiz men oylagan sondan katta`
      );
      setAttempts((prev) => prev - 1);
      setGuess("");
      setTimeout(() => {
        setDanger("");
      }, 3500);
    } else if (guess < compNumber) {
      setDanger(
        `${formattedName}, kiritgan ${guess} raqamingiz men oylagan sondan kichik`
      );
      setAttempts((prev) => prev - 1);
      setGuess("");
      setTimeout(() => {
        setDanger("");
      }, 3500);
    } else {
      const used = totalAttempts - attempts + 1;
      setSuccess(
        `Tabriklayman ${formattedName} men oylagan ${compNumber} raqamini ${used} - urinishingizda topdingiz!`
      );
      setTimeout(() => {
        setSuccess("");
      }, 3500);
      setGuess("");

      setTimeout(() => {
        const repeat = confirm("Yana oynashni xohlaysizmi");
        if (repeat == true) {
          setStartGame(false);
          setMax("");
          setMin("");
          setTimeout(() => {
            setSuccess("Min va Max ni kiriting!");
          }, 500);
          setTimeout(() => {
            setSuccess("");
          }, 3500);
        } else {
          window.location.reload();
        }
      }, 4000);
    }

    if (attempts - 1 === 0) {
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      setDanger(`${formattedName} afsuski siz yutqazdingiz!`);
      setTimeout(() => {
        setDanger("");
      }, 3000);
      setTimeout(() => {
        const repeat = confirm("Yana oynashni xohlaysizmi");
        if (repeat == true) {
          setStartGame(false);
          setMax("");
          setMin("");
          setTimeout(() => {
            setSuccess("Min va Max ni kiriting!");
          }, 500);
          setTimeout(() => {
            setSuccess("");
          }, 3500);
        } else {
          window.location.reload();
        }
      }, 4000);
    }
  };

  return (
    <div className="h-screen w-full bg-[#101820] flex items-center justify-center p-[20px]">
      <div
        className={`flex items-center gap-[10px] py-[10px] px-[20px] mx-[20px] md:mx-0 rounded-[10px] font-poppins bg-green-500 shadow-sm shadow-green-500 text-white absolute ${
          success ? "top-[20px]" : "top-[-50%]"
        } `}
      >
        <FaRegCircleCheck className="text-[18px]" /> <p>{success}</p>
      </div>
      <div
        className={`flex items-center gap-[10px] py-[10px] px-[20px] mx-[20px] md:mx-0 rounded-[10px] font-poppins bg-red-500 shadow-sm shadow-red-500 text-white absolute transition-all duration-300 ${
          danger ? "top-[20px]" : "top-[-50%]"
        } `}
      >
        <IoIosCloseCircleOutline className="text-[22px]" /> <p>{danger}</p>
      </div>
      {startGame ? (
        <div className="flex flex-col items-center max-w-[750px] w-full text-white bg-[#2C2C2C] rounded-[20px] p-[20px] font-poppins">
          <h1 className="text-center text-[24px]/[30px] md:text-[34px]/[47px] font-semibold">
            Men {min} dan {max} gacha bo'lgan raqam haqida o'ylayapman. <br />{" "}
            Taxmin qila olasizmi?
          </h1>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="border-2 border-[#101820] p-[15px] text-[38px] text-center w-[100px] h-[100px] rounded-[5px] outline-none focus:border-white my-[40px]"
          />
          <div>
            <button
              onClick={gameOver}
              className="bg-[#2C3E50] text-[16px] md:text-[18px] font-poppins w-full rounded-[5px] py-[12px] px-[30px] opacity-85 hover:opacity-100 cursor-pointer"
            >
              Qani, ko‘raylik…
            </button>
            <p className="text-center mt-[20px]">Taxminlar soni: {attempts}</p>
          </div>
        </div>
      ) : (
        <div className="max-w-[750px] w-full text-white bg-[#2C2C2C] rounded-[20px] p-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[30px] font-poppins">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="font-semibold text-[16px] md:text-[18px] mb-[6px]"
              >
                Ismingiz
              </label>
              <input
                type="text"
                id="name"
                value={name}
                className="border border-[#fff] opacity-70 focus:opacity-100 py-[6px] px-[12px] rounded-[5px] outline-none"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="number"
                className="font-semibold text-[16px] md:text-[18px] mb-[6px]"
              >
                Urinishlar soni
              </label>
              <input
                type="number"
                id="number"
                value={attempts}
                className="border border-[#fff] py-[6px] px-[12px] rounded-[5px] outline-none opacity-50 bg-[#ffffff27]"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="min"
                className="font-semibold text-[16px] md:text-[18px] mb-[6px]"
              >
                Min
              </label>
              <input
                type="number"
                id="min"
                onChange={(e) => setMin(e.target.value)}
                className="border border-[#fff] opacity-70 focus:opacity-100 py-[6px] px-[12px] rounded-[5px] outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="max"
                className="font-semibold text-[16px] md:text-[18px] mb-[6px]"
              >
                Max
              </label>
              <input
                type="number"
                id="max"
                onChange={(e) => setMax(e.target.value)}
                className="border border-[#fff] opacity-70 focus:opacity-100 py-[6px] px-[12px] rounded-[5px] outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#2C3E50] text-[16px] md:text-[18px] font-poppins w-full mt-[30px] rounded-[5px] py-[12px] opacity-85 hover:opacity-100 cursor-pointer"
          >
            Boshlash
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

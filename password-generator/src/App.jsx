import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumber) {
      str += "0123456789";
    }
    if (isChar) {
      str += "!@#$%^&*(){}:~";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }
    setPassword(password);
  }, [length, isNumber, isChar, setPassword]);

  const copyPassClipboard = useCallback(() => {
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0, 30);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumber, isChar, passwordGenerator]);
  return (
    <>
      <div className=" bg-gray-900 p-10 mx-24 mt-20 h-max rounded-xl font-mono text-white">
        <div className="flex justify-center items-center">
          <input
            type="text"
            value={password}
            className=" px-4 py-2 text-2xl w-2/4 rounded-lg text-black"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button
            className=" bg-teal-600  text-white text-lg px-10 py-2 m-6 rounded-xl shadow-md hover:bg-teal-700 outline-none"
            onClick={copyPassClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex gap-3 justify-center mt-6">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className=" w-36 cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length} | </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              id="numberInput"
              onChange={() => {
                setIsNumber((prev) => {
                  return !prev;
                });
              }}
            />
            <label>numbers | </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked={isChar}
              id="charInput"
              onChange={() => {
                setIsChar((prev) => {
                  return !prev;
                });
              }}
            />
            <label>characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

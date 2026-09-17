"use client";

import { useState, useEffect, useRef } from "react";
import { evaluate } from "mathjs";
import Button from "./Button";

export default function Home() {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState("");
  const beforeSelected = useRef("");
  const selected = useRef("");
  const afterSelected = useRef("");

  const updateSelection = (before: string, current: string, after: string) => {
    beforeSelected.current = before;
    selected.current = current;
    afterSelected.current = after;
    console.log(beforeSelected, " ", selected, " ", afterSelected);
  };

  const bracketEquation = () => {
    let newEquation: string = beforeSelected.current + "(" + selected.current + ")" + afterSelected.current;
    setEquation(newEquation.toString());
  };

  const addToEquation = (input: string) => {
    setEquation((e) => {
      if (e === "0") {
        return input;
      }
      return e + input;
    });
  };

  const removeFromEquation = () => {
    setEquation((current) => {
      if (current.length <= 1) {
        return "0";
      }
      return current.slice(0, -1);
    });
  };

  const resetEquation = () => {
    setEquation("");
    setResult("");
  };

  const evaluateEquation = () => {
    let value: string = "";
    try {
      value = evaluate(equation).toString();
    } catch (error: unknown) {
      if (error instanceof Error) {
        value = "Error message: " + error.message;
      }
    }
    setResult(value);
  };

  /*
  useEffect(() => {
    console.log("Equation: ", equation);
    console.log("Result: ", output);
  }, [equation]);
  */

  return (
    <div>
      <main>
        <h1>Calculator</h1>
        <p>This application allows the user to do simple and complex calculations using on-screen buttons OR the keyboard.</p>
        <input
          id="inputEquation"
          type="text"
          placeholder="Your equation ..."
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              evaluateEquation();
            }
          }}
          onSelect={(e) => {
            const input = e.target as HTMLInputElement;
            if (input.selectionStart === input.selectionEnd) {
              updateSelection("", equation, "");
            } else {
              updateSelection(
                input.value.slice(0, input.selectionStart ?? 0),
                input.value.slice(input.selectionStart ?? 0, input.selectionEnd ?? 0),
                input.value.slice(input.selectionEnd ?? 0, input.value.length),
              );
            }
          }}></input>
        <p>{result}</p>
        <Button label="<" onClick={() => removeFromEquation()}></Button>
        <Button label="AC" onClick={() => resetEquation()}></Button>
        <Button label="()" onClick={() => bracketEquation()}></Button>
        <Button label="+" onClick={() => addToEquation("+")}></Button>
        <Button label="-" onClick={() => addToEquation("-")}></Button>
        <Button label="x" onClick={() => addToEquation("*")}></Button>
        <Button label="/" onClick={() => addToEquation("/")}></Button>
        <Button label="=" onClick={() => evaluateEquation()}></Button>
      </main>
    </div>
  );
}

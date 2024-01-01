// src/index.ts
import express, { Request, Response } from "express";
import { Controller } from "./controllers";
import { mockUpData } from "./MockupData.json";
import cors from "cors";
import { MockUpData, TestResult } from "./type";

import path from "path";

const app = express();
const port = 3000;

app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

//-  routes for testing environment
//! 1
app.post("/sorted-number", (req: Request, res: Response) => {
  const input = [2, 3, 4, 4, 34, 6, 7, 2, 3, 7, 8, 8, 8, 7, 9, 10, 41, 8];
  const output = Controller.sortArrayByFrequencyAndValue(input);

  // since the input is immutable by the method, I create a new array to store for the original input
  const immutableInput = [
    2, 3, 4, 4, 34, 6, 7, 2, 3, 7, 8, 8, 8, 7, 9, 10, 41, 8,
  ];
  res.json({
    input: immutableInput,
    output,
  } as TestResult);
});

//! 2
app.post("/display", (req: Request, res: Response) => {
  const employees = [
    { name: "Arm", position: "Front End" },
    { name: "Game", position: "Back End" },
  ];
  const input = ["Janny", "Game"];

  let output: string[] = [];
  input.forEach((name) => {
    output.push(Controller.getEmployeeInfo(employees, name));
  });

  res.json({
    input,
    output,
  } as TestResult);
});

//! special testing
app.post("/special", (req: Request, res: Response) => {
  const input = mockUpData as MockUpData[];
  const output = Controller.mapData(input);

  res.json({
    input,
    output,
  } as TestResult);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

import "./App.css";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodoContext } from "./Contexts/TodoContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  {
    id: uuidv4(),
    title: "المهمة الأولى",
    details: "الإنجاز قبل نهاية الشهر",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الأولى",
    details: "الإنجاز قبل نهاية الشهر",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const theme = createTheme({
    typography: {
      fontFamily: "A",
    },
    palette: {
      primary: {
        main: "#cddc39",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#191b1f",
          direction: "rtl",
        }}
      >
        <TodoContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;

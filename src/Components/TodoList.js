// import * as React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../Contexts/TodoContext";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodoContext);
  const [input, setInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const uncompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;
  if (displayedTodosType === "all") {
    todosToBeRendered = todos;
  } else if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "uncompleted") {
    todosToBeRendered = uncompletedTodos;
  }

  const TodoList = todosToBeRendered.map((todo) => {
    return <Todo todo={todo} key={todo.id} />;
  });

  function handleAddClick() {
    if (input !== "") {
      const newObj = {
        id: uuidv4(),
        title: input,
        details: "",
        isCompleted: false,
      };
      setTodos([...todos, newObj]);
      localStorage.setItem("todos", JSON.stringify([...todos, newObj]));
      setInput("");
    }
  }

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "100vh", overflow: "scroll",scrollbarColor:"transparent" }}
      >
        <CardContent>
          <Typography
            style={{ fontWeight: "200" }}
            variant="h1"
            component="div"
          >
            مهامي
          </Typography>
          <Divider />

          <ToggleButtonGroup
            style={{ marginTop: "30px", direction: "ltr" }}
            color="primary"
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="Platform"
            
          >
            <ToggleButton value="uncompleted">غير مُنجز</ToggleButton>
            <ToggleButton value="completed">مُنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* <Todo /> */}

          {TodoList}

          {/* input + button */}
          <Grid
            container
            spacing={4}
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
            }}
          >
            <Grid size={8}>
              <TextField
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                style={{ width: "100%" }}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
              />
            </Grid>
            <Grid size={4} sx={{ height: "100%" }}>
              <Button
                sx={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  handleAddClick();
                }}
                disabled= {input.length === 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

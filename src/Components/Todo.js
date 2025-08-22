// import CardActions from "@mui/material/CardActions";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import * as React from "react";
// import { DeleteModal } from "../DeleteModal";
import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState, useContext } from "react";
import { TodoContext } from "../Contexts/TodoContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todo({ todo, handleCheck }) {
  const { todos, setTodos } = useContext(TodoContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [titleAndDetail, setTitleAndDetail] = useState({
    title: todo.title,
    detail: todo.details,
  });

  function handleDeleteClick() {
    setOpenDeleteDialog(true);
  }

  function handleUpdateClick() {
    setOpenUpdateDialog(true);
  }

  function handleDeleteDialogClose() {
    setOpenDeleteDialog(false);
  }

  function handleUpdateClose() {
    setOpenUpdateDialog(false);
  }

  function handleCheckClick() {
    const updatedTodo = todos.map((t) => {
      if (todo.id === t.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }

  function handleDeleteConfirm() {
    const updatedTodo = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: titleAndDetail.title,
          details: titleAndDetail.detail,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    handleUpdateClose(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <>
      <Dialog
        style={{ direction: "rtl" }}
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك في حذف المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم , قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/*  */}

      <Dialog
        style={{ direction: "rtl" }}
        open={openUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="العنوان"
            fullWidth
            variant="standard"
            value={titleAndDetail.title}
            onChange={(e) => {
              setTitleAndDetail({ ...titleAndDetail, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={titleAndDetail.detail}
            onChange={(e) => {
              setTitleAndDetail({ ...titleAndDetail, detail: e.target.value });
            }}
          />
          {/* <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleUpdateClose}>إلغاء</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            قم بالتعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/*  */}
      <Card
        sx={{
          minWidth: 275,
          background: "teal",
          color: "white !important",
          marginTop: "20px",
        }}
        className="card"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                align="right"
                // style={}
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" align="right">
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              size={4}
            >
              <IconButton
                className="iconButton"
                aria-label="delete"
                sx={{
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  border: "solid 2px #8bc34a",
                }}
              >
                <CheckIcon onClick={handleCheckClick} />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "#1769aa",
                  border: "solid 2px #1769aa",
                  background: "white",
                }}
              >
                <EditOutlinedIcon onClick={handleUpdateClick} />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "#b23c17",
                  border: "solid 2px #b23c17",
                  background: "white",
                }}
              >
                <DeleteOutlineOutlinedIcon onClick={handleDeleteClick} />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

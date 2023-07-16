import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = () => {
  const [newtask, settask] = useState([]);
  const [newtasktitle, setnewtasktitle] = useState("");
  const [newtaskdescription, setnewtaskdescription] = useState("");

  const [newtaskduedate, setnewtaskduedate] = useState([new Date()]);

  const createTask = async () => {
    if (
      newtasktitle.trim() === "" ||
      newtaskdescription.trim() === "" ||
      newtaskduedate === ""
    ) {
      return toast.warning("Please provide complete task details");
    }

    const oldtask = [...newtask];
    const Uptask = {
      taskname: newtasktitle,
      taskdescription: newtaskdescription,
      taskdate: newtaskduedate,
      taskstatus: "To Do",
    };
    oldtask.push(Uptask);
    settask(oldtask);

    toast.success("created successfully");
    setnewtasktitle("");
    setnewtaskdescription("");
    setnewtaskduedate(new Date());

    //code for sending data to backed
    //syntax=axios.method(rotename,data or body or object)
    const response = await axiox.post("/api/task", {
      newtasktitle,
      newtaskdescription,
      newtaskduedate,
      taskstatus: "To Do",
    });
  };
  // const updatestatus = (v, c) => {
  //   const oldtask = [...newtask];
  //   const taskstatus = oldtask[c].taskstatus;
  //   if (taskstatus === "To Do") {
  //     oldtask[c].taskstatus = "In Progress";
  //     settaskstatus(oldtask);
  //   } else if (taskstatus === "In Progress") {
  //     oldtask[c].taskstatus = "Completed";
  //     settaskstatus(oldtask);
  //   } else if (taskstatus === "Completed") {
  //     oldtask[c].taskstatus = "To Do";
  //     settaskstatus(oldtask);
  //   }
  // };

  // const getcurrentbutton = (taskstatus) => {
  //   if (taskstatus === "To Do") {
  //     return "Start";
  //   } else if (taskstatus === "In Progress") {
  //     return "Complete";
  //   } else if (taskstatus === "Completed") {
  //     return "Restart";
  //   }
  // };

  const COLORS = {
    "To Do": "rgb(155, 52, 104)",
    "In Progress": "rgb(83, 32, 57)",
    Completed: "rgb(127, 51, 88)",
  };
  return (
    <>
      <nav>
        <h1 id="navtext">
          <i>
            <b>TASK MANAGEMENT</b>
          </i>
        </h1>{" "}
      </nav>
      <ToastContainer />
      <div class="main">
        <h1>
          <i>Enter Your Task Here </i>
        </h1>
        <div className="mt-2;">
          <label>
            <b>Task Title:- </b>
          </label>
          <input
            value={newtasktitle}
            onChange={(e) => setnewtasktitle(e.target.value)}
            type="text"
            placeholder="Enter your task"
          />
        </div>
        <br />
        <div className="mt-2;">
          <label>
            <b>Task Description:-</b>
          </label>
          <textarea
            value={newtaskdescription}
            onChange={(e) => setnewtaskdescription(e.target.value)}
            type="text"
            placeholder="Enter Description"
          />
        </div>
        <br />
        <div className="mt-2;">
          <label>
            <b>Task Due Date:-</b>
          </label>
          <input
            value={newtaskduedate}
            onChange={(a) => setnewtaskduedate(a.target.value)}
            type="date"
          />
        </div>
        <br />
        <button
          class="createtask"
          style={{
            backgroundColor: "black",
            padding: "1%",
            borderRadius: "20%",
            color: "rgb(250, 55, 152)",
            marginTop: "5%",
          }}
          onClick={() => createTask()}
        >
          click me
          <AddBoxIcon />
        </button>
      </div>
      {newtask.map((v, i) => {
        return (
          <div
            key={i}
            style={{ backgroundColor: COLORS[v.taskstatus] }}
            id="tasks"
          >
            <h3>
              <b>New Task</b>
            </h3>
            <ul>
              <li>Title : {v.taskname}</li>
              <li>Description : {v.taskdescription}</li>
              <li>Date : {v.taskdate}</li>
              <li>Status:{v.taskstatus}</li>
            </ul>
            <button
              style={{
                backgroundColor: COLORS[v.taskstatus],
                marginRight: "1%",
                borderRadius: "30%",
                paddingRight: "2%",
                paddingLeft: "2%",
              }}
              onClick={() =>
                settask((oldtask) => oldtask.filter((v, index) => index !== i))
              }
              type="button"
            >
              <DeleteSweepIcon />
            </button>
            {v.taskstatus === "To Do" ? (
              <>
                <button
                  style={{
                    backgroundColor: COLORS[v.taskstatus],
                    padding: "0.8%",
                    marginBottom: "1%",
                    borderRadius: "30%",
                  }}
                  type="button"
                  onClick={() =>
                    settask((oldtask) =>
                      oldtask.map((item, newindex) =>
                        newindex === i
                          ? { ...item, taskstatus: "In Progress" }
                          : item
                      )
                    )
                  }
                >
                  Start Task
                </button>
              </>
            ) : v.taskstatus === "In Progress" ? (
              <>
                <button
                  type="button"
                  style={{
                    backgroundColor: COLORS[v.taskstatus],
                    padding: "0.8%",
                    marginBottom: "1%",
                    borderRadius: "30%",
                  }}
                  onClick={() =>
                    settask((oldtask) =>
                      oldtask.map((item, newindex) =>
                        newindex === i
                          ? { ...item, taskstatus: "Completed" }
                          : item
                      )
                    )
                  }
                >
                  Complete
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  style={{
                    backgroundColor: COLORS[v.taskstatus],
                    padding: "0.8%",
                    marginBottom: "1%",
                    borderRadius: "30%",
                  }}
                  onClick={() =>
                    settask((oldtask) =>
                      oldtask.map((item, newindex) =>
                        newindex === i ? { ...item, taskstatus: "To Do" } : item
                      )
                    )
                  }
                >
                  Restart
                </button>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};
export default Task;

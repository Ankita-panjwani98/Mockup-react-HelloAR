import "./App.css";
import Navbar from "./Navbar";
import MainSection from "./MainSection";
import { useEffect, useState } from "react";
import { useSnackbar } from "react-simple-snackbar";

const options = {
  position: "top-center",
  style: {
    backgroundColor: "#57CA85",
    // border: "2px solid rgb(241, 94, 65)",
    color: "white",
    fontSize: "15px",
    textAlign: "center",
    // width: '200px'
  },
  closeStyle: {
    color: "white",
    fontSize: "15px",
  },
};
function App() {
  const [userDetails, setDetails] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const initialState = {
    id: userDetails.length + 1,
    userEmailId: "",
    role: "",
  };
  const [user, setUser] = useState(initialState);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [openSnackbar] = useSnackbar(options);

  const handleSubmit = (item) => {
    if (userDetails.length > 0) {
      let index = userDetails.findIndex((element) => {
        if (element.userEmailId === item.userEmailId) {
          return true;
        }

        return false;
      });

      if (index !== -1) {
        openSnackbar("User already Exists", 2000);
      } else {
        setDetails((prev) => {
          return [...prev, item];
        });
      }
    } else {
      setDetails((prev) => {
        return [...prev, item];
      });
    }

    setUser(initialState);
    handleClose();
  };
  const handleDelete = (deleteItem) => {
    let newUserData = [...userDetails];
    if (newUserData.includes(deleteItem)) {
      newUserData = newUserData.filter((item) => item.id !== deleteItem.id);

      setDetails(newUserData);
      openSnackbar("User Deleted Sucessfully", 2000);
    } else {
      openSnackbar("User cannot be Deleted", 2000);
    }
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(userDetails));
  }, [userDetails]);

  return (
    <div className="App">
      <Navbar />
      <MainSection
        userDetails={userDetails}
        options={options}
        user={user}
        setUser={setUser}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default App;

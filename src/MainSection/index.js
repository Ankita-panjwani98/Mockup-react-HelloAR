import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSnackbar } from "react-simple-snackbar";
import { makeStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import "./index.css";

const useStyles = makeStyles({
  roleSelectInput: {
    "& .MuiFormLabel-root": {
      color: "red", // or black
    },
  },
});

function MainSection({
  user,
  setUser,
  onSubmit,
  options,
  onDelete,
  userDetails,
  handleClose,
  open,
  setOpen
}) {

  const classes = useStyles();
  const [error, setErrors] = useState('');
  const [openSnackbar] = useSnackbar(options);
  const lastSignedInOptions = [
    "Within 1 hour",
    "20 minutes ago",
    "0 minutes ago",
    "30 minutes ago",
    "2 days ago",
  ];
  const handleClickOpen = () => {
    setOpen(true);
  };

 

  const handleChange = (event) => {
    // setAge(event.target.value);
    setErrors('');
    const { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const emailValidation = (emailId) => {
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if (regex.test(emailId) === false) {
      return false;
    } else {
      return true;
    }
  };

  const handleUserDetails = (e) => {
    const ids = userDetails.map((object) => {
      return object.id;
    });
    const max = Math.max(...ids);
    e.preventDefault();
  
    if (user.userEmailId.length === 0 && user.role.length === 0) {
      openSnackbar("Email ID and Role are required!!", 2000);
    } else if (user.userEmailId.length != 0 && user.role.length === 0) {
      openSnackbar(" Role is required!!", 2000);
    } else if (user.userEmailId.length === 0 && user.role.length != 0) {
      openSnackbar(" Email Id is required!!", 2000);
    } else {
      if (emailValidation(user.userEmailId)) {
        if (max === userDetails.length) {
          onSubmit({ ...user, id: max + 1 });
        } else {
          if (userDetails.length > 0) {
            onSubmit({ ...user, id: max + 1 });
          } else {
            onSubmit({ ...user, id: userDetails.length + 1 });
          }
        }
      } else {
        setErrors("Enter Valid Email ID!!");
      }
    }

    
  };

  const onDeleteItem = (item) => {
    console.log("Item to be deleted:", item.id);
    onDelete(item);
  };

  console.log("HANDLE CHANGE VALUES: ", user);
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>
            <p>Products</p>
          </Tab>
          <Tab>
            <p>Demo Scripts</p>
          </Tab>
          <Tab>
            <p>Customers</p>
          </Tab>
          <Tab>
            <p>Sales Team</p>
          </Tab>
          <Tab>
            <p>Demos</p>
          </Tab>
          <Tab>
            <p>Settings</p>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="panel-content">
            <h2>Products</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Demo Scripts</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Customers</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Sales Team</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Demos</h2>
          </div>
        </TabPanel>

        {/* user details displayed in Table */}
        <TabPanel>
          <div className="main-section">
            <div className="add-user-btn" onClick={handleClickOpen}>
              ADD USER
            </div>
            <div className="user-details-section">
              <table id="customers">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th className="th-heading">
                      <span className="th-heading-name">User</span>
                      <span className="order-icons">
                        <span>
                          <img
                            className="icons-upDown"
                            src="./images/arrow-up.png"
                            height="10px"
                            width="10px"
                          />
                        </span>
                        <span>
                          <img
                            className="icons-upDown"
                            src="./images/down_arrow.png"
                            height="10px"
                            width="10px"
                          />
                        </span>
                      </span>
                    </th>
                    <th className="th-heading">
                      <span className="th-heading-name">Last Signed In</span>
                      <span className="order-icons">
                        <span>
                          <img
                            className="icons-upDown"
                            src="./images/arrow-up.png"
                            height="10px"
                            width="10px"
                          />
                        </span>
                        <span>
                          <img
                            className="icons-upDown"
                            src="./images/down_arrow.png"
                            height="10px"
                            width="10px"
                          />
                        </span>
                      </span>
                    </th>
                    <th className="th-heading">
                      <span className="th-heading-name">Role</span>
                      <span className="order-icons">
                        <span>
                          <img
                            className="icons-upDown"
                            src="./images/arrow-up.png"
                            height="10px"
                            width="10px"
                          />
                        </span>
                        <span>
                          <img
                            className="icons-upDown"
                            src="./images/down_arrow.png"
                            height="10px"
                            width="10px"
                          />
                        </span>
                      </span>
                    </th>
                    <th></th>
                  </tr>

                  {userDetails?.length > 0 ? (
                    userDetails.map((item) => {
                      let emailid = item.userEmailId;
                      let ret = emailid.split('@')[0];
                      let userName = ret.charAt(0).toUpperCase() + ret.slice(1);
                      let lastSignedIn =
                        lastSignedInOptions[
                          Math.floor(Math.random() * lastSignedInOptions.length)
                        ];
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{userName}</td>
                          <td>{lastSignedIn}</td>
                          <td>{item.role}</td>

                          <td
                            className="delete-icon"
                            onClick={() => onDeleteItem(item)}
                          >
                            <Tooltip title="Delete">
                              <img
                                src="./images/delete.png"
                                height="35"
                                width="35"
                              />
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>No</td>
                      <td>Record</td>
                      <td>Found</td>
                      <td>Yet!</td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="pagination-section">
              <div></div>
              <div className="pagination-static-details">
                <div>Previous</div>
                <div className="first-page">1</div>
                <div>2</div>
                <div>Next</div>
              </div>
            </div>
          </div>
        </TabPanel>

        <Dialog maxWidth="md" open={open} onClose={handleClose}>
          <div className="modal-section">
            <div className="modal-content">
              <div className="add-user-image-container">
                <img src="./images/add-user.png" />
              </div>
              <div className="lorem-ipsum-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </div>
            </div>
            <div className="modal-form">
              <div className="user-information-title">User Information</div>

              <div className="email-container">
                <div className="email-role-text">Email Id of User</div>

                <TextField
                  id="outlined-basic"
                  type="email"
                  name="userEmailId"
                  value={user.userEmailId}
                  variant="outlined"
                  className="text-inputs"
                  onChange={handleChange}
                  required
                />
                <span className="error">{error}</span>
              </div>

              <div className="email-container">
                <div className="email-role-text">Role</div>
                <FormControl className="text-inputs">
                  <InputLabel id="demo-simple-select-label">Admin</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="role"
                    value={user.role}
                    label="Role"
                    className={classes.roleSelectInput}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Admin" default>
                      Admin
                    </MenuItem>
                    <MenuItem value="Owner">Owner</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="actions-buttons">
                <div></div>
                <div className="cancel-add-buttons">
                  <button
                    className="add-cancel-button-style cancel-btn"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="add-cancel-button-style add-btn"
                    onClick={handleUserDetails}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Tabs>
    </div>
  );
}

export default MainSection;

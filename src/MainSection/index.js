import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSnackbar } from "react-simple-snackbar";
import Tooltip from "@mui/material/Tooltip";
import DialogContainer from "../Dialog";
import "./index.css";

const tabsList = [
  "Products",
  "Demo Scripts",
  "Customers",
  "Sales Team",
  "Demos",
  "Settings",
];
const tabsPanelContent = [
  "Products",
  "Demo Scripts",
  "Customers",
  "Sales Team",
  "Demos",
];

function MainSection({
  user,
  setUser,
  onSubmit,
  options,
  onDelete,
  userDetails,
  handleClose,
  open,
  setOpen,
}) {
  const [error, setErrors] = useState("");
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
    setErrors("");
    const { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const emailValidation = (emailId) => {
    let regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
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
    } else if (user.userEmailId.length !== 0 && user.role.length === 0) {
      openSnackbar(" Role is required!!", 2000);
    } else if (user.userEmailId.length === 0 && user.role.length !== 0) {
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
    onDelete(item);
  };

  return (
    <div>
      <Tabs>
        <TabList>
          {tabsList.map((item, index) => {
            return (
              <Tab key={index}>
                <p>{item}</p>
              </Tab>
            );
          })}
        </TabList>

        {tabsPanelContent.map((item, index) => {
          return (
            <TabPanel key={index}>
              <div className="panel-content">
                <h2>{item}</h2>
              </div>
            </TabPanel>
          );
        })}

        {/* User details displayed in Table */}
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
                            alt="up"
                          />
                        </span>
                        <span>
                          <img
                            className="icons-upDown"
                            src="./images/down_arrow.png"
                            height="10px"
                            width="10px"
                            alt="down"
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
                            alt="up"
                          />
                        </span>
                        <span>
                          <img
                            className="icons-upDown"
                            src="./images/down_arrow.png"
                            height="10px"
                            width="10px"
                            alt="down"
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
                            alt="up"
                          />
                        </span>
                        <span>
                          <img
                            className="icons-upDown"
                            src="./images/down_arrow.png"
                            height="10px"
                            width="10px"
                            alt="down"
                          />
                        </span>
                      </span>
                    </th>
                    <th></th>
                  </tr>

                  {userDetails?.length > 0 ? (
                    userDetails.map((item) => {
                      let emailid = item.userEmailId;
                      let ret = emailid.split("@")[0];
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
                                alt="delete"
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

        <DialogContainer
          handleChange={handleChange}
          handleUserDetails={handleUserDetails}
          user={user}
          handleClose={handleClose}
          open={open}
          error={error}
        />
      </Tabs>
    </div>
  );
}

export default MainSection;

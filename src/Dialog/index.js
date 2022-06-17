import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function DialogContainer({
  handleClose,
  open,
  user,
  error,
  handleChange,
  handleUserDetails,
}) {
  return (
    <Dialog maxWidth="md" open={open} onClose={handleClose}>
      <div className="modal-section">
        <div className="modal-content">
          <div className="add-user-image-container">
            <img src="./images/add-user.png" alt="addUser" />
          </div>
          <div className="lorem-ipsum-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
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
  );
}

export default DialogContainer;

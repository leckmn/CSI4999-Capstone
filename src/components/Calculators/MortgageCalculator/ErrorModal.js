import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ErrorModal = ({ open, onClose, errorMessage }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxWidth: "600px",
          overflowX: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#d32f2f",
          color: "white",
          position: "relative",
        }}
      >
        Error
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <p>{errorMessage}</p>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;

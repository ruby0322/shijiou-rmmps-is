import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckIcon from "@mui/icons-material/Check";
import Popover from "@mui/material/Popover";
import * as React from "react";

const WaitingListItem = ({ item }) => {
  const {
    waitingNumber,
    lineUserId,
    status,
    groupSize,
    requestMadeTime,
    requestAnsweredTime,
    arriveTime,
    cancelTime,
  } = item;

  const clickNotification = (lineUserId) => {
    console.log("clickNotification, lineUserId", lineUserId);
  };

  const clickCheck = (lineUserId) => {
    console.log("clickCheck, lineUserId", lineUserId);
  };

  const clickDelete = (lineUserId) => {
    console.log("clickDelete, lineUserId", lineUserId);
  };

  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText primary={waitingNumber + "號"} />
        <ListItemText primary={groupSize + "人"} />
        <ListItemText primary={"候位時間 : " + requestMadeTime} />
        {requestAnsweredTime === undefined ? (
          <ListItemText primary={"尚未通知此顧客"} />
        ) : (
          <ListItemText primary={"通知時間 : " + requestAnsweredTime} />
        )}
        <IconButton
          edge="end"
          aria-label="notification"
          onClick={() => {
            clickNotification(lineUserId);
          }}
          disabled={requestAnsweredTime !== undefined}
        >
          <NotificationsActiveIcon fontSize="large" />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="check"
          onClick={() => clickCheck(lineUserId)}
        >
          <CheckIcon fontSize="large" />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => clickDelete(lineUserId)}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </ListItem>
    </div>
  );
};

export default WaitingListItem;

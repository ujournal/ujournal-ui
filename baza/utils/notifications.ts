import { createElement } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons";

export const showProgress = (id: string, message = "Processing...") => {
  showNotification({
    id,
    loading: true,
    message,
    autoClose: false,
    disallowClose: true,
  });
};

export const showSuccess = (id: string, message: string = "Done") => {
  updateNotification({
    id,
    color: "teal",
    icon: createElement(IconCheck, { size: 16 }),
    message,
  });
};

export const showFail = (
  id: string,
  message: string = `Oops. Something went wrong`
) => {
  updateNotification({
    id,
    color: "red",
    message,
    icon: createElement(IconAlertCircle, { size: 16 }),
    autoClose: 2000,
  });
};

import Toast from "react-bootstrap/Toast";
import { useNotificationContext } from "../../contexts/NotificationContext";

const Notification = () => {
  const { notification, hideNotification } = useNotificationContext();
  if (!notification.show) {
    return null;
  }

  return (
    <Toast
      className="notification d-inline-block m-1"
      bg={notification.type}
      onClose={hideNotification}
    
      delay={5000}
      autohide
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{notification.type.toUpperCase()}</strong>
      </Toast.Header>
      <Toast.Body>{notification.message}</Toast.Body>
    </Toast>
  );
};
export default Notification;

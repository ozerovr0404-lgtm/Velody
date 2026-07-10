import { Box, Typography } from "@mui/material";

const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        backgroundColor: "rgba(255, 255, 255, 1)",
        border: "1px solid rgba(8, 94, 75, 1)",
        borderRadius: "8px",
        padding: "12px 20px",
        minWidth: "280px",
      }}
    >
      <Typography
        sx={{
          color: "rgba(8, 94, 75, 1)",
          fontSize: "18px",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Notification;
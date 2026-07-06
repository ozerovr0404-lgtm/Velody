import { Paper, Typography } from "@mui/material";

const PremiumPanel = () => {
  return (
    <Paper
      sx={{
        p: 2,
        minHeight: 500,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6">
        Premium
      </Typography>

      <Typography color="text.secondary">
        Здесь будут премиум-профили
      </Typography>
    </Paper>
  );
};

export default PremiumPanel;
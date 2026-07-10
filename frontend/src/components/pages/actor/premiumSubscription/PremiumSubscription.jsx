import { Paper, Typography, Button } from "@mui/material";
import MainButton from "../../../shared/buttons/MainButton";
import createPremiumSubscription from "../../../../services/premiumFeatures/createPremiumSubscription";

const PremiumSubscription = ({ actor }) => {

  const handlePremium = async () => {
    try {
      const data = await createPremiumSubscription();

      window.location.href = data.payment_url;
    } catch (err) {
      console.error(err);
    }
  };

const active =
  actor.subscription_expires_at &&
  new Date(actor.subscription_expires_at) > new Date();

  return (
    <Paper sx={{ p:2, mt:2 }}>
  
    <Typography variant="h6" sx={{
      color: 'rgba(8, 94, 75, 1)',
      fontSize: '25px'
    }} >
      Premium
    </Typography>
  
    {active ?
      <>
        <Typography color="success.main">
        Подписка активна
        </Typography>
    
        <Typography>
        до {
        new Date(actor.subscription_expires_at)
        .toLocaleDateString()
        }
        </Typography>
      </>
      :
      <>
        <Typography sx={{ mb: 1 }} >
          Будьте всегда на виду и получите больше предложений!
        </Typography>
  
        <MainButton label="Подключить Premium" color="rgba(8, 94, 75, 1)" backgroundColor="rgba(255, 255, 255, 1)" onClick={handlePremium} />
      </>}
  
    </Paper>
  );
}

export default PremiumSubscription;
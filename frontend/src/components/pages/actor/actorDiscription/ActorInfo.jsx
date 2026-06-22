


import React from 'react';
import { Box, Typography, Tabs, Tab, Paper, Button } from '@mui/material';
import { useState } from 'react';

const TierBox = ({ title, price }) => (
  <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
    <Typography sx={{ fontWeight: 700 }}>{price}$</Typography>
    <Typography variant="caption">60 sec</Typography>
    <Box sx={{ mt: 1 }}>
      <Typography variant="body2">• hq audio file</Typography>
      <Typography variant="body2">• mixing and mastering</Typography>
    </Box>
    <Box sx={{ mt: 2 }}>
      <Button variant="outlined">Checkout</Button>
    </Box>
  </Paper>
);

const ActorInfo = ({ actor }) => {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        @{actor.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {actor.description}
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Standart" />
        <Tab label="Premium" />
        <Tab label="Elite" />
      </Tabs>

      <Box>
        {tab === 0 && <TierBox title="Standart" price={actor.price} />}
        {tab === 1 && <TierBox title="Premium" price={actor.price * 1.5} />}
        {tab === 2 && <TierBox title="Elite" price={actor.price * 2} />}
      </Box>
    </Box>
  );
};

export default ActorInfo;
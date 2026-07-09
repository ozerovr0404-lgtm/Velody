import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Chip, Button } from "@mui/material";
import { getPremiumArtists } from "../../../services/premiumFeatures/getPremiumArtists";
import ActorButton from "../../pages/catalog/actorComponents/ActorButton";

const PremiumPanel = () => {

  const [artists, setArtists] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const loadPremium = async () => {
      try {
        const data = await getPremiumArtists();
        setArtists(data);

      } catch (err) {
        console.error(err);
      }
    };

    loadPremium();

  }, []);

  useEffect(() => {
    if (artists.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex(prev =>
        prev + 1 >= artists.length 
          ? 0
          : prev + 1 
      );

    }, 5000);

    return () => clearInterval(interval);
  }, [artists.length]);

  if (artists.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
           Загрузка...
      </Paper>
    );
  }

  const artist = artists[activeIndex];

  return (
    <Paper
      sx={{
        overflow: "hidden",
        borderRadius: 3,
        position: "relative",
        boxShadow: 5,
        pt: 0,
        minHeight: '600px',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-4px)',
        },
      }}
    >

      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "3 / 4"
        }}
      >

        <Box
          component="img"
          src={
            artist.avatar_url ??
            "/images/avatar-placeholder.png"
          }
          alt={artist.stage_name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />

        <Box
          sx={{
            display:"flex",
            justifyContent:"center",
            gap:1,
            mt:1
          }}
          >
          {
          artists.map((_, index)=>(
            <Box
              key={index}
              onClick={() => setActiveIndex(index)}
              sx={{
                width:10,
                height:10,
                borderRadius:"50%",
                cursor:"pointer",
                backgroundColor:
                  index === activeIndex
                  ? "rgba(8,94,75,1)"
                  : "lightgray"
              }}
            />
          ))
          }
          </Box>
        

      </Box>

      <Box>  
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography 
            variant="h6"
            fontWeight={700}
            sx={{
              ml: 2,
              mt: '5px',
              fontSize: '22px'
            }}
          >
            @{artist.stage_name}
          </Typography>

          <Chip 
            label="PREMIUM"
            sx={{
              fontWeight: 700,
              mr: 1,
              mt: 1,
              fontSize: '16px',
              color: 'rgba(8, 94, 75, 1)',
              border: '1px solid'
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: "space-between"
          }}
        >
            <Typography
              sx={{ 
                mt: 1,
                ml: 2,
                fontSize: '21px' 
              }}
            >
              {artist.city}
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                margin: 1,
                fontSize: '20px'
              }}
            >
              Рейтинг {artist.rating}
              {" "}
              ({artist.reviews_count})
            </Typography>
        </Box>    
        

        <Box
          sx={{
            p: 1,
            minHeight: "130px",
            display: "flex",
            flexDirection: "column",
            gap: 1
          }}
        >

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap"
            }}
          >
            {artist.positions?.map((position) => (
              <Chip
                key={position}
                label={position}
                sx={{
                  fontSize: "18px"
                }}
              />
            ))}
          </Box>


          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              minHeight: "40px"
            }}
          >

            {artist.genres?.length > 0 &&
              artist.genres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  variant="outlined"
                  sx={{
                    fontSize: "18px"
                  }}
                />
              ))
            }

          </Box>

        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: "space-between",
            p: 1
          }}
        >
          <Typography
            sx={{
              mt: 2,
              fontWeight: 600,
              margin: 1,
              fontSize: '20px'
            }}
          >
            От {artist.price_from} ₽
          </Typography>

          <Box>
            
            <ActorButton label="Подробнее" onClick={() => navigate(`/profile/${artist.id}`)} />
          </Box>
        </Box>      
            
      </Box>
        
    </Paper>
  );
};

export default PremiumPanel;
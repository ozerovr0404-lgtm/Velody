import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Slider, TextField, Divider, FormControlLabel, Switch, Autocomplete } from '@mui/material';
import MainButton from '../buttons/MainButton';

const CatalogFilter = ({ filters, onChange }) => {

  const [genresOptions, setGenresOptions] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      const response = await fetch('http://localhost:3000/genres');
      const data = await response.json();

      setGenresOptions(data.genres);
    };

    loadGenres();
  }, []);

  const handleCharge = (field, value) => {
    onChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        position: "sticky",
        top: 20,
        borderRadius: 2
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Фильтр
      </Typography>

      {/* Рейтинг */}
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>
          Рейтинг
        </Typography>

        <Slider
          value={[filters.ratingFrom, filters.ratingTo]}
          onChange={(e, value) =>
            onChange({
              ...filters,
              ratingFrom: value[0],
              ratingTo: value[1]
            })
          }
          min={0}
          max={5}
          step={1}
          valueLabelDisplay="auto"
          sx={{
            color: "rgba(8, 94, 75, 1)"
          }}
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography gutterBottom>
        Жанр
      </Typography>

      <Autocomplete
        multiple
        options={genresOptions}
        value={filters.genres}
        disableCloseOnSelect
        onChange={(event, value) =>
          handleCharge("genres", value)
        }
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => 
          option.id === value.id
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder='Выберите жанры'
          />
        )}
      >
      </Autocomplete>

      <Divider sx={{ mb: 3 }} />

      {/* Опыт */}
      <Typography gutterBottom>
        Опыт
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 3
        }}
      >
        <TextField
          label="От"
          size="small"
          type="number"
          value={filters.experienceFrom}
          onChange={(e) =>
            handleCharge("experienceFrom", e.target.value)
          }
        />

        <TextField
          label="До"
          size="small"
          type="number"
          value={filters.experienceTo}
          onChange={(e) =>
            handleCharge("experienceTo", e.target.value)
          }
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Цена */}
      <Typography gutterBottom>
        Стоимость
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 3
        }}
      >
        <TextField
          label="От"
          size="small"
          type="number"
          value={filters.priceFrom}
          onChange={(e) =>
            handleCharge("priceFrom", e.target.value)
          }
        />

        <TextField
          label="До"
          size="small"
          type="number"
          value={filters.priceTo}
          onChange={(e) =>
            handleCharge("priceTo", e.target.value)
          }
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Понравившиеся */}
      <FormControlLabel
        control={
          <Switch
            checked={filters.likeOnly}
            onChange={(e) =>
              handleCharge("likeOnly", e.target.checked)
            }
          />
        }
        label="Понравившиеся мне"
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }} >
        <MainButton label="Применить" color="white" backgroundColor="rgba(8, 94, 75, 1)" onClick={handleCharge} sx={{  }} />
      </Box>
    </Paper>
  );
};

export default CatalogFilter;
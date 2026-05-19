import { Box, Typography } from "@mui/material";

const CategoryImage = ({ children, imageSrc, width = '185px', height = '277px' }) => {
  return (
    <Box sx={{ 
      position: 'relative',
      width: width,
      height: height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      '&:hover img': {
        opacity: 0.7,
      },
      '&:hover .overlay': {
        opacity: 1,
      },
      '&:hover .category-text': {
        opacity: 1,
      }
    }}>
      <img 
        src={imageSrc} 
        alt={children} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          transition: 'opacity 0.3s ease'
        }} 
      />
      
      <Box 
        className="overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 44, 2, 0.5)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1
        }}
      />
      
      <Typography 
        className="category-text"
        sx={{
          position: 'absolute',
          color: 'white',
          fontWeight: 'bold',
          fontSize: 'clamp(0.7rem, 10vw, 1.5rem)',
          textAlign: 'center',
          zIndex: 2,
          textShadow: '3px 3px 10px rgba(0,0,0,0.7), 2px 2px 4px rgba(0,0,0,0.5)',
          maxWidth: '95%',
          padding: '0 8px',
          lineHeight: 1.3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          wordBreak: 'break-word',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        {children}
      </Typography>
    </Box>
  )
}

export default CategoryImage;
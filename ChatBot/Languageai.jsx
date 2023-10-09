import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GTranslateIcon from '@mui/icons-material/GTranslate';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  menuContainer: {
    position: 'relative',
  },
  menu: {
    position: 'absolute',
    bottom: '0%',
    left: '0',
    top:10,
    width: '70%',
    height:"10vh",
    maxHeight: '800px',
    overflowY: 'auto',
    transition: 'max-height 0.5s ease',
    marginBottom:"10px"
  },
  menuOpen: {
    maxHeight: '800px',
  },
  '@media (max-width: 600px)': {
    button: {
        
        width:'10px'
      },

  }
}));

const Languageai = () => {
  const classes = useStyles();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [menuOpen1, setMenuOpen1] = useState(false);

  const handleOpenMenu3 = (event) => {
    setAnchorEl2(event.currentTarget);
    setMenuOpen1(true);
  };

  const handleCloseMenu3 = () => {
    setAnchorEl2(null);
    setMenuOpen1(false);
  };

  return (
    <div className={classes.menuContainer}>
   
        <GTranslateIcon      onClick={handleOpenMenu3}  style={{ backgroundColor: '#29AAE1',marginTop:'10px',color:'white' }} size="small" />
    
      <Menu
        anchorEl={anchorEl2}
        open={menuOpen1}
        onClose={handleCloseMenu3}
        classes={{
            paper: `${classes.menu} ${menuOpen1 ? classes.menuOpen : ''}`,
          }}
      >
        <MenuItem >En <GTranslateIcon /></MenuItem>
    
     
      </Menu>
    </div>
  );
};

export default Languageai;

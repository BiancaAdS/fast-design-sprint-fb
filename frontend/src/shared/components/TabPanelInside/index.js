import React from "react";

import PropTypes from 'prop-types';
 
import Box from '@mui/material/Box';



export const TabPanelInside = (props) => {
    const { children, value, index,...other } = props;

    const indexRandom = Math.floor(Math.random() * 100);
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}-inside-${indexRandom}`}
        aria-labelledby={`simple-tab-${index}-inside-${indexRandom}`}
        {...other}
      >
        {value === index && (
          <Box >
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }

TabPanelInside.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

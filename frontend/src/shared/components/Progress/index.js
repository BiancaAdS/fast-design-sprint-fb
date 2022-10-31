import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          sx={{ height: "20px" }}
          color="success"
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.white">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel(props) {
  const [progress, setProgress] = React.useState(0);

  let tamCompletos = props.atvsCompleted();
  const valor = (100 * 1) / props.atvsTitle.length;

  React.useEffect(() => {
    const handlçeAtividadesCompletas = () => {

      setProgress((prevProgress) =>
        prevProgress === 100 ? 100 : prevProgress + valor
      );
    };
    if (tamCompletos !== 0) {
      handlçeAtividadesCompletas();
    } else {
      setProgress(0);
    }
  }, [tamCompletos]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}

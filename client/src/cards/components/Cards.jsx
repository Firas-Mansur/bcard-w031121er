import React from "react";
import Card from "./card/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { arrayOf, object } from "prop-types";


const Cards = ({ cards, onDelete, onLike }) => {

  if (!cards.length)
    return (
      <Typography m={2}>
        Oops... it seems there are no business cards to display
      </Typography>
    );

  return (
    <Grid container spacing={2} pb={2}>
      {cards.map((card, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Card card={card} onDelete={onDelete} onLike={onLike}/>
        </Grid>
      ))}
    </Grid>
  );
};

Cards.propTypes = {
  cards: arrayOf(object).isRequired,
  
};

export default Cards;

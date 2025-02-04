import * as React from "react";
import { func } from "prop-types";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import cardType from "./../../models/types/cardType";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";


const Card = ({ card, onDelete, onLike }) => {
  const navigate = useNavigate();
  // console.log(card);

  return (
    <MuiCard sx={{ minWidth: 280 }}>
      <CardActionArea
        onClick={() => navigate(`${ROUTES.CARD_DETAILS}/${card._id}`)}>
        <CardHead image={card.image} />
        <CardBody card={card} />
      </CardActionArea>
        <CardActionBar
         onDelete={onDelete}
         cardId={card._id} 
         cardUserId={card.user_id} 
         cardLikes={card.likes}
         onLike={onLike} />
    </MuiCard>
  );
};

Card.propTypes = {
  card: cardType.isRequired,
  onDelete: func.isRequired,
};

export default React.memo(Card);

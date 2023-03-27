import React from "react";
import { arrayOf, string, bool, func, object } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Cards from "./Cards";



const CardsFeedback = ({ isLoading, error, cards, onDelete, onLike }) => {
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={"error"}/>;
  if (cards && !cards.length)
    return (
      
      <div variant="body1" color="initial">
        {" "}
        Oops, there are no business cards in the database that match the
        parameters you entered!
      </div>
    );
  if (cards) return <Cards cards={cards} onDelete={onDelete} onLike={onLike} />;
  return null;
};

CardsFeedback.propTypes = {
  isLoading: bool.isRequired,
  error: string,
  cards: arrayOf(object),
  onDelete: func.isRequired,
  onLike: func.isRequired,
};


CardsFeedback.defaultProps = {
  onLike: () => {},
};

export default React.memo(CardsFeedback);

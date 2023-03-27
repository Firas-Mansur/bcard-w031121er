import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useCallback } from 'react'
import PageHeader from "../../components/PageHeader";



import CardsFeedback from '../components/CardsFeedback';
import useCards from '../hooks/useCards'




const FavCardsPage = () => {

  const {value, ...rest} = useCards()
  const {isLoading, error, filteredCards,cards} = value;
  const {handleDeleteCard, handleGetFavCards} = rest;
 


  useEffect(() => {
    handleGetFavCards()
   
  },[])

  const onDeleteCard = useCallback(
    async (cardId) => {
      await handleDeleteCard(cardId);
      await handleGetFavCards();
    },
    []
  );

  const changeLikeStatus = useCallback(async () => {
    await handleGetFavCards();    
  }, [])

  return (
    <Container>
      <PageHeader
        title="Favorite Cards Page"
        subtitle="Here you can find all your favorite business cards"
      />

      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={filteredCards}
        onDelete={onDeleteCard}
        onLike={changeLikeStatus}
        
      />
    </Container>
  )
}

export default FavCardsPage
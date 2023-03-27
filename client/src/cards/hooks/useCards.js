import { useCallback,useEffect, useState, useMemo } from "react";
import { changeLikeStatus, createCard, getCard,  getMyCards } from "./../services/cardApiService";
import { getCards, editCard, deleteCard } from "./../services/cardApiService";
import useAxios from "../../hooks/useAxios";
import normalizeCard from "./../helpers/normalization/normalizeCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";



const useCards = () => {
  const { user } = useUser()
  const navigate = useNavigate();
  const [cards, setCards] = useState();
  const [card, setCard] = useState();
  const [query, setQuery] = useState("")
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [filteredCards, setFilter] = useState()
  const [searchParams] = useSearchParams()

  
  useEffect(()=>{
    setQuery(searchParams.get("q") ?? "")
  },[searchParams]);



  useEffect(()=> {
    if (cards) {
      setFilter(cards.filter(
          cards => 
          cards.title.includes(query) || String(cards.bizNumber).includes(query)
          
        )
      )
    }
  },[cards, query])
  
  


  useAxios();
  const snack = useSnack();
  

  const requestStatus = (loading, errorMessage, cards, card) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };

  const handleGetCards = async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  };



  const handleGetMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleCreateCard = useCallback(async cardFromClient => {
    try {
      setLoading(true);
      const normalizedCard = normalizeCard(cardFromClient);
      const card = await createCard(normalizedCard);
      requestStatus(false, null, null, card);
      snack("success", "A new business card has been created");
      navigate(ROUTES.MY_CARDS);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetCard = useCallback(async cardId => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      requestStatus(false, null,null, card)
      return card;
    } catch (error) {
      requestStatus(false, error, null)
      
    }

  },[]);


  const handleUpdateCard = useCallback ( async (cardId, cardFromClient) => {
    try {
      setLoading(true);
      await editCard( cardId, cardFromClient);
      requestStatus(false, null, null);
      snack("success", "The business card has been successfully update");
      navigate(ROUTES.MY_CARDS);
    } catch (error) {
      requestStatus(false, error, null);
    }
  },
  [snack]
  )

  const handleLikeCard = useCallback(async cardId =>{
    try {
      await changeLikeStatus(cardId);
      await getCards()
      requestStatus(false, null, cards, card);
    } catch (error) {
      requestStatus(false, error, null)
    }
  },[snack]);

  const handleGetFavCards = useCallback(async () => {
    try {
      setLoading(true)
     const cards = await getCards();
     const favCard = cards.filter(
        card => !!card.likes.find(id => id === user._id)
      );
     requestStatus(false, null, favCard)
    } catch (error) {
      requestStatus(false, error, null)
    }
  },[user])

  

  const handleDeleteCard = async (cardId) => {
    try {
      setLoading(true);
      await deleteCard(cardId);
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  
  };

  const value = useMemo(() => {
    return { cards, card, isLoading, error, filteredCards };
  }, [cards, card, isLoading, error, filteredCards]);


  return {
    value,
    handleGetCard,
    handleDeleteCard,
    handleGetCards,
    handleCreateCard, 
    handleGetMyCards,
    handleUpdateCard,
    handleLikeCard,
    setCards,
    handleGetFavCards,
  };
};


export default useCards;

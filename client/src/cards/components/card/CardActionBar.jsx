import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CallIcon from '@mui/icons-material/Call'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { func, string } from 'prop-types'
import CardDeleteDialog from './CardDeleteDialog'
import { useUser } from '../../../users/providers/UserProvider'
import ROUTES from '../../../routes/routesModel'
import useCards from '../../hooks/useCards'

const CardActionBar = ({ cardId, onDelete, userId, cardUserId, cardLikes , onLike }) => {

  const navigate = useNavigate()
  const { user } = useUser()
  const {handleLikeCard,handleGetFavCards} = useCards()
   

  const [isDialogOpen, setDialog] = useState(false)
  const [isLiked, setLike] = useState(
    () => !!cardLikes.find(id => id === user._id))


  const handleDialog = term => {
    if (term === 'open') return setDialog(true)
    setDialog(false)
  }

  const handleDeleteCard = () => {
    handleDialog()
    onDelete(cardId)
  }

  const handleLike = async () => {
    setLike(prev => !prev);
    await handleLikeCard(cardId);
    await handleGetFavCards(cardId)
    onLike();
  };

  return (
    <CardActions disableSpacing sx={{ pt: 0, justifyContent: 'space-between' }}>
      <Box>
    
        {user && 
        (user.isAdmin || user._id === userId) && (
          <IconButton
            aria-label="delete card"
            onClick={() => handleDialog('open')}
             
            
          >
            <DeleteIcon/>
          </IconButton>
        )}
        <CardDeleteDialog
          isDialogOpen={isDialogOpen}
          onChangeDialog={handleDialog}
          onDelete={handleDeleteCard}
      

        />

        {user && user._id === cardUserId && (
          <IconButton
            aria-label="edit card"
            onClick={() => navigate(`${ROUTES.EDIT_CARD}/${cardId}`)}>
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <Box>
        <IconButton aria-label="Call card">
          <CallIcon />
        </IconButton>

        {user &&(
        <IconButton
          aria-label="add to favorites"
          onClick={handleLike}>
          <FavoriteIcon color={isLiked ? "error" : "inherit"}/>
        </IconButton>
        )}
      </Box>
    </CardActions>
  )
}

CardActionBar.propTypes = {
  cardId: string.isRequired,
  onDelete: func.isRequired,
  onLike: func.isRequired,
  userId: string,
}

export default CardActionBar;

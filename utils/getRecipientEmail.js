const getRecipientEmail = (users, userLoggedIn) => (
    users?.filter(userToFiler => userToFiler !== userLoggedIn?.email)[0]
)

export default getRecipientEmail;
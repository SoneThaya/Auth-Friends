import React, { useState, useEffect } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const FriendsList = () => {
  const [friendsList, setFriendsList] = useState([])

  const getFriends = () => {
    axiosWithAuth()
      .get("/api/friends")
      .then(res => {
        console.log(res.data)
        setFriendsList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => { 
    getFriends()
  }, [])


 

  const postFriend = friend => {
    axiosWithAuth()
      .post('/api/friends', friend)
      .then(res => {
        console.log(res)
        setFriendsList([
          ...friendsList,
          friend
        ])
      })
  }

  const addFriend = e => {
    e.preventDefault()

    postFriend(newFriend)
  }

  const [newFriend, setNewFriend] = useState({name: '', email: '', age: '', id: ''})
  const inputChange = e => {
    setNewFriend({
      ...newFriend,
      [e.target.name]: e.target.value
   })
  }

  const deleteFriend = id => {
    const removeFriend = friendsList.filter(item => item.id !== id)
    axiosWithAuth()
      .delete("/api/friends/" + id)
      .then(res => {
        setFriendsList([...removeFriend])
      })
      .catch(err => console.log(err))
  }

  
    return (
        <div>
          <form onSubmit={addFriend}>
            <input type="text" name="name" onChange={inputChange} placeholder='name' />
            <input type="text" name="email" onChange={inputChange} placeholder='email' />
            <input type="text" name="age" onChange={inputChange} placeholder='age' />
            <input type="text" name="id" onChange={inputChange} placeholder='id' />
            
            <button>Submit</button>
          </form>
          <div>
                {friendsList.map(friend => (
              <div key={friend.id}>
                <h3>{friend.name}</h3>
                <p>{friend.age}</p>
                    <p>{friend.email}</p>
                    
                    <button onClick={() => deleteFriend(friend.id)}>X</button>
              </div>
                ))} 
              </div>
        </div>
    )
  
}

export default FriendsList
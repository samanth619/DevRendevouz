import {GET_ERRORS,SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register User
export const registerUser = (userData,history)=>dispatch=>{
    
      axios.post('/api/users/register',userData)
      .then(res=> history.push('/login'))
      .catch(err=>{
          dispatch({
              type: GET_ERRORS,
              payload:err.response.data
          })
      });       
   
};

//Login User
export const loginUser = userData => dispatch=>{
   axios.post('/api/users/login',userData)
    .then(res=>{
        //save token in localStorage
       const {token} = res.data;
       //set token to localStorage
        localStorage.setItem('jwtToken',token);
        //set token to authHeader
        setAuthToken(token);
        //decode token to get user info
        const decoded = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err=>{
          dispatch({
              type: GET_ERRORS,
              payload:err.response.data
          })
    });
};

//set logged in user
export const setCurrentUser = (decoded) =>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
};

//logout user 
export const logoutUser = (history) => dispatch=>{

   // history.push('/login');
    //remove token from local storage 
    localStorage.removeItem('jwtToken');
    //remove auth header for future requests
    setAuthToken(false);
    // set current user to {} so that it will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
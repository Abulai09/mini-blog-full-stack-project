import axios from "axios";
import { setDataAC, setMyDataAC } from "./redux/data";
import { setAuthAC } from "./redux/authReducer";

export const registration = (username, email, password) => {
  return async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
            username,
            email,
            password,
        });
      localStorage.setItem("token", response.data.token.token);
        dispatch(setAuthAC(response.data.token.payload))
      console.log(response.data);
    } catch (e) {
      console.log(e);
      localStorage.removeItem('token')
      throw e;
    }
  };
};

export const login = ( email, password) => {
  return async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            email,
            password,
        });
        localStorage.setItem("token", response.data.token);
        dispatch(setAuthAC(response.data.payload))
        console.log(response.data);
        console.log("User ID in token:", response.data.payload.id);

    } catch (e) {
       console.log(e);
        if (e?.response?.status === 401) {
            localStorage.removeItem('token');
        }
    }
  };
};

export const setDatas = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/getAll`);
      console.log(response.data);
      dispatch(setDataAC(response.data));
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const toggleLike = (id) => {
  return async (dispatch, getState) => {
    try {
      const token = localStorage.getItem("token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/post/${id}`,
        { userId }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedPost = response.data;

      const posts = getState().data.posts;
      const newPosts = posts.map((post) =>
        post._id === updatedPost.postId
          ? { ...post, likes: Array(updatedPost.likeCount).fill("stub") }
          : post
      );

      dispatch(setDataAC(newPosts));
    } catch (e) {
      console.log("toggleLike error:", e);
      localStorage.removeItem("token");
    }
  };
};

export const findMyPosts = () => {
  return async dispatch => {
    try{
      const token = localStorage.getItem("token");
      const response = await axios.get( `${process.env.REACT_APP_API_URL}/post/me`,{
        headers:{ Authorization : `Bearer ${token}` }
      } )
      dispatch( setMyDataAC(response.data))
      console.log(response.data)
    }catch(e){
      console.log(e)
      localStorage.removeItem("token");
      throw e
    }
  }
}

export const createPost = (title,content,image) => {
  return async dispatch => {
    try{
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      const response = await axios.post( `${process.env.REACT_APP_API_URL}/post/create`,formData,{
        headers:{ Authorization : `Bearer ${token}` }
      } )
      console.log(response.data)
    }catch(e){
      console.log(e)
      localStorage.removeItem("token");
      throw e
    }
  }
}

export const addcomment = (id,text) => {
  return async dispatch => {
    try{
      const token = localStorage.getItem("token");
      const response = await axios.post( `${process.env.REACT_APP_API_URL}/comment/${id}`,{text},{
        headers:{Authorization:`Bearer ${token}`}
      } )
      console.log(response.data)
      dispatch(setDatas())
    }catch(e){
      console.log(e)
      throw e
    }
  }
}
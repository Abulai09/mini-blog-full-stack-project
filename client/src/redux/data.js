let initialState = {
  posts: [],
  myPosts: [],
};

let dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        posts: action.posts,
      };
    case "setMyData":
      return {
        ...state,
        myPosts: action.myPosts,
      };
    default:
      return state;
  }
};

export const setDataAC = (posts) => ({ type: "setData", posts });
export const setMyDataAC = (myPosts) => ({ type: "setMyData", myPosts });

export default dataReducer;

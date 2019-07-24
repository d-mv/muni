export const apiState = {
  status: false,
  message: "",
  code: 100
};

export const showPostState = { show: false, type: "", _id: "" };

export const emptyPost = {
  _id: "",
  category: "",
  title: "",
  problem: "",
  solution: "",
  photo: "",
  link: "",
  createdBy: "",
  date: "",
  status: "",
  votes: [],
  newsId: "",
  reply: {
    date: "",
    text: "",
    up: [],
    down: []
  }
};

export const emptyNewPost = {
  _id:'',
  title: "",
  text: "",
  photo: "",
  link: "",
  pinned: false,
  show: false
};

import React from "react";

import PostCard from "../components/PostCard";

import layout from "../styles/_layout.module.scss";

const Home = () => {
  // ! dev
  const postTemp = {
    _id: "5ce565513783cc776bbc489e",
    category: "category",
    title:
      "Consectetur non assumenda asperiores et odio consectetur similique.",
    text:
      "Reiciendis sed reiciendis atque sequi in et quo ea. Voluptatem sequi v...",
    photo: "https://picsum.photos/id/37/300/200",
    link: "http://dagmar.net",
    newsId: "5ce565513783cc776bbc489f",
    createdBy: "5ce565513783cc776bbc48a0",
    date: "2019-01-02 16:19:06.987",
    status: "active",
    votes: { up: 76481, down: 1632 }
  };

  return (
    <main className={layout.page}>
      <div>
        <PostCard post={postTemp} />
      </div>
    </main>
  );
};

export default Home;

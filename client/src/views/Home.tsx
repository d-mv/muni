import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import PostCard from "../components/PostCard";

import layout from "../styles/_layout.module.scss";

const Home = (props: any) => {
  // const { posts } = props.locationData.payload
  const [posts, setPosts] = React.useState(
    props.locationData.payload ? props.locationData.payload.posts : []
  );
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
  console.log(props.locationData.posts ? true : false);
  React.useEffect(() => {
    if (props.locationData.posts) {
      setPosts(props.locationData.posts);
    }
  }, [props.locationData.payload]);
  return (
    <main className={layout.page}>
      <div className={layout.content}>
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    locationData: state.locationData
  };
};

export default connect(
  mapStateToProps,
  {}
)(Home);

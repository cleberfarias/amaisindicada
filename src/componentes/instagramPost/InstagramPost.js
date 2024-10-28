import React from "react";
import styled from "styled-components";

const PostContainer = styled.div`
  margin: 20px 0;
  max-width: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const InstagramPost = ({ postUrl }) => {
  return (
    <PostContainer>
      <iframe
        src={postUrl}
        width="500"
        height="600"
        frameBorder="0"
        scrolling="no"
        allowTransparency
        allow="encrypted-media"
        title="Instagram Post"
      ></iframe>
    </PostContainer>
  );
};

export default InstagramPost;

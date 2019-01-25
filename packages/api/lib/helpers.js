'use strict';

const { returnClient } = require('./client');

const internals = {}

exports.createTimeline = async (id) => {
  const client = returnClient();
  let user = await client.users.query({id});
  const timeline = [];
  for(let u of user[0].following){
    const following = await client.users.query({id: u});
    for(let post of following[0].posts){
      await timeline.push(post);
    }
  }
  for(let post of user[0].posts){
    await timeline.push(post);
  }
  await client.users.update({id, timeline})
  user = await client.users.query({id});
  return user[0].timeline
}

exports.findComment = (posts, path) => {
  let comment = posts[0].comments;
  let post;
  let currentPost;
  for(let i = 1; i < path.length; i++){
    let commentID = path[i];
    let postIndex = comment.findIndex(y => y.postID == commentID);
    post = comment[postIndex];
    comment = comment[postIndex].comments;
    if(i == path.length - 2){
      currentPost = post;
    }
    if(path.length == 2){
      currentPost = posts[0];
    }
  }
  return {post, currentPost};
}
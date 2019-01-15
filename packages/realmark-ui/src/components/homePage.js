import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/logoutAction';
import { addLike } from '../actions/likeAction';
import { triggerComment } from '../actions/triggerComment';
import { triggerModal } from '../actions/triggerModal';
import ProfileCard from './profileCard';
import Posts from './posts';
import EditContainer from './editContainer';
import PostModal from './postModal';


class HomePage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);

    this.handleLike = this.handleLike.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
    this.handleModal = this.handleModal.bind(this);

  }

  handleLike(event, userID, postID){
    event.stopPropagation();
    this.props.addLike(userID, postID);
  }

  handleTrigger(event, trigger, post){
    event.stopPropagation();
    this.props.triggerComment(trigger, post);
    const posts = document.querySelector('html');
    const nav = document.querySelector('.navWrapper');
    posts.classList.add('noScroll');
    nav.classList.add('marginRight');
  }

  handleModal(trigger, post){
    this.props.triggerModal(trigger, post);
    const posts = document.querySelector('html');
    const nav = document.querySelector('.navWrapper');
    posts.classList.add('noScroll');
    nav.classList.add('marginRight');
  }

  render(){
    return (
      <div> 
        <div className="mainWrapper">
          <div className="profileCardWrapper">
            <ProfileCard user={this.props.user} />
            <EditContainer />
          </div>
          <Posts posts={this.props.user.timeline} id={this.props.user.id} handleLike={this.handleLike} handleTrigger={this.handleTrigger} handleModal={this.handleModal} />
        </div>
        {this.props.trigger.modal && <PostModal post={this.props.trigger.currentPost} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trigger: state.trigger
})

export default connect(mapStateToProps, {logOut, addLike, triggerComment, triggerModal})(HomePage);

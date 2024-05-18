import "./leftBar.scss";
import friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Events from "../../assets/6.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Friends from "../../pages/friends/Friends";

const LeftBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  Modal.setAppElement('#root');

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user" onClick={() => navigate(`/profile/${localStorage.getItem("user_id")}`)} style={{ cursor: 'pointer' }}>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="item" onClick={openModal} style={{ cursor: 'pointer' }}>
            <img src={friends} alt="" />
            <span>Friends</span>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Friends Modal"
            className="modal"
            overlayClassName="overlay"
          >
            <button onClick={closeModal} className="close-button">&times;</button>
            <Friends />
          </Modal>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Streak</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;

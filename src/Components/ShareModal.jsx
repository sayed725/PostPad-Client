import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaShareAlt } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

Modal.setAppElement('#root'); 

const ShareModal = ({ postId, postTitle }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const shareUrl = `${window.location.origin}/post/${postId}`;

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
    <button 
        onClick={() => setModalIsOpen(true)} 
        className="flex gap-2"
      >
        <FaShareAlt className="text-xl hover:text-blue-500 cursor-pointer" />
          
      </button>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal} // Closes modal when clicking outside
        contentLabel="Share Modal"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        
      >
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
          <h2 className="text-xl font-bold mb-4">Share</h2>

          <div className="flex justify-around items-center mb-4">
            <WhatsappShareButton url={shareUrl} title={`Check out this post: ${postTitle}`}>
              <div className="text-center flex flex-col justify-center items-center">
                <WhatsappIcon size={40} round className=''/>
                <p className="text-sm mt-2">WhatsApp</p>
              </div>
            </WhatsappShareButton>

            <FacebookShareButton url={shareUrl} quote={`Check out this post: ${postTitle}`}>
              <div className="text-center flex flex-col justify-center items-center">
                <FacebookIcon size={40} round />
                <p className="text-sm mt-2">Facebook</p>
              </div>
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={`Check out this post: ${postTitle}`}>
              <div className="text-center flex flex-col justify-center items-center">
                <TwitterIcon size={40} round />
                <p className="text-sm mt-2">Twitter</p>
              </div>
            </TwitterShareButton>


            <LinkedinShareButton url={shareUrl} title={postTitle} summary={postTitle} source={window.location.origin}>
              <div className="text-center flex flex-col justify-center items-center">
                <LinkedinIcon size={40} round />
                <p className="text-sm mt-2">LinkedIn</p>
              </div>
            </LinkedinShareButton>
          </div>

          <div className="mb-4">
            <p>Or copy this link:</p>
            <div className="flex items-center border border-gray-300 rounded">
              <input 
                type="text" 
                value={shareUrl} 
                readOnly 
                className="w-full p-2 focus:outline-none"
                onClick={(e) => e.target.select()}
              />
              <button 
                className="bg-gray-200 px-4 py-2 text-sm rounded-r hover:bg-gray-300"
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                Copy
              </button>
            </div>
          </div>

          <button 
            onClick={closeModal} 
            className=" text-red-500 px-4 py-2 absolute top-1 right-1"
          >
            <IoIosCloseCircle className='text-4xl'></IoIosCloseCircle>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ShareModal;

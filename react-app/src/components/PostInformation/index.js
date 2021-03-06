import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import PostInformation from "./PostInformatiom"



export default function PostInformationModal({ username, description, id }) {
    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <p onClick={() => setShowModal(true)}>@<span style={{ fontWeight: "bold" }}>{username} </span>  <span style={{ cursor: 'pointer' }}>  see more... </span></p>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <PostInformation id={id} ></PostInformation>
                </Modal>
            )}

        </>
    )

}

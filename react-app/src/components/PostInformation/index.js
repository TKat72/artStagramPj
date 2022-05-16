import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import PostInformation from "./PostInformatiom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PostInformationModal({ username, description, id }) {
    const [showModal, setShowModal] = useState(false)
    console.log(id, " in")

    return (
        <>
            <p onClick={() => setShowModal(true)}>{username} {description}</p>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <PostInformation id={id} ></PostInformation>
                </Modal>
            )}

        </>
    )

}

import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import AddNewComment from "./AddNewComment"

export default function AddPhotoToAlbumModal({ id }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className="btn-rnb" onClick={() => setShowModal(true)}>Choose Photo</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <AddNewComment id={id} setShowModal={setShowModal} ></AddNewComment>
                </Modal>
            )}

        </>
    )

}

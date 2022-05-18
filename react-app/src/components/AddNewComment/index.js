import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import AddNewComment from "./AddNewComment"

export default function AddPhotoToAlbumModal({ post_id }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className="rnb" onClick={() => setShowModal(true)}>Add comment </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <AddNewComment post_id={post_id} setShowModal={setShowModal} ></AddNewComment>
                </Modal>
            )}

        </>
    )

}

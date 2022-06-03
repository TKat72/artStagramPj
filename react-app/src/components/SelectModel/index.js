import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import SelectModel from "./SelectModel"



export default function Select({ id, description }) {
    const [showModal, setShowModal1] = useState(false)


    return (
        <>
            <p onClick={() => setShowModal1(true)}>  <i className="fa-solid fa-ellipsis"></i></p>
            {showModal && (
                <Modal onClose={() => setShowModal1(false)} >
                    <SelectModel id={id} setShowModal1={setShowModal1} description={description} ></SelectModel>
                </Modal>
            )}

        </>
    )

}

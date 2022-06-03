import React from 'react';
import EditPostModal from "../EditPost"
import DeletePostModal from "../DeletePost"

export default function SelectModel({ id, setShowModal1, description }) {
    const onClick = () => {
        setShowModal1(false);
    }

    return (
        <>
            <EditPostModal id={id} descriptionVal={description}></EditPostModal> 
            <DeletePostModal id={id} ></DeletePostModal>
        </>
    )


}

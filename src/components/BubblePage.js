import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
// import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axiosWithAuth()
    .get("colors")
    .then(res => {
      setColors(res.data)
    })
  }, [])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = editColor => {
    console.log(editColor)
    axiosWithAuth()
      .put(`colors/${editColor.id}`, editColor)
      .then(res => {
        console.log("before put", res.data)


        axiosWithAuth()
        .get("colors")
        .then(res => {
          console.log("after put", res.data)
          setColors(res.data)
        })
      })
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`)
      .then(res => {

      axiosWithAuth()
        .get("colors")
        .then(res => {
          setColors(res.data)
        })
    })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state. ✅
//2. Complete toggleEdit, saveEdit, deleteColor and functions

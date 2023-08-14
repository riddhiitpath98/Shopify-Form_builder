import React from "react";
import "./ToggleSwitch.css";
import { useDispatch } from "react-redux";
import { editVisibleFlag } from "../../redux/actions/allActions";

const ToggleSwitch = ({ items }) => {
  const dispatch = useDispatch();
  const handleVisibility = (e, id) => {
    dispatch(editVisibleFlag({ _id: id, isVisible: e.target.checked }))
  }

  return (
    <div className="container">
      <div className="toggle-switch">
        <input type="checkbox" checked={items.isVisible} className="checkbox" name="isvisible_switch" id={`isvisible_switch_${items._id}`} onChange={(e) => handleVisibility(e, items._id)} />
        <label className="label" htmlFor={`isvisible_switch_${items._id}`}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;

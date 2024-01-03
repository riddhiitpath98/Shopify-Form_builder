import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editVisibleFlag } from "../../redux/actions/allActions";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ items }) => {
  const dispatch = useDispatch();
  const shopId = useSelector((state) => state.shopId.shopId);
  const handleVisibility = (e, id) => {
    dispatch(editVisibleFlag({ shopId: shopId, _id: id, isVisible: e.target.checked }))
  }

  return (
    <div className="ips-switch-container">
      <div className="ips-toggle-switch">
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

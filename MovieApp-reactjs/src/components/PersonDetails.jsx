import React, { useEffect } from "react";
import { asyncLoadpeoples } from "../actions/PersonActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizZontalCards from '../Partials/HorizontalCards';
import { removeperson } from "../reducers/PersonSlice";


const PersonDetails = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.peopleInfo);
  const Value = false;

  useEffect(() => {
    dispatch(asyncLoadpeoples(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  if (!info || !info.detail) {
    return <Loading />;
  }

  return (
    <div>People</div>
    
  );
};

export default PersonDetails;

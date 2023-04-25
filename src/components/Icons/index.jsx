import React from "react";
import SortIconAlert from "./SortIconAlert";
import PlusIconAlert from "./PlusIconAlert";
import FilterIconAlert from "./FilterIconAlert";
import propTypes from 'prop-types';

const Icons = (props) => {

  const { toDoList, setToDoList } = props;

  return (
    <>
      {toDoList.length ? 
        <>
        {/* SortBy icon  */}
          <SortIconAlert setToDoList={setToDoList} />

        {/* Filter icon  */}
          <FilterIconAlert setToDoList={setToDoList} />
        </>
       : "" }
        {/* Plus icon  */}
          <PlusIconAlert setToDoList={setToDoList} />
    </>
  );
};

Icons.propTypes = {
  toDoList: propTypes.array,
  setToDoList: propTypes.func
};

export default Icons;

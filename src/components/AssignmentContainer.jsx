import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignments } from "../utils/assignmentSlice";
import AssignmentCard from "./AssignmentCard";
import { BASE_URL } from "../utils/constants";

const AssignmentContainer = () => {
  const dispatch = useDispatch();

  const assignments = useSelector((store) => store.assignment);

  const fetchAssignments = async () => {
    try {
      const res = await fetch( BASE_URL + "/assignment", {
        credentials: "include",
      });

      const result = await res.json();
      // console.log(result)
      dispatch(addAssignments(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {assignments &&
        assignments.map((task) => (
          <AssignmentCard key={task._id} task={task} />
        ))}
    </div>
  );
};

export default AssignmentContainer;

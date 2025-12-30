import React from "react";

const AssignmentCard = ({ task }) => {

    console.log("Raw date value:", task.date);

  return (
    <div
      key={task.id}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col"
    >
      <div
        className={`bg-blue-600 px-4 py-1.5 text-white font-bold text-xs lg:text-sm`}
      >
        {task.subject}
      </div>
      <div className="p-5 flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{task.title}</h3>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed ">
          {task.description}
        </p>
        <div className="text-sm text-gray-500 mt-auto">
          <p>{task.teacher}</p>
          <p className="mt-1 font-semibold text-gray-600">Due: {new Date(task.deadline).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;

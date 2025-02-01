import React from "react";
import { useQueryClient } from '@tanstack/react-query';

function Popup(props) {
  const queryClient = useQueryClient();

  return (props.trigger) ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
        <button 
          className="absolute top-2 right-2 text-red-500 text-lg font-bold"
          onClick={() => {
            props.setTrigger(false);
            queryClient.refetchQueries(['balanceFetch']);
            queryClient.refetchQueries(['transactions']);
            queryClient.refetchQueries(['savingGoals']);
          }}
        >
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default Popup;

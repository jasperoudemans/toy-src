import React from "react";

const AddListingForm = () => {
  return (
    <div>
      <form>
        <label for="title">Title of listing</label>
        <input name="title">Title</input>
        <button>Post Listing</button>
      </form>
    </div>
  );
};

export default AddListingForm;

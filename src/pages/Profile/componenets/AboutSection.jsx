import React, { useEffect, useRef, useState } from "react";
import Section from "../../../components/common/section";
import Button from "../../../components/common/Button";
import EditIcon from "../../../components/Icons/editIcon";
import LargeText from "../../../components/common/LargeText";

function AboutSection() {
  const [about, setAbout] = useState(""); // Store the about text
  const [tempAbout, setTempAbout] = useState(""); // Store the temporary input value
  const [btnClick, setBtnClick] = useState(false); // Track whether the edit button is clicked

  return (
    <Section>
      <div className="relative py-4">
        {!btnClick && about ? (
          <div className="absolute right-0 top-0">
            <Button
              icon={<EditIcon fill="white" />}
              onClick={() => {
                setTempAbout(about); // Set the initial input value to the current about value
                setBtnClick(true); // Show the input field
              }}
            />
          </div>
        ) : null}

        <p className="font-bold text-2xl pb-2">About</p>

        {/* Display the About Text or Button */}
        {about === "" && !btnClick ? (
          <Button
            label={"Add Brief about yourself"}
            onClick={() => setBtnClick(true)}
          />
        ) : about.length > 100 ? (
          <LargeText description={about} style="text-lg" />
        ) : (
          <p className="text-lg">{about}</p>
        )}

        {/* Show input field when editing */}
        {btnClick ? (
          <div className="flex gap-3 py-3">
            <Button
              label={"Save"}
              onClick={() => {
                setAbout(tempAbout); // Save the updated value
                setBtnClick(false); // Hide the input after saving
              }}
            />
            <input
              type="text"
              value={tempAbout} // Bind value to tempAbout state
              className="border-2 rounded-lg w-full px-3"
              onChange={(event) => setTempAbout(event.target.value)} // Update tempAbout on input change
            />
          </div>
        ) : null}
      </div>
    </Section>
  );
}

export default AboutSection;

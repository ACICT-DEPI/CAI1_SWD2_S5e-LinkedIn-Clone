import React, { useRef, useState } from "react";
import Section from "../common/section";
import Button from "../common/Button";
import EditIcon from "../Icons/editIcon";
import LargeText from "../common/LargeText";

function AboutSection() {
  const [about, setAbout] = useState("");
  const tempAbout = useRef("");
  const [btnClick, setBtnClick] = useState(false);
  return (
    <Section>
      <div className="relative py-4">
        {!btnClick && about ? (
          <div className="absolute right-0 top-0">
            <Button
              icon={<EditIcon fill="white" />}
              onClick={() => setBtnClick(true)}
            />
          </div>
        ) : (
          <></>
        )}
        <p className="font-bold text-2xl pb-2">About</p>

        {about === "" && !btnClick ? (
          <Button
            label={"Add Brife about yourself"}
            onClick={() => setBtnClick(true)}
          />
        ) : about.length > 100 ? (
          <LargeText description={about} style="text-lg" />
        ) : (
          <p className="text-lg">{about}</p>
        )}
        {btnClick ? (
          <div className="flex gap-3 py-3">
            <Button
              label={"Save"}
              onClick={() => {
                setAbout(tempAbout.current);
                setBtnClick(false);
              }}
            />
            <input
              type="text"
              className="border-2 rounded-lg w-full px-3"
              onChange={(event) => (tempAbout.current = event.target.value)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Section>
  );
}

export default AboutSection;

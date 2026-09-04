import React from "react";
import portrait from "../../assets/IMG_2040.JPG";
import { LINKS } from "../../data";

const ProfileOutput: React.FC = () => (
  <div className="out-profile">
    <img className="out-profile__photo" src={portrait} alt="Mann Bellani" />
    <div className="out-profile__body">
      <h3 className="out-profile__name">Mann Bellani</h3>
      <p className="out-profile__meta">
        Computer Science, Texas A&amp;M University &middot; Class of 2029
      </p>
      <p>
        I care about machine learning systems that leave the notebook. Most of what I build ends up
        open source, because the fastest way to find out whether something is any good is to let
        people run it themselves.
      </p>
      <p>
        Right now I&apos;m building Publik &mdash; one place to find the free, open-source
        replacement for whatever app you are paying for &mdash; and documenting the process for
        ~88k people on Instagram. Before that: founded Organize Campus, modelled weather delays at
        Southwest Airlines, and researched adaptive tool manipulation at the Brain Networks Lab.
      </p>
      <p className="out-profile__links">
        <a href={LINKS.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span aria-hidden="true"> &middot; </span>
        <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <span aria-hidden="true"> &middot; </span>
        <a href={LINKS.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </p>
    </div>
  </div>
);

export default ProfileOutput;

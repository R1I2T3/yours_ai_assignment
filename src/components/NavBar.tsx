import React from "react";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import BoardCreationButton from "./BoardCreationButton";
const NavBar = () => {
  return (
    <header className="p-5">
      <nav className="flex justify-between">
        <Link href={"/"} className="text-purple-500 text-3xl font-extrabold">
          Rello
        </Link>
        <ul className="flex gap-5">
          <BoardCreationButton />
          <LogoutButton />
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FaRecycle } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Navbar className="bg-gradient-to-r from-gray-900 via-green-900 to-teal-900 border-b border-green-500">
      <Link to="/" className="flex items-center gap-2">
        <FaRecycle className="text-green-500 text-3xl" />
        <span className="self-center text-xl font-semibold text-white">
          WasteWise
        </span>
      </Link>
      {/* <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form> */}
      {/* <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button> */}
      <div className="flex gap-2 md:order-2">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>{" "}
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active={path === "/"}
          as={"div"}
          className="text-gray-300 hover:text-green-500"
        >
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/about"}
          as={"div"}
          className="text-gray-300 hover:text-green-500"
        >
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/product"}
          as={"div"}
          className="text-gray-300 hover:text-green-500"
        >
          <Link to="/product">Product</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

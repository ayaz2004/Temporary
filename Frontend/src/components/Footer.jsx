import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaRecycle } from "react-icons/fa";

export default function FooterCom() {
  return (
    <Footer
      container
      className="bg-gradient-to-b from-gray-900 to-green-900 border-t-4 border-green-500"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="flex items-center gap-2 text-white text-xl font-bold"
            >
              <FaRecycle className="text-green-500 text-2xl" />
              <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                WasteWise
              </span>
            </Link>
            <p className="text-gray-400 mt-4 max-w-md">
              Connecting waste collectors with communities for a cleaner,
              greener future.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Services" className="text-white" />
              <Footer.LinkGroup col className="text-gray-400">
                <Footer.Link href="/waste-collection">
                  Waste Collection
                </Footer.Link>
                <Footer.Link href="/recycling">Recycling Services</Footer.Link>
                <Footer.Link href="/commercial">
                  Commercial Solutions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Company" className="text-white" />
              <Footer.LinkGroup col className="text-gray-400">
                <Footer.Link href="/about">About Us</Footer.Link>
                <Footer.Link href="/contact">Contact</Footer.Link>
                <Footer.Link href="/careers">Careers</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-white" />
              <Footer.LinkGroup col className="text-gray-400">
                <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
                <Footer.Link href="/terms">Terms & Conditions</Footer.Link>
                <Footer.Link href="/licenses">Licensing</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider className="border-green-800" />

        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="WasteWise™"
            year={new Date().getFullYear()}
            className="text-gray-400"
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              className="text-green-500 hover:text-green-400"
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              className="text-green-500 hover:text-green-400"
            />
            <Footer.Icon
              href="#"
              icon={BsWhatsapp}
              className="text-green-500 hover:text-green-400"
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
              className="text-green-500 hover:text-green-400"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}

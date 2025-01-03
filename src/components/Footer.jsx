import PhoneIcon from "../assets/svg/phone.svg";
import MailIcon from "../assets/svg/mail.svg";
import ChatIcon from "../assets/svg/chat.svg";

const Footer = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center bg-zinc-800 text-white p-4">
            {/* Left content */}
            <div className="w-full md:w-1/2 flex justify-center gap-16 max-md:border-b md:border-r border-white text-sm p-4">
                <div className="flex flex-col gap-3">
                    <div className="text-base font-bold">COMPANY</div>
                    <div>Our Story</div>
                    <div>Shop Locations</div>
                    <div>Virtual</div>
                    <div>Eyecare</div>
                    <div>Philanthropy</div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="text-base font-bold">BRAND</div>
                    <div>Style & Fit</div>
                    <div>Craftsmanship</div>
                    <div>Reviews</div>
                    <div>Blog</div>
                    <div>Press</div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="text-base font-bold">HELP</div>
                    <div>Shipping & Returns</div>
                    <div>Repairs</div>
                    <div>Warranty</div>
                    <div>FAQ</div>
                    <div>Contact Us</div>
                </div>
            </div>

            {/* Right content */}
            <div className="w-full md:w-1/2 flex flex-col text-sm items-center gap-4 p-4">
                <div className="text-base font-bold">ASK A STAFF</div>
                <div>Whatever you want to buy, we are here to assist.</div>
                <div className="flex justify-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <img src={PhoneIcon} alt="phone icon" className="w-8" />
                        <div>0123456789</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src={MailIcon} alt="mail icon" className="w-8" />
                        <div>randomshop@gmail.com</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src={ChatIcon} alt="chat icon" className="w-8" />
                        <div>Chat With Us</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
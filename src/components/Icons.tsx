// Shared Icon Components using react-icons
import { 
    FiPhone, FiSmartphone, FiMail, FiTruck, FiShield, FiBox, 
    FiMapPin, FiClock, FiCheck, FiDollarSign, FiUsers, FiStar,
    FiHeadphones, FiArrowRight, FiClipboard, FiSettings,
    FiPlus, FiGift, FiTool, FiCamera, FiPlay, FiX,
    FiChevronLeft, FiChevronRight, FiZoomIn, FiGlobe,
    FiHeart, FiBriefcase, FiHome, FiSearch, FiMessageCircle, FiFileText
} from "react-icons/fi";
import { TbBuildingCommunity, TbTruckReturn, TbSofa, TbBuildingBank, TbBuildingHospital, TbPalette, TbCertificate } from "react-icons/tb";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { MdVerified } from "react-icons/md";

// Wrapper function to add default classes and pass through others
const createIcon = (IconComponent: React.ComponentType<{ className?: string }>, defaultClass = "w-5 h-5") => {
    return ({ className }: { className?: string }) => (
        <IconComponent className={className || defaultClass} />
    );
};

export const IconPhone = createIcon(FiPhone);
export const IconMobile = createIcon(FiSmartphone);
export const IconMail = createIcon(FiMail);
export const IconTruck = createIcon(FiTruck);
export const IconShield = createIcon(FiShield);
export const IconBox = createIcon(FiBox);
export const IconMapPin = createIcon(FiMapPin);
export const IconClock = createIcon(FiClock);
export const IconCheck = createIcon(FiCheck);
export const IconMoney = createIcon(FiDollarSign);
export const IconUsers = createIcon(FiUsers);
export const IconStar = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
export const IconHeadset = createIcon(FiHeadphones);
export const IconHome = createIcon(FiHome);
export const IconSearch = createIcon(FiSearch);
export const IconChat = createIcon(FiMessageCircle);
export const IconDocument = createIcon(FiFileText);
export const IconBuilding = createIcon(TbBuildingCommunity);
export const IconArrow = createIcon(FiArrowRight);
export const IconClipboard = createIcon(FiClipboard);
export const IconCog = createIcon(FiSettings);
export const IconPlus = createIcon(FiPlus);
export const IconGift = createIcon(FiGift);
export const IconWrench = createIcon(FiTool);
export const IconCamera = createIcon(FiCamera);
export const IconPlay = createIcon(FiPlay, "w-8 h-8");
export const IconX = createIcon(FiX);
export const IconChevronLeft = createIcon(FiChevronLeft, "w-8 h-8");
export const IconChevronRight = createIcon(FiChevronRight, "w-8 h-8");
export const IconZoomIn = createIcon(FiZoomIn);
export const IconGlobe = createIcon(FiGlobe);
export const IconPiano = createIcon(FiHeart); // Placeholder for piano
export const IconSafe = createIcon(TbTruckReturn); // Placeholder for safe
export const IconAntique = createIcon(TbSofa); // Placeholder for antique
export const IconBank = createIcon(TbBuildingBank);
export const IconHospital = createIcon(TbBuildingHospital);
export const IconArt = createIcon(TbPalette);
export const IconQuote = createIcon(BiSolidQuoteAltLeft, "w-8 h-8");
export const IconVerified = createIcon(MdVerified, "w-4 h-4");
export const IconTrophy = createIcon(TbCertificate);

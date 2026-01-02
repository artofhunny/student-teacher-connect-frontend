import React, { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Settings,
  Search,
  UserCircle,
  Menu,
  X,
  Edit2Icon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AssignmentCard from "../components/AssignmentCard";
import { addAssignments } from "../utils/assignmentSlice";
import AssignmentContainer from "../components/AssignmentContainer";
import PostAssignment from "../components/PostAssignment";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const TABS = [
  {
    key: "assignments",
    label: "Assignments",
    icon: <FileText size={20} />,
    component: <AssignmentContainer />,
    allowedRoles: ["student", "teacher"],
  },
  {
    key: "post",
    label: "Post Assignment",
    icon: <Edit2Icon size={20} />,
    component: <PostAssignment />,
    allowedRoles: ["teacher"],
  },
];

const DashboardPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("assignments");

  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const visibleTabs = TABS.filter(
    (tab) => !tab.allowedRoles || tab.allowedRoles.includes(user?.role)
  );

  const ActiveComponent = visibleTabs.find(
    (tab) => tab.key === activeTab
  )?.component;

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!visibleTabs.find((tab) => tab.key === activeTab)) {
      setActiveTab(visibleTabs[0]?.key);
    }
  }, [user?.role]);

  const handleLogout = async () => {
    try {
    const response = await fetch(BASE_URL + "/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Logout successful
      console.log("Logged out successfully");
      navigate("/");
    } else {
      const errorData = await response.json();
      console.error("Logout failed:", errorData.message);
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform lg:relative lg:translate-x-0
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center">
          {user && (
            <h2 className="text-gray-400 text-sm font-semibold uppercase">
              {user.role === "student" ? "Student View" : "Teacher View"}
            </h2>
          )}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2">
          {visibleTabs.map((tab) => (
            <NavItem
              key={tab.key}
              icon={tab.icon}
              label={tab.label}
              active={activeTab === tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setIsMenuOpen(false);
              }}
            />
          ))}
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-[#7ca6cc] flex items-center justify-between px-4 lg:px-8 text-white">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <span className="font-bold text-sm lg:text-lg">
              Student-Teacher Connect
            </span>
          </div>

          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <UserCircle size={28} />
              {user && <span className="text-sm">Hi, {user.fullName}</span>}
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{ActiveComponent}</div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors
      ${active ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"}
    `}
  >
    {icon}
    <span className="font-semibold text-sm">{label}</span>
  </div>
);

export default DashboardPage;

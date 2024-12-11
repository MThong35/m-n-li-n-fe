import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import comicService from "../../services/apiServices/comicAPI";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

const ComicDetails = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = sessionStorage.getItem("authToken");
  // const nav = useNavigate(); // Initialize the navigation hook
  const location = useLocation();
  const [comicId, setComicId] = useState(null);

  const fetchComics = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams(location.search);
      const id = params.get("id");
      setComicId(id);
      console.log(id);
      const getAComic = await comicService.getComicById(id);
      setComics(getAComic);

      console.log(getAComic);

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch tasks.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComics();
  }, [location]);

  const comic = {
    title: `${comics.comicTitle}`,
    author: [`${comics.authorID}`],
    isbn: "............",
    subject: "Bulletin For International Taxation",
    classification: "BIT 2021 vol75no.9",
    edition: "2nd Edition",
    callNumber: "BIT 2021 vol.75no.9",
    language: `${comics.language}`,
    publisher: `${comics.publisherID}`,
    publishingYear: "2021",
    publishingPlace: "Amsterdam",
    collation: "401-460; ill.; 29cm",
    localURL: `${comics.localhostURL}`,
    remoteURL: `${comics.remoteURL}`,
    avatarURL: `${comics.avatarURL}`,
  };
  // Decode the authToken to get the user role, if available
  let userRole = null;
  if (authToken) {
    try {
      const decodedToken = jwtDecode(authToken);
      userRole =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
    } catch (error) {
      console.error("Invalid authToken:", error);
      navigate("/login");
    }
  }

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`comicEditor?url=${comic.remoteURL}`);
  };

  const handleReadNow = () => {
    window.location.href =
      "https://pdfdatabase.blob.core.windows.net/pdf-db-container/doraemon-chap3.pdf?sp=r&st=2024-12-01T03:19:52Z&se=2024-12-31T11:19:52Z&spr=https&sv=2022-11-02&sr=b&sig=jeKsrRYAXoXDnc5vHeA3UtlZDITdmKkNv%2FFwxtXB7fY%3D";
  };

  const handleDeleteComic = async (comicId) => {
    // Delete user with userId
    console.log("Delete comic with id:", comicId);
    try {
      if (!authToken) {
        // Redirect to login page if authToken is missing
        navigate("/login");
      } else {
        try {
          // Decode the authToken to get the role
          const decodedToken = jwtDecode(authToken);
          const userRole =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];

          // Check if user has an admin role
          if (userRole !== "Admin" && userRole !== "Manager") {
            toast.error("You are not authorized to delete users.");
          } else {
            const response = await comicService.deleteComic(comicId);
            console.log(response);

            if (response) {
              toast.success(`Delete ${response.userName} successfully!`);
              // delay 3s to reload the page
              setTimeout(() => {
                navigate("/admin/comicsmanage");
                fetchComics();
              }, 3500);
            } else {
              toast.error(
                "Delete failed. Please check your username or password."
              );
            }
          }
        } catch (error) {
          // Handle decoding errors (e.g., if authToken is invalid)
          console.error("Invalid authToken:", error);
          navigate("/login");
        }
      }
    } catch (err) {
      setError("Failed to delete user.");
      toast.error(error.response?.data?.description || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 flex gap-6">
        {/* comic Cover */}
        <div className="w-1/4">
          <img src={comic.avatarURL} alt="comic Cover" className="rounded-md" />
        </div>

        {/* comic Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">{comic.title}</h2>
          <p className="text-green-600 mb-2">Available</p>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-medium">Author(s): </span>
              {comic.author.join(", ")}
            </p>
            <p>
              <span className="font-medium">ISBN: </span>
              {comic.isbn}
            </p>
            <p>
              <span className="font-medium">Subject: </span>
              {comic.subject}
            </p>
            <p>
              <span className="font-medium">Classification: </span>
              {comic.classification}
            </p>
            <p>
              <span className="font-medium">Edition: </span>
              {comic.edition}
            </p>
            <p>
              <span className="font-medium">Call Number: </span>
              {comic.callNumber}
            </p>
            <p>
              <span className="font-medium">Language: </span>
              {comic.language}
            </p>
            <p>
              <span className="font-medium">Publisher: </span>
              {comic.publisher}
            </p>
            <p>
              <span className="font-medium">Publishing Year: </span>
              {comic.publishingYear}
            </p>
            <p>
              <span className="font-medium">Publishing Place: </span>
              {comic.publishingPlace}
            </p>
            <p>
              <span className="font-medium">Collation: </span>
              {comic.collation}
            </p>
          </div>
          <button
            className="mt-6 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-900"
            onClick={handleReadNow}
          >
            Read now
          </button>
        </div>

        {/* Sidebar */}
        {/* Sidebar, only visible for Admin and Manager roles */}
        {(userRole === "Admin" || userRole === "Manager") && (
          <div className="w-1/4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <button
                  className="mt-6 w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-900"
                  onClick={handleEditClick}
                >
                  Edit comic
                </button>
              </li>
              <li className="flex justify-between items-center">
                <button
                  className="mt-6 w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-900"
                  onClick={() => handleDeleteComic(comicId)}
                >
                  Delete Comic
                </button>
              </li>
            </ul>
            <button className="mt-6 w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-900">
              Request Publishing
            </button>
          </div>
        )}
      </div>

      {/* Related Comic Section */}
      <div className="max-w-5xl mx-auto mt-8">
        <h3 className="text-lg font-semibold mb-4">Relevant Comics:</h3>
        <div className="grid grid-cols-4 gap-4">
          {/* Related comics with consistent image size */}
          <img
            src="https://cdn.marvel.com/content/1x/avengers_annual_1.jpg"
            alt="Related comic 1"
            className="rounded-md"
            style={{ width: "195px", height: "225px", objectFit: "cover" }}
          />
          <img
            src="https://media.cnn.com/api/v1/images/stellar/prod/dcvsmarvelomni-adv-rev2-3-copy.jpg?q=w_1110,c_fill"
            alt="Related comic 2"
            className="rounded-md"
            style={{ width: "195px", height: "225px", objectFit: "cover" }}
          />
          <img
            src="https://pictures.abebooks.com/isbn/9784091417602-uk.jpg"
            alt="Related comic 3"
            className="rounded-md"
            style={{ width: "195px", height: "225px", objectFit: "cover" }}
          />
          <img
            src="https://pictures.abebooks.com/isbn/9784091417558-us.jpg"
            alt="Related comic 4"
            className="rounded-md"
            style={{ width: "195px", height: "225px", objectFit: "cover" }}
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ComicDetails;

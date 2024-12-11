import React, { useRef, useEffect, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import "./ComicEditor.css";
import { useLocation } from "react-router-dom";

const ComicEditor = () => {
  const [comicURL, setComicsURL] = useState([]);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams(location.search);
        const url = params.get("url");
        setComicsURL(url);
        console.log(url);

        
        setLoading(false);
      } catch (err) {
        setError("Failed to edit this comic.");
        setLoading(false);
      }
    };

    fetchComics();
  }, [location]);

  console.log(comics.remoteURL);
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    if (!viewer.current || viewer.current.children.length > 0) {
      return;
    } else {
      // If you prefer to use the Iframe implementation, you can replace this line with: WebViewer.Iframe(...)
      WebViewer.Iframe(
        {
          path: "/lib",
          initialDoc: 
            "https://pdfdatabase.blob.core.windows.net/pdf-db-container/doraemon-chap3.pdf?sp=r&st=2024-12-01T03:19:52Z&se=2024-12-31T11:19:52Z&spr=https&sv=2022-11-02&sr=b&sig=jeKsrRYAXoXDnc5vHeA3UtlZDITdmKkNv%2FFwxtXB7fY%3D",
          licenseKey:
            "demo:1731132602231:7efd560703000000003daf23ac217f860c34af8fa302683151153db1da",
        },
        viewer.current
      ).then((instance) => {
        const { documentViewer, annotationManager, Annotations } =
          instance.Core;

        documentViewer.addEventListener("documentLoaded", () => {
          const rectangleAnnot = new Annotations.RectangleAnnotation({
            PageNumber: 1,
            X: 100,
            Y: 150,
            Width: 200,
            Height: 50,
            Author: annotationManager.getCurrentUser(),
          });

          annotationManager.addAnnotation(rectangleAnnot);
          annotationManager.redrawAnnotation(rectangleAnnot);
        });
      });
    }
  }, []);

  return (
    <div className="ComicEditor">
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default ComicEditor;

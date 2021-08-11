import React from "react";

export const YoutubeEmbedVideo = ({ socialMedia }) => {
  return (
    <>
      {socialMedia.map((elemento, index) => (
        <div key={index}>
          {elemento.socialNetwork === "Embed Youtube Video" ? (
            <div className="p-3 w100 d-flex justify-content-center">
              <iframe
                width="560"
                height="200"
                src={
                  "https://www.youtube.com/embed/" + elemento.profile.substr(17)
                }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

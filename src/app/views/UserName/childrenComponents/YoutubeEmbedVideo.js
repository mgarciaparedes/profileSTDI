import React from 'react';

export const YoutubeEmbedVideo = ({socialMedia}) => {

    const renderEmbedYt = (embed) =>{
        return {__html: embed}
    }

    return (
        <>
        {socialMedia.map((elemento, index) => (
            <>
              {elemento.socialNetwork === "Embed Youtube Video" ? 
                <div key={index} className="d-flex col-lg-12 p-2 justify-content-center" dangerouslySetInnerHTML={renderEmbedYt(elemento.profile)}>
                </div>
               : null}
            </>
        ))}
        </>
    )
}

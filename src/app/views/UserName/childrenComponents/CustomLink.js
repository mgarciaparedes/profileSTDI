import React from 'react'

export const CustomLink = ({socialMedia, CustomURLIcon}) => {
    return (
        <>
            {socialMedia.map((elemento, index) => (
              <>
                  {
                    elemento.socialNetwork === "CustomURL" ? 
                    <div className="row d-flex justify-content-center h5">
                      <div key={index} className="border p-3 border-link col-9">
                        <a
                          className="btn-no-style"
                          target="_blank"
                          href={elemento.profile}
                        >
                          <div className="pt-2 pb-3">
                            <div className="d-flex col-lg-12 justify-content-center">
                              <img
                                width="25"
                                height="25"
                                src={CustomURLIcon}
                                alt="CustomURL"
                              />
                              &nbsp;
                              {elemento.linkName}
                            </div>

                          </div>
                        </a>
                      </div>
                    </div>
                    : null    
                  }
              </>
            ))}
        </>
    )
}

import React, { useState } from "react";
import ReactPlayer from "react-player";
import { transformImagePaths, combineClasses } from "../../utils/utils";
import { ImageSize } from "../../shared/enums";
import imageClasses from "../ArticleImage/Images.module.scss";

interface iVideoPlayer {
  url?: string;
  className?: string;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  playing?: boolean;
  size?: ImageSize;
  caption?: React.ReactNode;
  poster?: string;
  light?: boolean;
  /** CSS aspect-ratio (e.g. "1280 / 712") to lock the media box so the
   *  poster and video share the same dimensions and the layout doesn't
   *  shift when the video starts playing. */
  aspectRatio?: string;
}

const VideoPlayer = ({
  url,
  className,
  controls = true,
  loop = false,
  muted = false,
  playing = false,
  size,
  caption,
  poster,
  light = false,
  aspectRatio,
}: iVideoPlayer) => {
  const [previewClicked, setPreviewClicked] = useState(false);
  const sizeClasses = size
    ? combineClasses(
        imageClasses.article_image__wrapper,
        imageClasses["size_" + size],
        "mx-auto"
      )
    : "w-full";

  // Render the poster as a real <img> so it keeps the image's natural
  // height, with a play overlay. The player only mounts once clicked.
  const showPreview = light && poster && !previewClicked;

  const media = showPreview ? (
    <button
      type="button"
      onClick={() => setPreviewClicked(true)}
      aria-label="Play video"
      className={combineClasses(
        "group block p-0 m-0 border-0 bg-transparent cursor-pointer",
        aspectRatio ? "absolute inset-0 w-full h-full" : "relative w-full"
      )}
    >
      <img
        src={transformImagePaths(poster)}
        alt=""
        width="100%"
        className={aspectRatio ? "w-full h-full object-cover" : "block w-full"}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-black/60 transition-transform group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 ml-1 fill-white"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  ) : (
    <ReactPlayer
      url={transformImagePaths(url)}
      width="100%"
      height={aspectRatio ? "100%" : "auto"}
      controls={controls}
      loop={loop}
      muted={muted}
      playing={playing || previewClicked}
      light={light && !poster ? true : false}
      playsinline
      config={{
        file: {
          attributes: {
            controlsList: "nodownload",
            playsInline: true,
            ...(poster ? { poster: transformImagePaths(poster) } : {}),
          },
        },
      }}
    />
  );

  return (
    <div className={combineClasses("h-auto my-3", sizeClasses, className)}>
      {aspectRatio ? (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
          {media}
        </div>
      ) : (
        media
      )}
      {caption && (
        <p className="mb-0 mt-2 text-sm w-full text-center">{caption}</p>
      )}
    </div>
  );
};

export default VideoPlayer;

/** Serialized Unsplash photo used in UI + JSON (hotlinked per Unsplash guidelines). */
export type UnsplashPhotoRef = {
  photoId: string;
  url: string;
  width: number;
  height: number;
  photographerName: string;
  photographerHtmlUrl: string;
  /** Photo page on Unsplash (for optional deep link). */
  photoHtmlUrl: string;
};

export type UnsplashMediaFile = {
  home: UnsplashPhotoRef | null;
  byProductId: Record<string, UnsplashPhotoRef>;
  byCategorySlug: Record<string, UnsplashPhotoRef>;
};

export const sanitizeUid = (uid) => {
  return uid.replace(/\//g, ""); // Removes all slashes from the UID
};

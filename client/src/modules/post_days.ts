/**
 * Function to calculate the age in days
 * @param {string} postDate - Original date
 * @returns {number} - Days passed
 */
const postDays = (postDate: string): number => {
  const today: any = new Date();
  const dbDate: any = new Date(postDate);
  const postDays: number = Math.round((today - dbDate) / 1000 / 60 / 60 / 24);
  const postHours = Math.round((today - dbDate) / 1000 / 60 / 60);
  const postMinutes = Math.round((today - dbDate) / 1000 / 60);

  let result = postDays;
  if (!postDays) result = postHours;
  if (!postHours) result = postMinutes;

  return result;
};

export default postDays;

const postDays = (postDate:string,dayString:string,daysString:string) => {
  const today: any = new Date();
  const dbDate: any = new Date(postDate);
  const postDays: number = Math.round((today - dbDate) / 1000 / 60 / 60 / 24);

  return postDays === 1 ? `${postDays} ${dayString}` : `${postDays} ${daysString}`;
}

export default postDays;
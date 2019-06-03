const postDays = (postDate:string) => {
  const today: any = new Date();
  const dbDate: any = new Date(postDate);
  const postDays: number = Math.round((today - dbDate) / 1000 / 60 / 60 / 24);

  return postDays;
}

export default postDays;
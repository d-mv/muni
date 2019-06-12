const compareObjects = (object1: any, object2: any) => {
  let check = 0;
  let counter = 0;

  Object.keys(object1).map((el: any) => {
    if (typeof object1[el] === "object") {
      Object.keys(object1[el]).map((ele: any) => {
        const equal = object1[el][ele] === object2[el][ele];
        if (equal) {
          check += 1;
        }
        counter += 1;
      });
    } else {
      const equal = object1[el] === object2[el];
      if (equal) {
        check += 1;
      }
      counter += 1;
    }
  });

  return check === counter;
};

export default compareObjects;

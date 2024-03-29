export const imageEncoder = (file: any, callback: (arg0: any) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    callback(reader.result);
  };
};

export const imageDecoder = (image64: any) => {
  // const convertBase64ToBlob = (Base64Image: any) => {
  // SPLIT INTO TWO PARTS
  const parts = image64.split(";base64,");
  // HOLD THE CONTENT TYPE
  const imageType = parts[0].split(":")[1];
  // DECODE BASE64 STRING
  const decodedData = window.atob(parts[1]);
  // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
  const uInt8Array = new Uint8Array(decodedData.length);
  // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }
  // RETURN BLOB IMAGE AFTER CONVERSION
  return URL.createObjectURL(new Blob([uInt8Array], { type: imageType }));
};

// export const imageEncoderAsync = async (
//   file: any,
//   callback: (arg0: any) => void
// ) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   // reader.onloadend = () => {
//   //   callback(reader.result);
//   // };
//   return await reader.result;
// };

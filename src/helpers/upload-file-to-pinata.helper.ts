export const uploadFileToPinata = async (file: File) => {
  try {
    const data = new FormData();
    data.set("file", file);
    const res = await fetch("/api/files", {
      method: "POST",
      body: data,
    });
    const resData = await res.json();

    return resData.IpfsHash;
  } catch (e) {
    console.log(e);
    alert("Trouble uploading file");
  }
};

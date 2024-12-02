export default function S3Img() {
  const requestImg = async (event) => {
    let formData = new FormData();
    formData.append('image', event.target.files[0]);
    try {
      const imageRes = await axios.post(`localhost:4000/image`, formData);
    } catch (error) {
      console.log(error);
      alert('server error');
    }
  };
  return (
    <>
      <div id="imageEdit">
        <input
          type="file"
          id="image_uploads"
          name="image"
          accept="image/*"
          onChange={requestImg}
        ></input>
      </div>
    </>
  );
}

export const uploadImg = (e, setValue) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setValue( e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  